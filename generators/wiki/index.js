const Generator = require('yeoman-generator');
const jhipsterUtils = require('generator-jhipster-x/generators/utils');
const ejs = require('ejs')

const packagejs = require('../../package.json');


module.exports = class extends Generator {

    prompting() {
/*        const prompts = [
            {
                type: 'input',
                name: 'message',
                message: 'Please put something',
                default: 'hello world!'
            }
        ];

        const done = this.async();
        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        });*/
    }

    writing() {
        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        if(!this.fs.exists(this.destinationPath(this.options.env.cwd + '/' + '.generator-vuejs2'))) {
            this.composeWith(require.resolve('generator-jhipster-vuejs2/generators/app'))
        }

        this.fs.copy(
          this.templatePath('./'),
          this.destinationPath('src/main/webapp/src/views/wiki')
        );

        this.log(this.templatePath('./MenuApp.ejs'))

        let template = ejs.renderFile(this.templatePath('./MenuApp.ejs'), {}, (err, str) => {
            jhipsterUtils.rewriteFile(
                {
                    path: '/',
                    file: this.destinationPath(this.options.env.cwd+'/src/main/webapp/src/views/MenuApp.vue'),
                    needle: 'insertlinkshere',
                    splicable: [
                        str
                    ]
                },
                this
            );
        });

        template = ejs.renderFile(this.templatePath('./MenuLeft.ejs'), {}, (err, str) => {
            jhipsterUtils.rewriteFile(
                {
                    path: '/',
                    file: this.destinationPath(this.options.env.cwd+'/src/main/webapp/src/views/MenuLeft.vue'),
                    needle: 'insertapplinkshere',
                    splicable: [
                        str
                    ]
                },
                this
            );
        });

    }

    end() {
        this.log('End of Wiki generator');
    }
};
