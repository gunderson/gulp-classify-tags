'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var cheerio = require('cheerio');
var _ = require('underscore');
var path = require('path');

module.exports = function (options) {
	/*if (!options.foo) {
		throw new gutil.PluginError('gulp-classify-tags', '`foo` required');
	}*/

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
			var pageid = path.basename(file.path, ".html");
			pageid = pageid.charAt(pageid.length - 1);

			$("ChapterIntro").each(function(){
				var $this = $(this);
				/*var $parent = $this.parent().parent().parent();
				var $replacement = $("<img>")
				$replacement.attr(
					_.extend({
						src: "assets/images/chapters/chapter-selector-bg-" + pageid + ".jpg",
						width: "100%"
					}, this.attributes));
				$replacement.addClass(this.name);
				$replacement.html($this.html());*/
				$this.remove();
				// $parent.before($replacement);
			})

			$("SectionBreak").each(function(){
				var $this = $(this);
				var $parent = $this.parent();
				var $replacement = $("<div>")
				$replacement.attr(this.attributes);
				$replacement.addClass(this.name);
				$replacement.html("***");
				$this.remove();
				$parent.after($replacement);
			})

			$("moment").each(function(){
				var $this = $(this);
				var $replacement = $("<span>")
				$replacement.attr(this.attributes);
				$replacement.addClass(this.name);
				$replacement.html($this.html());
				$this.replaceWith($replacement);
			})

			$("a").each(function(){
				var $this = $(this);
				if (!$this.attr("href")){
					$this.attr("href", $this.attr("id") + ".html");
				}
			})

			file.contents = new Buffer($.html());

			this.push(file);
		} catch (err) {
			this.emit('error', new gutil.PluginError('gulp-classify-tags', err));
		}

		cb();
	});
};
