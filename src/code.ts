// This plugin changes properties with "mixed" status relatively
figma.showUI(__html__);
figma.ui.postMessage({ amountSelected: figma.currentPage.selection.length });

figma.ui.onmessage = (message) => {
  const data = message;

  for (const node of figma.currentPage.selection) {
    node.x += data.changes.x;
    node.y += data.changes.y;
    node.resize(
      node.width + data.changes.width,
      node.height + data.changes.height
    );
    node.rotation += data.changes.rotation;
  }
  figma.closePlugin();
};
