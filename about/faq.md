---
title: FAQ
layout: default
---

## {{ page.title }}

{: .page-header .no_toc}

_These FAQs primarily target ORNL developers working in the [ORNL GitHub organization](https://github.com/ORNL). Don't see your question listed below? Please contact [ORNL GitHub admins](mailto:software@ornl.gov)._

-   Table of Contents
    {:toc}

### How do I set up a GitHub account?

If you’re new to GitHub and open source in general, figuring out how to get set up can be a challenge. You may want to read through the GitHub Help pages on [setting up and managing your GitHub profile](https://help.github.com/categories/setting-up-and-managing-your-github-profile/).

1. [Create an account on GitHub](https://github.com/join).

    You _do not need_ a separate work account and personal account. Instead, you can [link multiple email addresses to the same GitHub account](https://help.github.com/articles/adding-an-email-address-to-your-github-account/), which is almost always preferred.

2. [Update your profile information](https://github.com/settings/profile).

    - **Photo**: A headshot photo, or image that is uniquely you.
    - **Name**: Your first and last name.
    - **Bio**: Include a few words about yourself! Don't forget to mention @ORNL.
    - **URL**: This might be your [www.ornl.gov/staff-profile](https://www.ornl.gov/staff-profile) page, or a personal website if you prefer.
    - **Company**: Probably `Oak Ridge National Laboratory, @ORNL`.
    - **Location**: Your primary location.

3. Add your `@ORNL` email address (and any aliases) to your [Email Settings](https://github.com/settings/emails) page. This will link any commits done via [your Git identity](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup#Your-Identity) to your GitHub account.

4. [Enable two-factor authentication (2FA)](https://github.com/settings/security).

### How do I join the ORNL organization on GitHub?

If you are an employee at ORNL and have 2FA enabled, you are eligible to join the [ORNL GitHub organization](https://github.com/ornl) and appear in the [member list](https://github.com/orgs/ORNL/people).

1. Send an email, with your GitHub username included, to the [ORNL GitHub admins](mailto:software@ornl.gov) from your `@ornl.gov` email, requesting to be added to the organization.

2. After an administrator has added you to the organization, you will receive a notification email from GitHub. Alternatively, once the invitation has been sent, you will see a notification banner at the top of [github.com/ornl](https://github.com/ornl) which you can use to accept the invitation.

3. Head over to the [@ORNL People](https://github.com/orgs/ORNL/people) page and make your membership `Public`.

### How do I get my repo reviewed and released for GitHub?

Before content is placed into an ORNL GitHub.com repository, it should be reviewed and released via ORNL's Software Registration System (SRS). Please contact your division representative for information on how to use the SRS.

### What is/isn’t allowed to be included in my repo?

Remember that these repositories _are hosted_ on GitHub servers, _NOT ORNL servers_, and content placed in them should be limited to "email like" communications. That means:

-   NO Classified
-   NO Export Controlled
-   NO Official Use Only (OUO)
-   NO Health Insurance Portability and Accountability Act (HIPAA)
-   NO Personally Identifiable Information (PII)
-   NO NDA or vendor-proprietary information
-   NO Unclassified Controlled Information (UCI)
-   NO Unclassified Controlled Nuclear Information (UCNI)

When in doubt, contact your division representative further guidance.

### My project is approved for release. Now what?


### How do I include my repo in the ORNL organization and/or this website’s catalog?

Repositories within the ORNL organization are owned and managed by ORNL. Please do not create personal repositories here.

Make sure your repository is included on this website’s home page and [full catalog]({{ '/' | relative_url }}). If you’ve set up your repository within the ORNL organization, you don’t need to take any action; it will automatically appear after the next data update.

-   If your repository exists under a different organization, you can move it to ORNL by selecting “Transfer Ownership” under Settings.

-   Alternatively, you can submit a pull request [updating the `input_lists.json` file]({{site.repo_url}}/{{site.repo_blob_path}}/{{site.repo_branch}}/_explore/input_lists.json), with your organization and/or repository names.

-   If you have a project logo, please follow the [instructions]({{site.repo_url}}/{{site.repo_tree_path}}/{{site.repo_branch}}/assets/images/logos) for naming and uploading the file. If your repo is part of a non-ORNL organization that has its own avatar, that image will automatically display next to the repo name in the catalog, unless superseded by a repo-specific logo.

### How do I let people know about my new repo?

Now that your project is on GitHub, make sure users and contributors can find it! There are several ways to do this. Contact [software@ornl.gov](mailto:software@ornl.gov) if you need help.

1. Include meaningful metadata (description and topic tags) in your repository. Example: [Spack](https://github.com/spack/spack) lists several topic tags below a one-sentence description.

    - Start with our [list]({{site.repo_url}}/{{site.repo_blob_path}}/{{site.repo_branch}}/category/README.md) of recommended, standardized topics.

    - See helpful hints on [GitHub's topic help page](https://help.github.com/articles/about-topics/). Add tags relevant to your project's programming language, platforms, and more (e.g., Python, HPC, Linux).

2. Let [Twitter](https://twitter.com/{{site.twitter.username}}) followers know your project is available on GitHub. Feel free to tag this handle on your own tweet, or submit a request to [software@ornl.gov](mailto:software@ornl.gov) so we can tweet on your behalf.

3. Publicize any outreach activities or major milestones related to your project. Examples: You have a paper/poster/presentation accepted at a conference; you're hosting a workshop or webinar; your project is nominated for an award; or you're speaking on a podcast or guest blogging.

### How do I contribute news or other content to this website?

Submit a pull request! This website is a GitHub repo just like any other ORNL open source project. News is housed in the [`_posts` directory]({{site.repo_url}}/{{site.repo_tree_path}}/{{site.repo_branch}}/_posts), and templates are found in the [ORNL/.github repo](https://github.com/ORNL/.github). See the guidelines below about contributing.

Before contributing, please contact [software@ornl.gov](mailto:osoftware@ornl.gov) with your idea or if you have questions about whether your proposed content requires the ORNL review and release process.

### What should I do if my repo is no longer actively developed/maintained?

1. Remove your repo’s topic tags (e.g., `math-physics`), which connect it to this website’s browsable categories. Also remove the `radiuss` tag, if applicable.

2. Submit a pull request [updating the `input_lists.json` file]({{site.repo_url}}/{{site.repo_blob_path}}/{{site.repo_branch}}/_explore/input_lists.json) to remove your repo’s name.

3. Change your repo's status via Settings > Manage Access > Who has access > Manage > Danger Zone > Archive this repository (`settings#danger-zone`). Contact [software@ornl.gov](mailto:software@ornl.gov) if for some reason GitHub won't let you complete this step.

### My repo has grown. How do I move it out of the ORNL organization?

The process to transfer organizational ownership is straightforward, but generally discouraged. This should really only be done for projects that are starting to build a "bigger than ORNL" community, and the decision should not be made lightly.

Migrating the repo outside of the ORNL organization requires an organization admin. Contact [software@ornl.gov](mailto:software@ornl.gov) to coordinate the move.

Once the repository has moved to the new organization:

1. Submit a pull request [updating the `input_lists.json` file]({{site.repo_url}}/{{site.repo_blob_path}}/{{site.repo_branch}}/_explore/input_lists.json) to add the new organization/repo’s name. This allows for the software catalog to continue including the project even after it moves.

2. Retain topic tags (e.g., `math-physics`) to connect it to this website’s browsable categories, including the `radiuss` tag, if applicable.

### How do I contribute to an ORNL repo?

Refer to individual projects for their requirements on accepting contributions. In general though, we follow the "fork and pull" Git workflow model:

1. Fork a repository.

2. Develop your changes in your fork.

3. Sync your fork to the upstream repository (`git remote add upstream git@github.com:org/repo.git`).

4. Create a pull request to the "upstream" repository.

5. If approved, changes will be merged in by a repository maintainer.
