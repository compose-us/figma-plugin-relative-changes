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
    .src("src/frontend/script.ts")
    .pipe(
      ts({
        outFile: "ui.js",
      })
    )
    .pipe(gulp.dest(dest));
};

const inlineSource = () => {
  return gulp
    .src("src/frontend/template.html")
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

const branding = () => {
  return gulp.src("src/frontend/branding.png").pipe(gulp.dest(dest));
};

const done = () => {
  return gulp.src(`${dest}ui.js`).pipe(clean({ force: true }));
};

exports.default = gulp.series(
  typescript,
  backend,
  inlineSource,
  manifest,
  branding,
  done
);

exports.watch = () => {
  return gulp.watch(
    ["./src/**/**"],
    gulp.series(typescript, backend, inlineSource)
  );
};
