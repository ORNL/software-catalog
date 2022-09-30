# Guide to Contributing

## Contributing Feature Improvements

1. On your local workstation, create a branch from the latest `dev` branch:

```
git checkout dev
git pull
git checkout -b <your-branch-here>
```

The only acceptable characters to include in your branch names are lowercase letters, numbers, hyphens, and underscores.

The branch name should ideally include the number of the issue you are working on. For example, if you are working on `Issue #45` titled `Update bar chart data`, naming your branch `45-update-bar-chart-data` is a branch name which provides useful, concise instructions.

2. Changes should generally remain relevant to the issue being addressed. Do not try to address multiple issues in one branch unless they must be tackled concurrently.
3. Your commit messages should be verbose and distinct. You should directly reference the issue number in commits, i.e. `#45 - updated bar chart data, changed D3 styling".
4. It's frequently a good idea to regularly merge `origin/dev` into your working branch. You will usually want to first commit your work, then execute the following:

```
git fetch --all
git merge origin/dev
```

Do not change the default commit message from merge commits. In the instance of conflicts, do not make additional changes in these commits beyond those necessary to resolve the merge conflict.

5. Push the commit to the working branch in your fork.
6. Submit a merge request to the `dev` branch in the project.
7. If there are merge conflict warnings, resolve the conflicts locally via merging `dev` into your working branch, as in step 4.
8. When creating the merge request:

-   Reference the issue number and the issue (i.e. `#45 - update bar chart data`) in the title
-   Briefly summarize what was changed in the description.
-   If the issue can be closed from your merge request, be sure to say `Closes #45` in the description (so that the issue will automatically be closed on merge)
-   Under `Assignees`, assign at least one person to the merge request who is listed under `Approvers`.
-   Under `Merge options`, make sure the `Delete source branch...` checkbox is checked, but do not check the `Squash commits when merge request is accepted` checkbox.

9. At least one other person must approve the merge request before merged.

### Formatting Code

It's very important to keep git diffs clean by sticking to a consistent format. The `.editorconfig` and `.prettierrc` files are used to define the code formatting. 
Editorconfig works with all files and only applies general rules, while prettier works only with HTML, CSS, Javascript, Markdown, YML, and GraphQL files (but has more specific rules).
When prettier is run, it will automatically read the .editorconfig file in addition to its own configuration file.

Most editors either come with editorconfig support by default, or have plugins you can install. Editorconfig works with all files.

For prettier support, there are plugins for specific editors (i.e. VSCode, complete list here: https://prettier.io/docs/en/editors.html), or you can run it from the command line:

```
npm install -g prettier
prettier --write [FILES]
```

## Contributing Hotfixes

A "hotfix" is something which resolves a bug that is in _production_, and which needs immediate resolution. When following best software development practices, hotfixes should be extremely rare; however, they do happen.

The process for hotfixes is similar to features, except for the following:

-   The `dev` branch will be ignored entirely.
-   Create a branch from `main` .
-   Hotfix changes should be much narrower in focus - only make fixes which are mandatory for the application to function.
-   Create a merge request into `main` .
-   After the hotfix is merged into `main`, `main` should be merged into `dev` by a maintainer.

## Handling intra-site URLs

All URLs between website pages should work, regardless of the actual URL being used. You should be able to comment/uncomment the `baseurl` configuration value in `_config.yml` and have the website work consistently.

- Inside of HTML and Markdown, you should always reference URLs like ``` <a href="{{ 'path/to/page' | relative_url }}"> ...```
- Inside of SCSS, if using `url()`, just use a relative path to the file (i.e. `url(../images/image.png`))
- Inside of Javascript, start the URL string with ``` `${window.config.baseUrl}` ```
