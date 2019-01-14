const chalk = require('chalk');
const packagejs = require('../../package.json');
const BaseGenerator = require('generator-jhipster-x/generators/generator-base');
const jhipsterConstants = require('generator-jhipster-x/generators/generator-constants');
const ejs = require('ejs')
const jhipsterUtils = require('generator-jhipster-x/generators/utils');
const pluralize = require('pluralize')

module.exports = class extends BaseGenerator {
    get initializing() {
        return {
            readConfig() {
                this.entityConfig = this.options.entityConfig;
                this.jhipsterAppConfig = this.getJhipsterAppConfig();
                if (!this.jhipsterAppConfig) {
                    this.error('Can\'t read .yo-rc.json');
                }
            },
            displayLogo() {
                this.log(chalk.white(`Running ${chalk.bold('JHipster rain')} Generator! ${chalk.yellow(`v${packagejs.version}\n`)}`));
            },
            validate() {
                // this shouldn't be run directly
                if (!this.entityConfig) {
                    this.env.error(`${chalk.red.bold('ERROR!')} This sub generator should be used only from JHipster and cannot be run directly...\n`);
                }
            }
        };
    }

    prompting() {
        // don't prompt if data are imported from a file
        if (this.entityConfig.useConfigurationFile === true && this.entityConfig.data && typeof this.entityConfig.data.yourOptionKey !== 'undefined') {
            this.yourOptionKey = this.entityConfig.data.yourOptionKey;
            return;
        }
        let ver = this._globalConfig.name.split(':')[1];
        const done = this.async();
        const prompts = [
            {
                type: 'confirm',
                name: 'runGen',
                message: 'Do you want to run Vue generator version ' + ver,
                default: true
            },
            {
                type: 'confirm',
                name: 'genMenu',
                message: 'Do you want to generate the menu?',
                default: false
            },
        ];

        this.prompt(prompts).then((props) => {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        });
    }
    _firstToUpper(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    _toLower(str) {
        return str.toLowerCase();
    }
    _spliceString(start, delCount, newSubStr, str) {
        return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
    }
    get writing() {
        return {
            updateFiles() {
                // read config from .yo-rc.json
                this.baseName = this.jhipsterAppConfig.baseName;
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
                const webappDir = jhipsterConstants.CLIENT_MAIN_SRC_DIR;

                const entityName = this.entityConfig.entityClass;
                console.log(this)
                // show all variables
                this.log('\n--- some const ---');
                this.log(`javaDir=${javaDir}`);
                this.log(`resourceDir=${resourceDir}`);
                this.log(`webappDir=${webappDir}`);

                this.log('\n--- entityName ---');
                this.log(`\nentityName=${entityName}`);

                this.log('------\n');
                // do your stuff here
            },

            async writeFiles() {
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
            const Promise = require('bluebird');
            const fs = Promise.promisifyAll(require('fs'));
            const mkdirp = require('mkdirp-promise')
            let name = this.entityConfig.name;
            let jsonPath = this.entityConfig.rootDir+'/'+this.entityConfig.filename;
            //await mkdirp(this.destinationPath('src/views/entities/'+name));
            let data = await fs.readFileAsync(jsonPath);
            let obj = JSON.parse(data);
            obj.entityName = this.entityConfig.name;
            obj.pluralize = pluralize;
            obj.firstToUpper = this._firstToUpper;
            obj.name = name;
            this.baseNameApp = obj.baseNameApp = this.baseName + 'App';
            let destPath = this.entityConfig.rootDir+'/'+jhipsterConstants.CLIENT_MAIN_SRC_DIR+'/src';
            this.log(obj)
            this.fs.copyTpl(
                this.templatePath('./Entity.ejs'),
                this.destinationPath(destPath+'/views/entities/'+name+'/'+this._firstToUpper(name)+'.vue'),
                obj
            )
            this.fs.copyTpl(
                this.templatePath('./CreateEntity.ejs'),
                this.destinationPath(destPath+'/views/entities/'+name+'/Create'+this._firstToUpper(name)+'.vue'),
                obj
            )
            this.fs.copyTpl(
                this.templatePath('./CreatePrefilled.ejs'),
                this.destinationPath(destPath+'/views/entities/'+name+'/CreatePrefilled'+this._firstToUpper(name)+'.vue'),
                obj
            )
            this.fs.copyTpl(
                this.templatePath('./UpdateEntity.ejs'),
                this.destinationPath(destPath+'/views/entities/'+name+'/Update'+this._firstToUpper(name)+'.vue'),
                obj
            )
            this.fs.copyTpl(
                this.templatePath('./ViewEntity.ejs'),
                this.destinationPath(destPath+'/views/entities/'+name+'/View'+this._firstToUpper(name)+'.vue'),
                obj
            )
            this.fs.copyTpl(
                this.templatePath('./storeEntity.ejs'),
                this.destinationPath(destPath+'/store/'+this._toLower(name)+'.js'),
                obj
            )
            this.fs.copyTpl(
                this.templatePath('./fetcherEntity.ejs'),
                this.destinationPath(destPath+'/fetchers/'+this._toLower(name)+'.js'),
                obj
            )
            this.fs.copyTpl(
                this.templatePath('./routes.ejs'),
                this.destinationPath(destPath+'/views/entities/'+name+'/routes.js'),
                obj
            )
            this.fs.copyTpl(
                this.templatePath('./Search.ejs'),
                this.destinationPath(destPath+'/views/entities/' + name + '/Search.vue'),
                obj
            )
            this.fs.copyTpl(
                this.templatePath('./EntityTableBody.ejs'),
                this.destinationPath(destPath+'/views/entities/' + name + '/EntityTableBody.vue'),
                obj
            )
            this.fs.copyTpl(
                this.templatePath('./DeleteDialog.ejs'),
                this.destinationPath(destPath+'/views/entities/' + name + '/DeleteDialog.vue'),
                obj
            )
            this.fs.copyTpl(
                this.templatePath('./EntityTableHead.ejs'),
                this.destinationPath(destPath+'/views/entities/' + name + '/EntityTableHead.vue'),
                obj
            )
            this.fs.copyTpl(
                this.templatePath('./entityIndex.js'),
                this.destinationPath(destPath+'/views/entities/index.js'),
                {}
            )
            if(this.props.genMenu == true || obj.generateMenuItem) {
                let baseNameApp = this.baseName + 'App';
                let template = ejs.renderFile(this.templatePath('./MenuLeft.ejs'), {name, baseNameApp}, (err, str) => {
                    jhipsterUtils.rewriteFile(
                        {
                            path: '/',
                            file: this.destinationPath(destPath + '/views/MenuLeft.vue'),
                            needle: 'insertlinkshere',
                            splicable: [
                                str
                            ]
                        },
                        this
                    );
                });
                let template2 = ejs.renderFile(this.templatePath('./MenuUp.ejs'), {name, baseNameApp}, (err, str) => {
                    jhipsterUtils.rewriteFile(
                        {
                            path: '/',
                            file: this.destinationPath(destPath + '/views/MenuUp.vue'),
                            needle: 'insertlinkshere',
                            splicable: [
                                str
                            ]
                        },
                        this
                    );
                });
            }
/*            try {
                let temp = await fs.readFileAsync(this.destinationPath(destPath + '/views/MenuLeft.vue'), "utf8");
                let template = ejs.renderFile(this.templatePath('./MenuLeft.ejs'), {name}, (err, str) => {
                    this.log(this._spliceString(temp.indexOf("<!--insertlinkshere-->"), 0, str, temp));
                    this.fs.write(this.destinationPath(destPath + '/views/MenuLeft.vue'),this._spliceString(temp.indexOf("<!--insertlinkshere-->"), 0, str, temp))
                });

                let temp2 = await fs.readFileAsync(this.destinationPath(destPath + '/views/MenuUp.vue'), "utf8");
                let template2 = ejs.renderFile(this.templatePath('./MenuUp.ejs'), {name}, (err, str) => {
                    this.fs.write(this.destinationPath(destPath + '/views/MenuUp.vue'),this._spliceString(temp2.indexOf("<!--insertlinkshere-->"), 0, str, temp2))
                });

            }
            catch(err) {
                this.log(err)
            }*/
            
            /*this.template('dummy.txt', 'dummy.txt', this, {});*/

            },
            


            updateConfig() {
                this.updateEntityConfig(this.entityConfig.filename, 'yourOptionKey', this.yourOptionKey);
            }
        };
    }

    end() {
        if (this.yourOptionKey) {
            this.log(`\n${chalk.bold.green('rain enabled')}`);
        }
    }
};