// This plugin changes properties with "mixed" status relatively
figma.showUI(__html__);

figma.ui.onmessage = (message) => {
  const data = message;

  processSelection(figma.currentPage.selection, data.changes);

  figma.closePlugin();
};

function processSelection(selection, changes) {
  for (const node of selection) {
    node.x += changes.x;
    node.y += changes.y;
    node.resize(node.width + changes.width, node.height + changes.height);
    node.rotation += changes.rotation;
  }
}
