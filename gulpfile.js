var gulp = require("gulp");
var livereload = require('gulp-livereload');
var forever = require('forever-monitor');
var chokidar = require('chokidar');

gulp.task('default', ['dev']);

gulp.task('dev', function() {
  livereload.listen();
  var child = new forever.Monitor('./lib/index.js', {
    fork:true, // This enables ipc (receiving messages from the child process)
  });
  // Listen for messages coming from the child
  child.on('message', function() {
    // The server has indicated that it has restarted and is ready to receive
    // requests. So that means it is the right time to livereload.
    // NOTE: child.on('restart', fn) doesn't work, hence all this work to get
    // to where we are now.
    livereload.changed('server restarted');
  });
  child.start(); // VERY IMPORTANT
  chokidar.watch('lib/**').on('all', function() {
    child.restart();
  });
  gulp.watch('public/**', livereload.changed);
});
