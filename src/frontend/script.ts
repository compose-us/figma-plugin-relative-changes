const $form: HTMLElement = document.getElementById("form");
const $body = document.body;
const $x = document.getElementById("x") as HTMLInputElement;
const $y = document.getElementById("y") as HTMLInputElement;
const $width = document.getElementById("width") as HTMLInputElement;
const $height = document.getElementById("height") as HTMLInputElement;
const $rotation = document.getElementById("rotation") as HTMLInputElement;

parent.postMessage(
  {
    pluginMessage: {
      type: "plugin-resize",
      height: $body.scrollHeight,
      width: $body.scrollWidth,
    },
  },
  "*"
);

$form.onsubmit = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  const changes = {
    x: $x.value,
    y: $y.value,
    width: $width.value,
    height: $height.value,
    rotation: $rotation.value,
  };
  parent.postMessage(
    {
      pluginMessage: {
        changes,
      },
    },
    "*"
  );
};
