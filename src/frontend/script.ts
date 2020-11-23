const $form: HTMLElement = document.getElementById("form");
const $body = document.body;
const $x = document.getElementById("x") as HTMLInputElement;
const $y = document.getElementById("y") as HTMLInputElement;
const $width = document.getElementById("width") as HTMLInputElement;
const $height = document.getElementById("height") as HTMLInputElement;
const $rotation = document.getElementById("rotation") as HTMLInputElement;
const $credits = document.getElementById("credit-line");

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

const creditTextPossibilities = [
  ["Created by", "Developed by", "Produced by", "Written by"],
  ["highly sophisticated", "some interesting", "the cool", "the insane"],
  ["code monkeys", "folks", "people"],
  [
    "in various environments",
    "in the mines of Moria",
    "in snowy places",
    "in the greatest nation of all... imagination",
  ],
];

$credits.innerHTML = generateCreditLine();
$credits.onmouseenter = () => {
  $credits.innerHTML = generateCreditLine();
};

function randomOf(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCreditLine() {
  const randomText = creditTextPossibilities.reduce(
    (a, t) => [...a, randomOf(t)],
    []
  );
  return `${randomText.join(" ")}.`;
}
