#!/usr/bin/env node
const shell = require('shelljs');
const path = require('path');
// const InputProgram = require('./input')
// const CreateProject = require('./createProject')
// const tempalteGitList = require('./templateGit')
const fetchRemoteTemplate = require('./downloadGitRep');
const args = process.argv.slice(2)
shell.config.sync = true;

(async () => {
    if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
    }
//
    const nowPath = shell.exec('pwd').stdout.replace('\n', '');

// 仓库下载
    await fetchRemoteTemplate('hlerenow/npm-package-template-browser', path.resolve(nowPath, `${args[1]}`))

    const packageJsonPath = path.resolve(nowPath, `${args[1]}/package.json`)
    let packageJson = require(packageJsonPath);

    packageJson.name = 'teset 123123' + Date.now();

    shell.exec(`echo '${JSON.stringify(packageJson, null, 2)}' > ${packageJsonPath}`);

// InputProgram((params) => {
//   console.log(JSON.stringify(params, null, '  '))
//   let a = new CreateProject(params)
// })
})();
