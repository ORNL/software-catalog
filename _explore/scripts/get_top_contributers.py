import json
from github import Github
import os

# Initialize Github
gh = Github('## API_KEY ##')

# Function to pull contributors and return the top 3 for the submitted repo
def ProcessRepo(gh, url):

    # Pull the repo info from Github
    repo = gh.get_repo(url)

    # Pull the contributor info from Github
    repoContributorStats = repo.get_stats_contributors()
    repoContributorStats.sort(key=lambda x: x.total, reverse=True)

    # Make the dictionary that will hold the info
    contributorDict = {}

    # Setup counters for limiting to 3
    limit = 3
    counter = 0

    # pull data for each contributor and add to the dictionary
    for contributor in repoContributorStats:
        if (counter >= limit):
            break

        contr = {'Email': contributor.author.email, 'NumberOfContributions': contributor.total}
        contributorDict[contributor.author.login] = contr
        counter += 1

    return contributorDict

# Open and parseGithub repo list
with open('explore/github-data/extRepos.json', 'r') as file:
    reposJson = json.load(file)

data = reposJson['data']
githubInfo = {}

# Setup counters for Debug
# countCompleted = 0
# dataLength = 0

# for repo in data:
#     dataLength += 1

# Send to process function for each repo in list
for repo in data:
    githubInfo[repo] = ProcessRepo(gh,repo)
    # countCompleted += 1
    # print(str(countCompleted) + '/' + str(dataLength))

# Write to file
with open('explore/github-data/extTopContributors.json', 'w') as path:
    json.dump(githubInfo, path, indent=4)