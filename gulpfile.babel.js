import gulp from 'gulp';
import grommetToolbox from 'grommet-toolbox';
import tasks from 'gulp-task-listing';


grommetToolbox(gulp);
gulp.task('tasks', tasks);
gulp.task('jslint', function() {
  console.log('Disabled jslint');
});
