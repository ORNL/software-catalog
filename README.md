# ORNL Software Catalog

Original Author: Ian Lee <lee1001@llnl.gov>

Welcome to the Oak Ridge National Laboratory software portal! The purpose of this software portal is to serve as a hub for open source software that is produced by Oak Ridge National Laboratory.

ORNL produces software on a daily basis. Some of this software is used only internally, other components are licensed for use by external partners and collaborators, still other software is released, or even actively developed, in the open on software hosting platforms such as GitHub.com.

## Prerequisites

Before you begin, make sure you have working installs of Git, Ruby, and [Bundler](https://bundler.io/). You will need these tools for development.

## Getting Started

To work locally, first clone into the repository:

```shell
git clone https://github.com/ORNL/ornl.github.io.git
```

Make sure you are in the directory you just created by running `cd ornl.github.io` Then you can use `bundler` to install the Ruby dependencies (see the [Jekyll installation docs](https://jekyllrb.com/docs/installation/) for step-by-step guides to setting this up):

```shell
bundle install
```

Running this will install everything in your Gemfile (including Jekyll).

Next, run the development web server with:

```shell
bundle exec jekyll serve --incremental
```

Finally, open <http://localhost:4000> in a web browser.

### Tips

The gems in your sourcefile get updated frequently. It is a good idea to occasionally run `bundle update` from within your project's root directory to make sure the software on your computer is up to date.

Sometimes there can be dependency conflicts if your local version of Ruby is different from this repo or GitHub pages deployment settings. You can find the version number of each of GitHub Page's current dependency's [here](https://pages.github.com/versions/). You can often avoid dependency issues if you use the same versions, including for Ruby.

For example, the default version of Ruby used to deploy GitHub Pages on github.com as of 2021-04-08 was Ruby 2.7.1. If you tried running Ruby version 3.0.0 locally on macOS, you'll need to do some extra steps to correctly install the dependencies for this repository. You'd need to run `bundle add webrick` as it is no longer a prepackaged dependency with Ruby in 3.0.0. You may also need to run `gem install eventmachine -- --with-openssl-dir=/usr/local/opt/openssl@1.1` as MacOS >10.14 doesn't use OpenSSL from the same path as is still assumed to be in by eventmachine.

## Contact

If you have any questions, please don't hesitate to contact the catalog administrator (mailto:software@ornl.gov).

You can also find us on our mailing list: <software@ornl.gov>.

# Release

The code of this site is released under the MIT License. For more details, see the
[LICENSE](LICENSE) File.
