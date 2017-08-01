var gulp = require('gulp'),
    watch = require("gulp-watch"),
    browserSync = require('browser-sync').create();

gulp.task("watch", ()=>{

  //activer le serveur créer par browserSync qui utilise le dossier "app"
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  //utiliser la method .reload de browserSync chaque fois qu'un changement
  // est détecter ce le ficher
  watch("./app/index.html", ()=>{
    browserSync.reload();
  });


  watch("./app/assets/styles/**/*.css", ()=>{
    gulp.start("cssInject");

  });

  //watch for any changes in our javascripts files
  watch('./app/assets/scripts/**/*.js', function() {
    gulp.start('scriptsRefresh');
  });


});

// cette task n'est lancé que si les "dependencies" contenues dans le deuxieme
//argument ( ici ["styles]" ) n'ont été lancé et terminer
gulp.task('cssInject',["styles"] , ()=> {
  return gulp.src('./app/temp/styles/styles.css')
  .pipe(browserSync.stream());
});


gulp.task('scriptsRefresh', ['scripts'],  function() {
  browserSync.reload();
});
