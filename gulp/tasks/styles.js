var gulp = require('gulp'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssimport =  require('postcss-import'),
mixins = require('postcss-mixins'),
hexrgba = require('postcss-hexrgba');

gulp.task("styles", function(){
  return gulp.src("./app/assets/styles/styles.css")
  .pipe(postcss([cssimport, mixins, cssvars, nested, hexrgba, autoprefixer]))
  // erro handling: en cas d'erreur glulp renvoie des info sur l'erreur
  .on('error', function(errorInfo){
    console.log(errorInfo.toString());
    //mais ne termine pas le processus de watch ou le serveur
    this.emit('end');
  })
  .pipe(gulp.dest('./app/temp/styles/'));
});
