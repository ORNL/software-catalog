// GiHub Data Directory
var ghDataDir = '../github-data';
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
// Call draw functions
var popularityURL = ghDataDir + '/intReposInfo.json';
var popularityFiles = [popularityURL];
var mostPopularRepositories = [];
var cutOffSize = 10;
Promise.all(popularityFiles.map((url) => d3.json(url)))
  .then((values) => {
    mostPopularRepositories = generate_popularRepos(values[0], cutOffSize);
  })
  .then(() => {
    draw_cluster('cluster');
    draw_line_repoCreationHistory('repoCreationHistory', mostPopularRepositories);
    draw_line_repoActivity('repoActivityChart');
    draw_sunburst_licenses('popularLicenses');
    draw_pie_commits('commitPie');
    draw_pie_lines('linePie');
    draw_popularRepos('listPopularRepos', 5, true);
    draw_line_repoStarHistory('repoStarHistory');
  });
