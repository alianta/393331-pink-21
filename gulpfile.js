const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();

//html

const html = () => {
  return gulp.src("source/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("build"));
}

exports.html = html;

// scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
  .pipe(gulp.dest("build/js"))
  .pipe(uglify())
  .pipe(rename("script.min.js"))
  .pipe(gulp.dest("build/js"))
  .pipe(sync.stream());
}

exports.scripts = scripts;

//images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(imagemin([
    imagemin.mozjpeg({progressive: true}),
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.svgo(),
  ]))
  .pipe(gulp.dest("build/img"));
}

exports.images = images;

// WebP

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
}

exports.createWebp = createWebp;

// sprite

const sprite = () => {
  return gulp.src("source/img/logo/*.svg")
  .pipe(svgstore())
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img/logo"));
}

exports.sprite = sprite;

//copy

const copy = () => {
  return gulp.src([
    "source/fonts/*.{woff,woff2}"
  ],
  {
    base: "source"
  })
  .pipe(gulp.dest("build"));
}

exports.copy = copy;

// clean

const clean = () => {
  return del("build");
}

exports.clean = clean;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/js/*.js", gulp.series("scripts"));
  gulp.watch("source/*.html").on('change', gulp.series("html", sync.reload));
}

//Build

const build = gulp.series(
  clean,
  styles,
  gulp.parallel(
    scripts,
    html,
    copy,
    images,
    sprite,
    createWebp
  )
)

exports.build = build;

exports.default = gulp.series(
  clean,
  styles,
  gulp.parallel(
    scripts,
    html,
    copy,
    images,
    sprite,
    createWebp
  ),
  gulp.series(
    server, watcher
  )
)
