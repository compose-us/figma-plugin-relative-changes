const $form: HTMLElement = document.getElementById("form");
const $x = document.getElementById("x") as HTMLInputElement;
const $y = document.getElementById("y") as HTMLInputElement;
const $width = document.getElementById("width") as HTMLInputElement;
const $height = document.getElementById("height") as HTMLInputElement;
const $rotation = document.getElementById("rotation") as HTMLInputElement;

$form.onsubmit = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  const changes = {
    x: parseFloat($x.value),
    y: parseFloat($y.value),
    width: parseFloat($width.value),
    height: parseFloat($height.value),
    rotation: parseFloat($rotation.value),
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
