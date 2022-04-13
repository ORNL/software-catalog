from pprint import pprint
import gitlab
import json
import os

apiKey = 'y2d9VyCxmyCWR3EBc9vT'
gl = gitlab.Gitlab(url='https://code.ornl.gov/',private_token=apiKey)

projects = gl.projects.list(visibility='public')

processedProjects = {}

for project in projects:
    try:
        fullProject = gl.projects.get(project.encoded_id)
        info = {}
        info["createdAt"] = fullProject.created_at
        info["defaultBranchRef"] = {"name": fullProject.default_branch}
        info["description"] = fullProject.description
        info["forks"] = {"totalCount": fullProject.forks_count}
        info["homepageUrl"] = None #Haven't found a match
        info["issues_Closed"] = {"totalCount": len(fullProject.issues.list(state = 'closed'))}
        info["issues_Open"] = {"totalCount": len(fullProject.issues.list(state = 'opened'))}
        info["languages"] = {"totalCount": len(fullProject.languages())}
        info["licenseInfo"] = None #Haven't found a match
        info["mentionableUsers"] = {"totalCount": len(fullProject.users.list())}
        info["name"] = fullProject.name
        info["nameWithOwner"] = fullProject.name_with_namespace
        info["owner"] = fullProject.namespace["full_path"]
        if (fullProject._parent_attrs == {}):
            info["parent"] = None
        else:
            info["parent"] = fullProject._parent_attrs
        
        languages = fullProject.languages()
        if (len(languages) > 0):
            info["primaryLanguage"] = max((languages[l], l) for l in languages)[1]
        else:
            info["primaryLanguage"] = None

        info["pullRequests_Closed"] = {"totalCount": len(fullProject.mergerequests.list(state='closed'))}
        info["pullRequests_Merged"] = {"totalCount": len(fullProject.mergerequests.list(state='merged'))}
        info["pullRequests_Open"] = {"totalCount": len(fullProject.mergerequests.list(state='opened'))}
        info["repositoryTopics"] = {"totalCount": len(fullProject.topics)}
        info["stargazers"] = {"totalCount": fullProject.star_count}
        info["url"] = fullProject.http_url_to_repo
        
        processedProjects[project.name] = info
    except:
        continue

with open('explore/github-data/intReposInfoGitlab.json', 'w') as path:
    json.dump(processedProjects, path, indent=4)