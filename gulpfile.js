/**
 * Created by naveed on 8/16/2015.
 */
var gulp = require('gulp'),
less= require('gulp-less'),
 minifyCSS=require('gulp-minify-css'),
 rename= require('gulp-rename'),
    jshint=require('gulp-jshint'),
    uglify=require('gulp-uglify'),
    concat=require('gulp-concat'),
    ngAnnotate=require('gulp-ng-annotate'),
     nodemon = require('gulp-nodemon');


gulp.task('css',function(){

    return gulp.src('public/assets/css/style.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('js',function(){

    return gulp.src(['server.js','public/app/*.js','public/app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts',function(){

    return gulp.src(['public/app/*.js','public/app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(ngAnnotate())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/dist'));
});

gulp.task('watch',function(){

     gulp.watch('public/assets/css/style.less',['css']);

    gulp.watch(['server.js','public/app/*.js','public/app/**/*.js'],['js'],['scripts']);

    return gulp.src(['server.js','public/app/*.js','public/app/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('nodemon',function(){

    nodemon({
        script:'server.js',
        ext:'js less html'
    })
        .on('start',['watch'])
        .on('change',['watch'])
        .on('restart',function(){
            console.log("Restarted");

        })
});

gulp.task('default',['nodemon']);