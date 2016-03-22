/// <binding BeforeBuild='default' Clean='clean' />
var gulp = require("gulp");
var del = require("del");
var print = require("gulp-print");
var merge = require("merge-stream");
var eventStream = require('event-stream');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

var dnx = require("gulp-dnx");

var tsProject = tsc.createProject("./tsconfig.json");

var pth = {
    npm: "./node_modules/",
    wroot: "./wwwroot/"
}

var libs = [
 pth.npm + "es6-shim/es6-shim.min.js",
 pth.npm + "systemjs/dist/system-polyfills.js",
 pth.npm + "angular2/bundles/angular2-polyfills.js",
 pth.npm + "systemjs/dist/system.src.js",
 pth.npm + "rxjs/bundles/Rx.js",
 pth.npm + "angular2/bundles/angular2.dev.js",
 pth.npm + "angular2/bundles/http.dev.js",
 pth.npm + "angular2/bundles/router.dev.js",

 pth.npm + "jquery/dist/jquery.min.js",
 pth.npm + "bootstrap/dist/js/bootstrap.min.js",
 pth.npm + "moment/moment.js",
 pth.npm + "ng2-bootstrap/bundles/ng2-bootstrap.js"
];

var cssFiles = [
    pth.wroot + "app/content/style.css",
    pth.npm + "bootstrap/dist/css/bootstrap.min.css",
    pth.npm + "font-awesome/css/font-awesome.min.css"
];

gulp.task("copy:libs", function () {
    return gulp.src(libs)
        .pipe(gulp.dest(pth.wroot + "lib"));
});

gulp.task("copy:js", function () {

    return gulp.src([pth.wroot + "app/**/*.js"])
            .pipe(gulp.dest(pth.wroot + "/js/"));

});

gulp.task("copy:css", function () {
    var css = gulp.src(cssFiles)
      .pipe(gulp.dest(pth.wroot + "css"))

    var fonts = gulp.src(pth.npm + "font-awesome/fonts/*.*")
      .pipe(gulp.dest(pth.wroot + "fonts"))

    return merge(css, fonts);
});

gulp.task("clean", function (cb) {
    return del([
        pth.wroot + "js",
        pth.wroot + "lib",
        pth.wroot + "css",
        pth.wroot + "fonts",
        pth.wroot + 'app/**/*.js', pth.wroot + 'app/**/*.js.map'], cb);
});

// TypeScript compile
gulp.task("compile", function () {
    return gulp.src([
            pth.wroot + 'app/**/*.ts',
            "typings/main.d.ts/"
    ]).pipe(sourcemaps.init())
        .pipe(tsc(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(pth.wroot + 'app'));
});


gulp.task('default', function (cb) {
    return runSequence('clean', ['copy:libs', 'copy:css'], ['compile'], cb);
});


gulp.task('watch', function () {
    gulp.watch(pth.wroot + 'app/**/*', ['compile']);
});

gulp.task('dnx-run', dnx('web'));
