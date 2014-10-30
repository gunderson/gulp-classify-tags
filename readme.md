# [gulp](http://gulpjs.com)-classify-tags [![Build Status](https://travis-ci.org/gunderson/gulp-classify-tags.svg?branch=master)](https://travis-ci.org/gunderson/gulp-classify-tags)

> Lorem ipsum


## Install

```sh
$ npm install --save-dev gulp-classify-tags
```


## Usage

```js
var gulp = require('gulp');
var classifyTags = require('gulp-classify-tags');

gulp.task('default', function () {
	return gulp.src('src/file.ext')
		.pipe(classifyTags())
		.pipe(gulp.dest('dist'));
});
```


## API

### classifyTags(options)

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [](https://github.com/gunderson)
