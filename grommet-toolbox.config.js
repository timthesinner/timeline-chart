import path from 'path';

export default {
  dist: path.resolve(__dirname, 'dist'),
  devServerPort: 1337,
  copyAssets: [
    'src/index.html',
    {
      asset: 'src/js/**',
      babel: true
    },
    {
      asset: 'src/scss/**',
      dist: 'dist/scss/'
    }
  ],
  scssAssets: ['src/scss/**/*.scss'],
  jsAssets: [
    'src/js/**/*.js'
  ],
  mainJs: 'src/js/index.js',
  mainScss: 'src/scss/index.scss',
  webpack: {
    resolve: {
      root: [
        path.resolve(__dirname, 'src/js'),
        path.resolve(__dirname, 'src/scss'),
        path.resolve(__dirname, 'node_modules')
      ]
    }
  },
  scsslint: true
};
