# How to Generate New Data

```bash
cd _explore/scripts/
./MASTER.sh
```

_(Additional script functionality detailed in the [`./scripts` section below][jump2 scripts].)_

**IMPORTANT!**
Scripts which fetch data from Github require an environment variable `GITHUB_API_TOKEN` containing a valid GitHub [OAuth token][oauth] or [personal access token][personaltoken].
Querying the APIs of other instances (i.e. Gitlab, Bitbucket) will also require a specific API token, check `input_lists.json` to deduce the key that you need.  
You will also need to install the Python dependencies as listed in [`requirements.txt`][requires].

# About the Contents of this Directory

## [./input_lists.json][inputs file]

Simple text file containing the metadata about which Git URLs we are scraping, and information about each. Sample format:

```json
{
  "https://github.com": {
    "memberOrgs": ["ornl"],
    "orgs": [
      "ornl",
      "ornl-fusion"
    ],
    "repos": [
      "ornluser/onlyWantThisRepoIncluded",
      "ornl/forkedRepoButImportant"
    ],
    "repoType": "github",
    "apiEnvKey": "GITHUB_API_TOKEN"
  },
  "https://my-gitlab-host.com": {
    "memberOrgs": ["org1", "org2"],
    "orgs": [
      "rse",
      "rse-deployment",
      "sns-hfir-scse",
      "ssd"
    ],
    "repos": [],
    "repoType": "gitlab",
    "apiEnvKey": "CODE_ORNL_GOV_API_TOKEN"
  }
}
```

### Host URL

On the root level, there should be several key-value pairings. The key represents the host URL we want to call. Be sure to include the protocol (i.e. HTTPS) in your key as well.

### memberOrgs

Array of strings (can be empty). Tracks members of the organizations on the URL who have made their profiles publicly accessible. Currently, this is just used for contrasting "Internal Contributors" and "External Contributors" in some D3 graphs.

### orgs

Array of strings (can be empty). Scrape all public repositories _except forks_ from here, i.e. `https://github.com/ORNL` .

### repos

Array of strings (can be empty). Scrape these specific repositories (can include forks). Note that you MUST use the format `org/repo` , i.e. everything after the URL `https://github.com/`, with no forward slash before or after the string.

### repoType

One of `github`, `gitlab`, or `bitbucket` . Required.

### apiEnvKey

OS environment variable used to retrieve secret key for the URL. Required. Each variable should start with `SOFT_CAT_` .

## [./queries][queries dir]

The actual queries sent to [GitHub's GraphQL API][gitgraphql] when the data fetching scripts are run. This makes writing/editing queries easier, as it allows them to remain in individual, human-readable text files.

## [./scripts][scripts dir]

Scripts for data fetching and manipulation. Data is written to [`explore/github-data`][data dir] in appropriate json formats.

New files are created for each type of data structure.  
For most files, data is overwritten each time the scripts are run.  
Other scripts may collect cumulative data with a daily timestamp. If one of these scripts is run multiple times in a single day, the entry for that day will be overwritten.

Running [`MASTER.sh`][mastersh] will run all of the necessary scripts in the appropriate order to fetch the latest data. It will also update [`LAST_MASTER_UPDATE.txt`][lastmasterup] to record when this complete data update was last run.

The scripts are only for gathering new data. You do not need them to run in order to view the webpage visualizations.

[jump2 scripts]: #scripts
[inputs file]: input_lists.json
[data dir]: ../explore/github-data
[queries dir]: queries
[scripts dir]: scripts
[requires]: scripts/requirements.txt
[mastersh]: scripts/MASTER.sh
[lastmasterup]: LAST_MASTER_UPDATE.txt
[gitgraphql]: https://developer.github.com/v4/
[oauth]: https://github.com/settings/developers
[personaltoken]: https://github.com/settings/tokens
