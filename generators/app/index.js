const chalk = require('chalk');
const packagejs = require('../../package.json');
const BaseGenerator = require('generator-jhipster-x/generators/generator-base');
const jhipsterConstants = require('generator-jhipster-x/generators/generator-constants');
const extend = require('deep-extend');
const ejs = require('ejs')

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            init(args) {
                if (args === 'default') {
                    // do something when argument is 'default'
                }
            },
            readConfig() {
                this.jhipsterAppConfig = this.getJhipsterAppConfig();
                this.log(this.jhipsterAppConfig)
                if (!this.jhipsterAppConfig) {
                    this.error('Can\'t read .yo-rc.json');
                }
            },
            displayLogo() {
                // it's here to show that you can use functions from generator-jhipster
                // this function is in: generator-jhipster/generators/generator-base.js
                this.printJHipsterLogo();

                // Have Yeoman greet the user.
                this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster vuejs')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
            },
            checkJhipster() {

            }
        };
    }

    prompting() {

        let ver = this._globalConfig.name.split(':')[1];
        const done = this.async();
        const prompts = [
            {
                type: 'confirm',
                name: 'runGen',
                message: 'Do you want to run Vue generator ' + ver,
                default: true
            },
        ];

        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        });
    }

    async writing() {
        if(!this.props.runGen) {
            return false;
        }
        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };
        let baseName = this.jhipsterAppConfig.baseName;
        // read config from .yo-rc.json
/*        this.baseName = this.jhipsterAppConfig.baseName;
        this.packageName = this.jhipsterAppConfig.packageName;
        this.packageFolder = this.jhipsterAppConfig.packageFolder;
        this.clientFramework = this.jhipsterAppConfig.clientFramework;
        this.clientPackageManager = this.jhipsterAppConfig.clientPackageManager;
        this.buildTool = this.jhipsterAppConfig.buildTool;

        // use function in generator-base.js from generator-jhipster
        this.angularAppName = this.getAngularAppName();

        // use constants from generator-constants.js
        const javaDir = `${jhipsterConstants.SERVER_MAIN_SRC_DIR + this.packageFolder}/`;
        const resourceDir = jhipsterConstants.SERVER_MAIN_RES_DIR;
        const webappDir = 'src/main/webapp/';

        // variable from questions
        // this.message = this.props.message;

        // show all variables
        this.log('\n--- some config read from config ---');
        this.log(`baseName=${this.baseName}`);
        this.log(`packageName=${this.packageName}`);
        this.log(`clientFramework=${this.clientFramework}`);
        this.log(`clientPackageManager=${this.clientPackageManager}`);
        this.log(`buildTool=${this.buildTool}`);

        this.log('\n--- some function ---');
        this.log(`angularAppName=${this.angularAppName}`);

        this.log('\n--- some const ---');
        this.log(`javaDir=${javaDir}`);
        this.log(`resourceDir=${resourceDir}`);
        this.log(`webappDir=${webappDir}`);

        this.log('\n--- variables from questions ---');
        this.log(`\nmessage=${this.message}`);*/
        this.log('------AAA\n');
        const Promise = require('bluebird');
        const fs = Promise.promisifyAll(require('fs'));
        const mkdirp = require('mkdirp-promise')
        await mkdirp(this.options.env.cwd+'/src/main/webapp');
        //await Promise.all(['src','public','build'].map(f=>mkdirp(this.destinationPath('src/main/webapp/'+'/'+f))));

        this.fs.copy(
          this.templatePath('./src'),
          this.destinationPath('src/main/webapp/'+'/src')
        );

        this.fs.copy(
          this.templatePath('./public'),
          this.destinationPath('src/main/webapp/'+'/public')
        );
        
        this.fs.copyTpl(
            this.templatePath('vue.config.ejs'),
            this.destinationPath(this.options.env.cwd+'/vue.config.js'),
            {srcdir: this.options.env.cwd+'/'+'src/main/webapp/'}
        )

        this.fs.copyTpl(
            this.templatePath('babel.config.js'),
            this.destinationPath(this.options.env.cwd+'/'+'babel.config.js'),
            {}
        )

        this.fs.copyTpl(
            this.templatePath('.postcssrc.js'),
            this.destinationPath(this.options.env.cwd+'/'+'.postcssrc.js'),
            {}
        )

        this.fs.copyTpl(
            this.templatePath('.browserslistrc'),
        this.destinationPath(this.options.env.cwd+'/'+'.browserslistrc'),
            {}
        )

        this.fs.copyTpl(
            this.templatePath('.postcssrc.js'),
            this.destinationPath(this.options.env.cwd+'/'+'.postcssrc.js'),
            {}
        )

        this.fs.copyTpl(
            this.templatePath('./src/views/mixins/Table.ejs'),
            this.destinationPath(this.options.env.cwd+'/src/main/webapp/src/views/mixins/Table.js'),
            {baseName}
        )
        const yorc = this.fs.readJSON(this.destinationPath('.yo-rc.json'), {});

        this.fs.copyTpl(
            this.templatePath('./src/i18n/index.ejs'),
            this.destinationPath(this.options.env.cwd+'/'+'/src/main/webapp/i18n/index.js'),
            {languages: yorc['generator-jhipster-x'].languages}
        )
        for(lang of yorc['generator-jhipster-x'].languages) {
            this.fs.copyTpl(
                this.templatePath('./src/i18n/app.json.ejs'),
                this.destinationPath(this.options.env.cwd+'/'+'/src/main/webapp/i18n/'+lang+'/app.json'),
                {}
            )

            this.fs.copyTpl(
                this.templatePath('./src/i18n/validations.json.ejs'),
                this.destinationPath(this.options.env.cwd+'/'+'/src/main/webapp/i18n/'+lang+'/validations.json'),
                {}
            )

            this.fs.copyTpl(
                this.templatePath('./src/i18n/langIndex.ejs'),
                this.destinationPath(this.options.env.cwd+'/'+'/src/main/webapp/i18n/'+lang+'/index.js'),
                {}
            )
        }

