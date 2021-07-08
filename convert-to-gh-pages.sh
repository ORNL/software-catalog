#!/bin/sh

# The idea of this file is that we do NOT want to directly mirror the repository to Github,
# because Github Pages requires a few extra dependencies which CANNOT be installed for ORNL Pages.
#
# Instead, we just run this script, and it will be deployed on Github pages automatically.

# uncomment Github Pages dependencies
sed -i '/^[[:space:]]*#[[:space:]]*\[github-pages]/{n;s/^\([[:space:]]*\)#/\1/}' _config.yml
sed -i '/^[[:space:]]*#[[:space:]]*\[github-pages]/{n;s/^\([[:space:]]*\)#/\1/}' Gemfile

gem install bundler:$(tail -1 Gemfile.lock | xargs)
bundle install

# TODO add git script to sync up with remote repository
