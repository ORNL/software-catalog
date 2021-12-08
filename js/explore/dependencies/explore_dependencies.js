// GiHub Data Directory
var ghDataDir = '../github-data';
// Global chart standards
var stdTotalWidth = 500,
  stdTotalHeight = 500;
var stdMargin = { top: 40, right: 40, bottom: 40, left: 40 },
  stdWidth = stdTotalWidth - stdMargin.left - stdMargin.right,
  stdHeight = stdTotalHeight - stdMargin.top - stdMargin.bottom,
  stdMaxBuffer = 1.07;
var stdDotRadius = 4,
  stdLgndDotRadius = 5,
  stdLgndSpacing = 20;
// Call draw functions
draw_force_graph('forceGraph', 'connectionsTree');
