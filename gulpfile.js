const fs = require("fs");
const gulp = require("gulp");
const ts = require("gulp-typescript");
const is = require("gulp-inline-source");
const clean = require("gulp-clean");
const rename = require("gulp-rename");

const pkg = JSON.parse(fs.readFileSync("./package.json"));
const dest = pkg.destination ? pkg.destination : "build/";

const typescript = () => {
  return gulp
    .src("src/frontend/ui.script.ts")
    .pipe(
      ts({
        outFile: "ui.js",
      })
    )
    .pipe(gulp.dest("src/frontend/"));
};

const inlineSource = () => {
  return gulp
    .src("src/frontend/ui.template.html")
    .pipe(rename("ui.html"))
    .pipe(is())
    .pipe(gulp.dest(dest));
};

const backend = () => {
  const tsProject = ts.createProject("tsconfig.json");
  return gulp
    .src("src/backend/code.ts")
    .pipe(tsProject({ outFile: "code.js" }))
    .pipe(gulp.dest(dest));
};

const manifest = () => {
  return gulp.src("src/backend/manifest.json").pipe(gulp.dest(dest));
};

const done = () => {
  return gulp
    .src("src/frontend/ui.js")
    .pipe(clean({ force: true }))
    .pipe(gulp.dest(dest));
};

exports.default = gulp.series(
  typescript,
  backend,
  inlineSource,
  manifest,
  done
);

exports.watch = () => {
  return gulp.watch(
    ["./src/frontend/**", "!./src/frontend/ui.js"],
    gulp.series(typescript, inlineSource)
  );
};
