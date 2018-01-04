
fis.set('project.files', ['static/**']).set('project.charset', 'utf-8');

fis.match('**/*.less', {
	rExt: '.css', // from .less to .css
	parser: fis.plugin('less-2.x')
});

fis
	.match(/^\/static\/(.*)/i, {
		release: '/staticPub/$1',
		url: '/staticPub/$1'
	})
	.match('*.js', {
		optimizer: fis.plugin('uglify-js',{
			mangle: {
				except: 'exports, module, require, define'
			}
		})
	})
	.match('*.css', {
		optimizer: fis.plugin('clean-css')
	})
	.match('*.png', {
		optimizer: fis.plugin('png-compressor')
	})
	.match('*.html', {
		optimizer: fis.plugin('html-minifier',{
			minifyCSS:true,
			minifyJS:true,
			removeComments:true
		})
	})
	.match(/^\/static\/js\/lib\/min\/(.*\.js)/i,{
		useCompile: false,
		useOptimizer : false
	});