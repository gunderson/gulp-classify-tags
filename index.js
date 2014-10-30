'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var someModule = require('some-module');
var cheerio = require('cheerio');

module.exports = function (options) {
	if (!options.foo) {
		throw new gutil.PluginError('gulp-classify-tags', '`foo` required');
	}

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			this.push(file);
			cb();
			return;
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError('gulp-classify-tags', 'Streaming not supported'));
			cb();
			return;
		}

		try {
			var str = file.contents.toString('utf8');
			var $ = cheerio.load(str);

			$("ChapterIntro, moment, SectionBreak").each(function(){
				var $this = $(this);
				$this.replaceWith("<span>").addClass(this.tagName).attr(this.attributes)
			})

			file.contents = new Buffer($.html());

			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-classify-tags', err));
		}

		cb();
	});
};
