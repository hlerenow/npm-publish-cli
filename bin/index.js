#!/usr/bin/env node
const shell = require('shelljs');
const path = require('path');
const InputProgram = require('./libs/input')
const CreateProject = require('./libs/createProject')
const templateGitMap = require('./libs/templateGit')
const fetchRemoteTemplate = require('./libs/downloadGitRep');
const args = process.argv.slice(2)
const chalk = require('chalk');
const log = console.log;
const ora = require('ora');

shell.config.sync = true;

(async () => {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }

    const nowPath = shell.exec('pwd').stdout.replace('\n', '');
    const prjDir = path.resolve(nowPath, args[0] || './');
    console.log("prjDir", prjDir)
    const params = await InputProgram();
    log(chalk.green(JSON.stringify(params, null, 2)));

    let gitUrl = '';
    if (templateGitMap[params.packageType]) {
        gitUrl = templateGitMap[params.packageType].git;
    } else {
        log(chalk.red(`sorry, not support this type '${params.packageType}'.`));
        return;
    }

    // 仓库下载
    const spinnerDownload = ora('Downloading repo...').start();
    spinnerDownload.color = 'cyan';
    spinnerDownload.indent = 2;
    try {
        await fetchRemoteTemplate(gitUrl, prjDir)
        spinnerDownload.succeed()
    } catch (e) {
        console.log(e)
        return;
    }
    const packageJsonPath = path.resolve(prjDir, `./package.json`)
    let packageJson = require(packageJsonPath);
    packageJson = new CreateProject(params, packageJson, prjDir)
    console.log(JSON.stringify(packageJson, null, 2))
    shell.exec(`echo '${JSON.stringify(packageJson, null, 2)}' > ${packageJsonPath}`);
})();
