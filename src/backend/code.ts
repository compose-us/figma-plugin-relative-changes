// This plugin changes properties with "mixed" status relatively
figma.showUI(__html__, { width: 310 });

figma.ui.onmessage = (message) => {
  const data = message;
  if (data.type === "plugin-resize") {
    return processPluginSize(data);
  }

  processSelection(figma.currentPage.selection, data.changes);
};

function processPluginSize({
  height,
  width,
}: {
  height: number;
  width: number;
}): void {
  figma.ui.resize(width, height);
}

function processSelection(
  selection,
  changes: {
    height: string;
    rotation: string;
    width: string;
    x: string;
    y: string;
  }
): void {
  for (const node of selection) {
    const initialValues = {
      height: node.height,
      rotation: node.rotation,
      width: node.width,
      x: node.x,
      y: node.y,
    };
    node.x = newValueFor(initialValues, initialValues.x, changes.x);
    node.y = newValueFor(initialValues, initialValues.y, changes.y);
    const newHeight = newValueFor(
      initialValues,
      initialValues.height,
      changes.height
    );
    const newWidth = newValueFor(
      initialValues,
      initialValues.width,
      changes.width
    );
    node.resize(newWidth, newHeight);
    node.rotation = newValueFor(
      initialValues,
      initialValues.rotation,
      changes.rotation
    );
  }
}

function newValueFor(
  { height, rotation, width, x, y },
  initialValue: number,
  change: string
): number {
  console.log("newValueFor", { initialValue, change });
  const calculation = change
    .replace(/\bmixed\b/gi, `${initialValue}`)
    .replace(/\bh\b/gi, `${height}`)
    .replace(/\bw\b/gi, `${width}`)
    .replace(/\bx\b/gi, `${x}`)
    .replace(/\by\b/gi, `${y}`)
    .replace(/\br\b/gi, `${rotation}`);
  console.log("calculation", calculation);
  if (/^[0-9.+\-*/()]+$/.test(calculation)) {
    const fn = new Function(`return ${calculation};`);
    const result = fn.apply(null);
    console.log("got a result!", result);
    return result;
  }
  console.log("returning initialValue", calculation);
  return initialValue;
}
