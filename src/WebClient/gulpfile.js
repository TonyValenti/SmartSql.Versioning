/// <binding AfterBuild='copy:css, copy:libs' />
var gulp = require("gulp");
var del = require("del");
var print = require("gulp-print");
var merge = require("merge-stream");
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

var dnx = require("gulp-dnx");

var tscConfig = require('./tsconfig.json');

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
 pth.npm + "bootstrap/dist/js/bootstrap.min.js"
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
    return del([pth.wroot + "js", pth.wroot + "lib", pth.wroot + "css", pth.wroot + 'app/**/*.js', pth.wroot + 'app/**/*.js.map'], cb);
});
 
// TypeScript compile
gulp.task('compile', function () {
    return gulp
        .src(wroot + 'app/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'));
});
 
gulp.task('default', function (cb) {
    return runSequence('clean', ['copy:libs', 'copy:js', 'copy:css'], ['watch', 'dnx-run'], cb);
});


gulp.task('watch', function () {
    gulp.watch(pth.wroot + 'app/**/*', ['compile']); 
});

gulp.task('dnx-run', dnx('web'));
