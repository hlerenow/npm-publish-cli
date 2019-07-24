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

shell.config.sync = true;

(async () => {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }

    const nowPath = shell.exec('pwd').stdout.replace('\n', '');
    const prjDir = path.resolve(nowPath, `${args[1]}`);
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
    log(chalk.yellow(gitUrl, prjDir));
    try {
        await fetchRemoteTemplate(gitUrl, prjDir)
    } catch (e) {
        console.log(e)
        return;
    }
    const packageJsonPath = path.resolve(nowPath, `${args[1]}/package.json`)
    let packageJson = require(packageJsonPath);
    console.log(JSON.stringify(packageJson, null, 2))
    packageJson = new CreateProject(params, packageJson)

    shell.exec(`echo '${JSON.stringify(packageJson, null, 2)}' > ${packageJsonPath}`);
})();
