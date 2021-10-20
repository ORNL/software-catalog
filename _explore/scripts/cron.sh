#!/usr/bin/env bash

# This file exists in case you would like to automatically update the repository JSON files.

# You can run this script with Docker via the -d or --docker flag
# Or you can run the script directly by excluding that flag

# To set up for this script, you will need to:
# 1. Make sure 'git' is installed and configured on the machine you are executing this script on.
# 2. You will want either Docker or Python + needed dependencies to be installed on the machine.
# 3. Clone this repository so it can push and pull automatically.
#   One example: on Gitlab, Maintainers/Owners can configure a "Project Access Token" with write_repository permissions, and then run:
#   git clone https://oauth2:${PROJECT_ACCESS_TOKEN}@${domain}/path/to/repo
# 4. Make sure you define any environment variables mentioned in "input_lists.json" .
# 5. Add this script to your crontab (don't move it).

cd "$(dirname "$0")"
set -euo pipefail

### branch name variables - customize these based on your own configurations ###

### TODO temporary until master/main are ready for cronjob ###
readonly CHECKOUT_BRANCH="dev"
declare -a MERGE_BRANCHES=()
### TODO will eventually uncomment when master/main are ready for cronjob ###
#readonly CHECKOUT_BRANCH="master" # branch we initially checkout and commit to
#declare -a MERGE_BRANCHES=("dev" "main") # array of branches we merge $CHECKOUT_BRANCH to and push to - leave as empty if this doesn't apply to you

readonly REPO_ROOT_PATH="../.."

### functions ###

run_without_docker() {
    ./MASTER.sh
}

run_with_docker() {
    pushd $REPO_ROOT_PATH
    docker build -f worker.Dockerfile -t software-catalog:latest .
    docker run --rm --name software-catalog \
      -e GITHUB_API_TOKEN="${GITHUB_API_TOKEN}" \
      -e CODE_ORNL_GOV_API_TOKEN="${CODE_ORNL_GOV_API_TOKEN}" \
      -v "$PWD":/app \
      software-catalog:latest \
      bash -c "/app/_explore/scripts/MASTER.sh"
    popd
}

### args ###
USE_DOCKER=0
for i in "$@"; do
    case $1 in
        -d|--docker) USE_DOCKER=1 ;;
        *) echo "Ignoring param $1 , only use '-d' or '--docker' as params" ;;
    esac
    shift
done

### main script ###

# make sure $CHECKOUT_BRANCH is up to date with origin branch
git checkout $CHECKOUT_BRANCH
git pull

# run script based on arguments
if [ $USE_DOCKER -eq 1 ] ; then
  run_with_docker
else
  run_without_docker
fi

# add changes to $CHECKOUT_BRANCH on remote
git add ${REPO_ROOT_PATH}/.
git commit -m "Ran JSON collection scripts [AUTO-GENERATED]"
git push

for branch in "${MERGE_BRANCHES[@]}"; do
    git checkout "$branch"
    git pull
    git merge $CHECKOUT_BRANCH
    git push
done