/*        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath('src/main/webapp/'+'/'+'.gitignore'),
            {}
        )*/

let destPath = this.options.env.cwd+'/'+'src/main/webapp/'+'/src';
        this.fs.copyTpl(
            this.templatePath('./src/store/entity.js'),
            this.destinationPath(destPath+'/store/entity.js'),
            {}
        )
        this.fs.copyTpl(
                this.templatePath('./src/views/entities/index.js'),
                this.destinationPath(destPath+'/views/entities/index.js'),
                {}
            )


        const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
        //const generatorGeneratorPkg = require('../../package.json');

        extend(pkg, {
          dependencies: {
            "axios": "^0.18.0",
            "cookies-js": "^1.2.3",
            "jquery": "^3.3.1",
            "lodash": "^4.17.10",
            "vee-validate": "^2.1.0-beta.7",
            "vue": "^2.5.17",
            "vue-i18n": "^8.1.0",
            "vue-router": "^3.0.1",
            "vue2-datatable-component": "^2.3.1",
            "vueify": "^9.4.1",
            "vuetify": "^1.0.19",
            "vuex": "^3.0.1",
            "material-design-icons-iconfont": "^3.0.3",
            "vuedraggable": "^2.16.0",
            "vue-quill-editor": "^3.0.6",
            "luxon": "^1.8.2",
            "vue-datetime": "^1.0.0-beta.8",
            "weekstart": "^1.0.0",
            "v-img": "^0.2.0",
            "swagger-ui": "^3.20.4",
            "vue-multiselect": "^2.1.3"

          },
          devDependencies: {
            "@babel/polyfill": "^7.0.0-beta.49",
            "@vue/cli-plugin-babel": "^3.0.0",
            "@vue/cli-service": "^3.0.0",
            "stylus": "^0.54.5",
            "stylus-loader": "^3.0.2",
            "vue-cli-plugin-vuetify": "^0.1.6",
            "vue-template-compiler": "^2.5.17"
          },
          scripts: {
            "serve": "vue-cli-service serve --port 8888",
            "build": "vue-cli-service build"
          },
        });

        this.fs.writeJSON(this.destinationPath('package.json'), pkg);















        try {
            this.registerModule('generator-jhipster-vuejs2', 'entity', 'post', 'entity', 'jHipster generator for vuejs client side');
        } catch (err) {
            this.log(`${chalk.red.bold('WARN!')} Could not register as a jhipster entity post creation hook...\n`);
        }
    }

    install() {

        //install dependencies from package.json dependencies
        let logMsg =
            `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;

        if (this.clientFramework === 'angular1') {
            logMsg =
                `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install & bower install`)}`;
        }
        const injectDependenciesAndConstants = (err) => {
            if (err) {
                this.warning('Install of dependencies failed!');
                this.log(logMsg);
            } else if (this.clientFramework === 'angular1') {
                this.spawnCommand('gulp', ['install']);
            }
        };
        const installConfig = {
            bower: false,
            npm: this.clientPackageManager !== 'yarn',
            yarn: this.clientPackageManager === 'yarn',
            callback: injectDependenciesAndConstants
        };
        if (this.options['skip-install']) {
            this.log(logMsg);
        } else {
            this.installDependencies(installConfig);
        }
    }

    end() {
        this.log('End of vuejs generator');
    }
};
