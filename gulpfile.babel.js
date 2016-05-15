import gulp from 'gulp';
import path from 'path';
import grommetToolbox from 'grommet-toolbox';
import git from 'gulp-git';
import del from 'del';
import mkdirp from 'mkdirp';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import minifyCss from 'gulp-cssnano';
import tasks from 'gulp-task-listing';


gulp.task('dist-css', () => {
  return gulp.src('src/scss/index.scss')
    .pipe(sass({
      includePaths: [path.resolve(__dirname, './node_modules')]
    }))
    .pipe(rename('timeline-chart.min.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/'));
});

grommetToolbox(gulp);
gulp.task('tasks', tasks);
