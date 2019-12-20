'use strict';

const gulp					= require ('gulp');
const del						= require ('del');
const sass					= require ('gulp-sass');
const cleanCss			= require ('gulp-clean-css');
const autoprefixer	= require ('gulp-autoprefixer');
const imagemin			= require ('gulp-imagemin');
const browserSync		= require ('browser-sync').create();

function clear(done){
	del('build/css/*');
	del('build/svg/*');
	del('build/js/*');
	del('build/img/*');
	done();
}

function styles(){
	return gulp.src('./src/styles/main.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		overridebrowsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(cleanCss())
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
}

function images(){
	return gulp.src('./src/images/**/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./build/img'))
	.pipe(browserSync.stream());
}

function vectors(){
	return gulp.src('./src/vectors/*')
	.pipe(gulp.dest('./build/svg'))
	.pipe(browserSync.stream()); 
}

function fonts (){ 
	return gulp.src('./src/fonts/**/*')
	.pipe(gulp.dest('./build/fonts'))
	.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			baseDir: './build'
		}
	});

	gulp.watch('./src/styles/**/*.scss', styles);
	gulp.watch('./src/images/**/*', images);
	gulp.watch('./src/fonts/**/*', fonts);
	gulp.watch('./build/index.html').on('change', browserSync.reload);
}

exports.clear = clear;
exports.styles = styles;
exports.images = images;
exports.vectors = vectors;
exports.fonts = fonts;
exports.watch = watch;
