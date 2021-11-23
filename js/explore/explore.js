// GiHub Data Directory
var ghDataDir = './github-data';
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
draw_line_repoCreationHistory('repoCreationHistory');
draw_pie_members('pieMembers');
draw_pie_repos('pieRepos');
draw_line_repoActivity('repoActivityChart');
draw_scatter_repoPulls('repoPulls');
draw_scatter_repoIssues('repoIssues');
draw_pie_language('languagePie');
draw_cloud_topics('topicCloud');
draw_sunburst_licenses('licenseSunburst');
draw_pack_hierarchy('hierarchyPack');
draw_line_repoStarHistory('repoStarHistoryChart');
