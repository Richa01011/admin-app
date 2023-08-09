import browserSync from "browser-sync";
import { deleteAsync } from "del";
import gulp from "gulp";
import gulpPug from "gulp-pug";
import autoprefixer from "gulp-autoprefixer";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import concat from "gulp-concat";
import webpack from "webpack";
import webpackStream from "webpack-stream";

const sass = gulpSass(dartSass);
const src = gulp.src;
const dest = gulp.dest;
const watch = gulp.watch;
const series = gulp.series;
const task = gulp.task;

function server() {
	browserSync.init({ server: { baseDir: "./public" } });

	watch("./source/pug/**/*.pug", pug).on("all", browserSync.reload);
	watch("./source/pug/render-elements/**/*.pug", pugElements).on("all", browserSync.reload);
	watch("./source/scss/**/*.scss", stylesDev);
	watch("./source/js/libs.js", jsLibs).on("all", browserSync.reload);
	watch(["./source/js/**/*[.js, .json]", "!./source/js/libs.js"], javascript).on("all", browserSync.reload);
	watch("./source/images/**/**.*", image).on("all", browserSync.reload);
	watch("./source/video/**/**.*", video).on("all", browserSync.reload);
	watch("./source/fonts/**/**.*", fonts).on("all", browserSync.reload);
}

function clear() {
	return deleteAsync("./public");
}

function pug() {
	return src("./source/pug/*.pug")
		.pipe(
			gulpPug({
				pretty: true,
			})
		)
		.pipe(dest("./public"));
}
function pugElements() {
	return src("./source/pug/render-elements/**/*.pug").pipe(gulpPug()).pipe(dest("./public/render-elements"));
}
function stylesDev() {
	return src("./source/scss/*.scss")
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(dest("./public"))
		.pipe(browserSync.stream());
}
function stylesBuild() {
	return src("./source/scss/*.scss")
		.pipe(sass({ outputStyle: "compressed" }))
		.pipe(autoprefixer())
		.pipe(dest("./public"));
}

function image() {
	return src("./source/images/**/**.*").pipe(dest("./public/images"));
}

function video() {
	return src("./source/video/**/**.*").pipe(dest("./public/video"));
}

function fonts() {
	return src("./source/fonts/*").pipe(dest("./public/fonts"));
}

function jsLibs() {
	return src("./source/js/libs.js")
		.pipe(
			webpackStream(
				{
					mode: "production",
				},
				webpack
			)
		)
		.pipe(concat("libs.js"))
		.pipe(dest("./public/js"));
}

function javascript() {
	return src(["./source/js/**/*[.js, .json]", "!./source/js/libs.js"]).pipe(dest("./public/js"));
}

const dev = series(clear, pug, pugElements, stylesDev, jsLibs, javascript, image, video, fonts, server);
const build = series(clear, pug, pugElements, stylesBuild, jsLibs, javascript, image, video, fonts);

task("dev", dev);
task("build", build);
