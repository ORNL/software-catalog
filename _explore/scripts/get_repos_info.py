from scraper.github import queryManager as qm
from os import environ as env
import sys

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepath = "%s/intReposInfo.json" % ghDataDir
queryPath = "../queries/org-Repos-Info.gql"
queryPathInd = "../queries/repo-Info.gql"

# Initialize data collector
dataCollector = qm.DataManager(datfilepath, False)
dataCollector.data = {"data": {}}

# Read input lists of organizations and independent repos of interest
inputLists = qm.DataManager("../input_lists.json", True)
for hostUrl, hostInfo in inputLists.data.items():
    repoType = hostInfo["repoType"]
    # TODO REMOVE CONTINUE once gitlab scraper is ready
    if repoType == "gitlab" or repoType == "bitbucket":
        print("%s: %s support not yet enabled, skipping for now" % (hostUrl, repoType))
        continue
    if repoType != "github":
        print("%s: Invalid repo type %s" % (hostUrl, repoType))
        sys.exit(1)

    orglist = hostInfo["orgs"]
    repolist = hostInfo["repos"]

    # Initialize query manager
    '''
    TODO we will soon want to do a couple of things:
    1. The type of the "queryMan" object should be determined by the "repoType" string (i.e. GitlabQueryManger)
    2. We will need to pass in "hostUrl" as an eventual constructor argument
    3. Make all functions abstract in the base class for easier typing
    '''
    queryMan = qm.GitHubQueryManager(apiToken=env.get(hostInfo["apiEnvKey"]))

    # Iterate through orgs of interest
    print("%s: Gathering data across multiple paginated queries..." % hostUrl)
    for org in orglist:
        print("\n'%s'" % (org))

        try:
            outObj = queryMan.queryGitHubFromFile(
                queryPath,
                {"orgName": org, "numRepos": 50, "pgCursor": None},
                paginate=True,
                cursorVar="pgCursor",
                keysToList=["data", "organization", "repositories", "nodes"],
            )
        except Exception as error:
            print("Warning: Could not complete '%s'" % (org))
            print(error)
            continue

        # Update collective data
        for repo in outObj["data"]["organization"]["repositories"]["nodes"]:
            repoKey = repo["nameWithOwner"]
            # TODO maybe handle each hostURL differently?
            dataCollector.data["data"][repoKey] = repo

        print("'%s' Done!" % (org))

    print("\n%s: Collective data gathering Part1of2 complete!" % (hostUrl))

    # Iterate through independent repos
    print("%s: Adding independent repos..." % (hostUrl))
    print("%s: Gathering data across multiple queries..." % (hostUrl))
    for repo in repolist:
        print("\n'%s'" % (repo))

        r = repo.split("/")
        try:
            outObj = queryMan.queryGitHubFromFile(
                queryPathInd, {"ownName": r[0], "repoName": r[1]}
            )
        except Exception as error:
            print("Warning: Could not complete '%s'" % (repo))
            print(error)
            continue

        # Update collective data
        repoKey = outObj["data"]["repository"]["nameWithOwner"]
        # TODO maybe handle each hostURL differently?
        dataCollector.data["data"][repoKey] = outObj["data"]["repository"]

        print("'%s' Done!" % (repo))

    print("\n%s: Collective data gathering Part2of2 complete!" % (hostUrl))

# Write output file
dataCollector.fileSave(newline="\n")

print("\nDone!\n")
