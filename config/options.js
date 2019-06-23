const path = require("path");
const source = require("../package.json").source;
console.log(source)
module.exports = {
    name:source,
	context:path.join(__dirname,'../src'),
    outputPath:path.join(__dirname,'..'),
    template:path.join(__dirname,'../tmp/template.html'),
	js:{
		filename: `demos/${source}/script/[name].js`,
		chunkFilename: `demos/${source}/script/[name].chunks.js`,
	},
	css:{
		filename: `demos/${source}/style/[name].css`,
		chunkFilename: `demos/${source}/style/[name].chunk.css`,
    },
    html:`demos/${source}/index.html`,
	assets:`demos/${source}/[name].[ext]`
}