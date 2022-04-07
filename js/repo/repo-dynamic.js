/** GLOBALS */
// GiHub Data Directory
var ghDataDir = '../explore/github-data';
// Global chart standards
var stdTotalWidth = 500,
  stdTotalHeight = 400;
var stdMargin = { top: 40, right: 40, bottom: 40, left: 40 },
  stdWidth = stdTotalWidth - stdMargin.left - stdMargin.right,
  stdHeight = stdTotalHeight - stdMargin.top - stdMargin.bottom,
  stdMaxBuffer = 1.07;
var stdDotRadius = 4,
  stdLgndDotRadius = 5,
  stdLgndSpacing = 20;

/** everything below this line should be specific to this script */

/**
 * @param {string|null|undefined} queryParam parameter which may have been decoded from URL query parameter (or may not exist)
 */
function renderError(queryParam) {
  document.getElementById('inner-content').innerHTML = `
    <h2><span class="fa fa-exclamation-circle"></span> Whoops...</h2>
    <p>${queryParam ? `The repository ${queryParam} is not in our catalog.` : 'No repository specified in the URL (i.e. "?name=).'}</p>
  `;
}

/**
 * @param {Object} repo repo property from intReposInfo.json
 * @param {number} pulls count of all pull requests (open + closed)
 * @param {number} issues count of all issues (open + closed)
 */
function renderRepo(repo, pulls, issues) {
  document.getElementById('inner-content').innerHTML = `
    <h2 class="page-header text-center">
      <a class="title" href="${repo.url}" title="View Project on GitHub">${sanitizeHTML(repo.name)}</a>
      <br />
      <a class="subtitle" href="https://github.com/${repo.owner.login}" title="View Owner on GitHub">
        <span class="fa fa-user-circle"></span>${repo.owner.login }
      </a>
      ${repo.primaryLanguage ? `
        <span class="subtitle" title="Primary Language">
          <span class="fa fa-code"></span>
          ${repo.primaryLanguage.name}
        </span>
      `: ''}
      ${repo.licenseInfo && repo.licenseInfo.spdxId !== 'NOASSERTION' ? `
        <a
          class="subtitle"
          href="${repo.licenseInfo.url}"
          title="${repo.licenseInfo.name}"
        >
          <span class="fa fa-balance-scale"></span>
          ${repo.licenseInfo.spdxId}
        </a>
      ` : ''}
    </h2>

    <p class="stats text-center">
      <a href="${repo.url}"> <span class="fa fa-github"></span>GitHub Page </a>

      <a href="${repo.url}/stargazers"> <span class="fa fa-star"></span>Stargazers : ${repo.stargazers.totalCount} </a>

      <a href="${repo.url}/network"> <span class="fa fa-code-fork"></span>Forks : ${repo.forks.totalCount} </a>

      ${repo.homepageUrl ? `
        <a href="${repo.homepageUrl}"> <span class="fa fa-globe"></span>Project Website </a>
      ` : ''}
    </p>
    ${repo.description ? `
      <blockquote cite="${repo.url}"> ${sanitizeHTML(repo.description)} </blockquote>
    ` : ''}

    <div class="text-center">
      <svg class="repoActivityChart"></svg>
      <br />
      <svg class="pieUsers"></svg>
      <br />
      ${pulls ? '<svg class="piePulls"></svg>' : ''}
      ${issues ? '<svg class="pieIssues"></svg>' : ''}
      <br />
      <svg class="repoCreationHistory"></svg>
      <br />
      ${repo.stargazers.totalCount ? '<svg class="repoStarHistory"></svg>' : ''}
      <br />
      ${repo.languages.totalCount ? '<svg class="languagePie"></svg>' : ''}
      ${repo.repositoryTopics.totalCount ? '<svg class="topicCloud"></svg>' : ''}
    </div>
  `;
}

/**
 *
 * @param {string} queryParam parameter which was decoded from URL query parameter
 */
function render(queryParam) {
  fetch('/explore/github-data/intReposInfo.json')
    .then((res) => res.json())
    .then((infoJson) => {
      const reposObj = infoJson.data;
      if (reposObj.hasOwnProperty(queryParam)) {
        const repo = reposObj[queryParam];
        let pulls = 0;
        let issues = 0;
        const pullCounters = ['pullRequests_Merged', 'pullRequests_Open'];
        const issueCounters = ['issues_Closed', 'issues_Open'];
        pullCounters.forEach(function (c) {
          pulls += repo[c]['totalCount'];
        });
        issueCounters.forEach(function (c) {
          issues += repo[c]['totalCount'];
        });
        renderRepo(repo, pulls, issues);
        draw_line_repoActivity('repoActivityChart', queryParam);
        draw_pie_repoUsers('pieUsers', queryParam);
        draw_line_repoCreationHistory('repoCreationHistory', queryParam);
        draw_pie_languages('languagePie', queryParam);
        draw_cloud_topics('topicCloud', queryParam);
        if (repo.stargazers.totalCount) {
          draw_line_repoStarHistory('repoStarHistory', queryParam);
        }
        if (pulls) {
          draw_pie_repoPulls('piePulls', queryParam);
        }
        if (issues) {
          draw_pie_repoIssues('pieIssues', queryParam);
        }
      } else {
        renderError(queryParam);
      }
    });
}

// init
const repo = new URLSearchParams(window.location.search).get('name');
if (repo) {
  // TODO make this case-sensitive (may need to tweak the backend to store the repository keys as all lowercase in the JSON (store the original repo casing syntax inside the value))
  render(decodeURIComponent(repo));
} else {
  renderError();
}
