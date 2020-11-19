// This plugin changes properties with "mixed" status relatively
figma.showUI(__html__, { width: 310 });

figma.ui.onmessage = (message) => {
  const data = message;
  if (data.type === "plugin-resize") {
    console.log("resizing", data);
    return processPluginSize(data);
  }

  processSelection(figma.currentPage.selection, data.changes);
};

function processPluginSize({ height, width }) {
  figma.ui.resize(width, height);
}

function processSelection(selection, changes) {
  for (const node of selection) {
    node.x += changes.x;
    node.y += changes.y;
    node.resize(node.width + changes.width, node.height + changes.height);
    node.rotation += changes.rotation;
  }
}
