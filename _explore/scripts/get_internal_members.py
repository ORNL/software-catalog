from scraper.github import queryManager as qm
from os import environ as env
import sys

ghDataDir = env.get("GITHUB_DATA", "../github-data")
datfilepath = "%s/intUsers.json" % ghDataDir
queryPath = "../queries/org-Members.gql"

# Initialize data collector
dataCollector = qm.DataManager(datfilepath, False)
dataCollector.data = {"data": {}}

# Read input list of member organizations
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

    orglist = hostInfo["memberOrgs"]

    # Initialize query manager
    '''
    TODO we will soon want to do a couple of things:
    1. The type of the "queryMan" object should be determined by the "repoType" string (i.e. GitlabQueryManger)
    2. We will need to pass in "hostUrl" as an eventual constructor argument
    3. Make all functions abstract in the base class for easier typing
    '''
    queryMan = qm.GitHubQueryManager(apiToken=env.get(hostInfo["apiEnvKey"]))

    # Iterate through orgs of interest
    print("%s: Gathering data across multiple paginated queries..." % (hostUrl))
    for org in orglist:
        print("\n'%s'" % (org))

        try:
            outObj = queryMan.queryGitHubFromFile(
                queryPath,
                {"orgName": org, "numUsers": 50, "pgCursor": None},
                paginate=True,
                cursorVar="pgCursor",
                keysToList=["data", "organization", "membersWithRole", "nodes"],
            )
        except Exception as error:
            print("Warning: Could not complete '%s'" % (org))
            print(error)
            continue

        # Update collective data
        for user in outObj["data"]["organization"]["membersWithRole"]["nodes"]:
            userKey = user["login"]
            # TODO maybe handle each hostURL differently?
            dataCollector.data["data"][userKey] = user

        print("'%s' Done!" % (org))

    print("\n%s: Collective data gathering complete!" % (hostUrl))

# Write output file
dataCollector.fileSave(newline="\n")

print("\nDone!\n")
