var gulp = require('gulp');
var path = require('path');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var include = require('gulp-include');
var minifyCSS = require('gulp-minify-css');
var bower = require('gulp-bower');
var less = require('gulp-less');
var connect = require('gulp-connect');
var angularTemplatecache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');

//Notify us of any compile errors
gulp.task('lint', function() {
    gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('vendorLess', ['bower'], function() {
    //combine all js files of the app
    gulp.src('./app/vendor.css')
        .pipe(include())
        .pipe(minifyCSS())
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest('../server/public/assets/stylesheets'));
});

gulp.task('less', ['bower'], function() {
    //combine all js files of the app
    gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(minifyCSS())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('../server/public/assets/stylesheets'));
});

gulp.task('scripts', function() {
	gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
        .pipe(ngAnnotate())
		.pipe(uglify({

		}))
        .pipe(concat('app.js'))
		.pipe(gulp.dest('../server/public/assets/javascripts'))
});

gulp.task('templates', function() {
    //combine all template files of the app into a js file
    gulp.src('./app/**/*.html')
        .pipe(angularTemplatecache('templates.js', {
            standalone: true
        }))
        .pipe(gulp.dest('../server/public/assets/javascripts'));
});

gulp.task('vendorJS', ['bower'], function() {
    //concatenate vendor JS files
    gulp.src('./app/vendor.js')
        .pipe(include())
        .pipe(uglify())
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('../server/public/assets/javascripts'));
});

gulp.task('watch', function() {
    gulp.watch([
        '../server/public/**/*.html',
        '../server/public/**/*.css',
        '../server/public/**/*.js',
        '../server/**/*.rb'
    ], function(event) {
        return gulp.src(event.path)
            .pipe(connect.reload());
    });
    gulp.watch(['./app/**/*.css', './app/**/*.less'], ['less']);
    gulp.watch(['./app/**/*.js', '!./app/**/*test.js'], ['scripts']);
    gulp.watch(['./app/**/*.html'], ['templates']);

});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('./bower_components'));
});

gulp.task('connect', function (){
    connect.server({
        root: ['../server/public'],
        port: 9000,
        livereload: true
    });
});

gulp.task('build', ['lint', 'bower', 'less', 'scripts', 'vendorJS', 'vendorLess', 'templates']);
gulp.task('default', ['lint', 'less', 'vendorLess', 'scripts', 'vendorJS', 'templates', 'watch']);
