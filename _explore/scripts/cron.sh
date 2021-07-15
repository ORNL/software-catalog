#!/usr/bin/env bash

# This file exists in case you would like to automatically update the repository JSON files.

# You can run this script with Docker via the -d or --docker flag
# Or you can run on bare metal by excluding this flag

# To set up for this script, you will need to:
# 1. Make sure 'git' and 'ssh' are installed and configured on the machine you are executing this script on.
# 2. You will want either Docker or Python + needed dependencies to be installed on the machine.
# 3. Clone this repository so it pulls and pushes via SSH.
# 4. Make sure you define the environment variable GITHUB_API_TOKEN
# 5. Add this script to your crontab (don't move it).

cd $(dirname "$0")
set -euo pipefail

### branch name variables - customize these based on your own configurations ###
CHECKOUT_BRANCH="master" # branch we initially checkout and commit to
declare -a MERGE_BRANCHES=("dev") # array of branches we merge $CHECKOUT_BRANCH to and push to - leave as empty if this doesn't apply to you

### functions ###

run_without_docker() {
    ./MASTER.sh
}

run_with_docker() {
    pushd ../..
    docker build -f worker.Dockerfile -t software-catalog:latest .
    docker run --rm --name software-catalog -e GITHUB_API_TOKEN=${GITHUB_API_TOKEN} software-catalog:latest -v $PWD:/app bash -c "/app/_explore/scripts/MASTER.sh"
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

# get latest origin information
git fetch --all
# make sure $CHECKOUT_BRANCH is up to date with origin branch
git checkout $CHECKOUT_BRANCH
git pull

# run script based on arguments
if [ $USE_DOCKER -eq 1]; then
  run_with_docker
else
  run_without_docker
fi

# add changes to $CHECKOUT_BRANCH on remote
git add ../../. # make sure this is a path back to the repository root
git commit -m "Ran JSON collection scripts [AUTO-GENERATED]"
git push

for branch in "${MERGE_BRANCHES[@]}"; do
    git checkout $branch
    git pull
    git merge $CHECKOUT_BRANCH
    git push
done
