var Generator = require('yeoman-generator');


module.exports = class extends Generator {
	get initializing() {
		return {
			test() {
				this.log(this.fs.exists(this.templatePath('index.html')) && 12)
				this.log(3);
			}
		}
	}
}