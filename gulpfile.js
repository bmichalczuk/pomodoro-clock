var gulp = require("gulp"),
	sass = require("gulp-ruby-sass"),
	livereload = require("gulp-livereload"),
	prefix = require("gulp-autoprefixer"),
	uglify = require("gulp-uglify"),
	pump = require("pump");
	
	function errorLog(error) {
		console.error.bind(error);
		this.emit("end");
	}


gulp.task("styles", function() {
	return sass("src/scss/**/*.scss", {style: /*"expanded"*/"compressed"})
	.on("error", errorLog) 
	.pipe(prefix("last 3 versions"))
	.pipe(gulp.dest("dist/css"))
	.pipe(livereload());
});

gulp.task("document", function() {
	gulp.src("*.html")
	.on("error", errorLog)
	.pipe(livereload());
});
gulp.task("compress", function() {
		gulp.src("src/js/*.js")
		.pipe(uglify())
		.on("error", errorLog)
		.pipe(gulp.dest("dist/js/"))
		.pipe(livereload());
});

//watches js and styles
gulp.task("watch", function() {
	gulp.watch("src/js/*", ["compress"]);
	gulp.watch("src/scss/**/*.scss", ["styles"]);
	gulp.watch("*.html", ["document"]);
	livereload.listen();
	
});


gulp.task('default', ["styles","document","compress", "watch"]);

