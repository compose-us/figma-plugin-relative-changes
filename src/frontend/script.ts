const $form: HTMLElement = document.getElementById("form");
const $x: string = document.getElementById("x").getAttribute("value");
const $y: string = document.getElementById("y").getAttribute("value");
const $width: string = document.getElementById("width").getAttribute("value");
const $height: string = document.getElementById("height").getAttribute("value");
const $rotation: string = document
  .getElementById("rotation")
  .getAttribute("value");

$form.onsubmit = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  parent.postMessage(
    {
      pluginMessage: {
        changes: {
          x: parseFloat($x),
          y: parseFloat($y),
          width: parseFloat($width),
          height: parseFloat($height),
          rotation: parseFloat($rotation),
        },
      },
    },
    "*"
  );
};
