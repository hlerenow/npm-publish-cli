const inquirer = require('inquirer')
const semver = require('semver');
const validatePackageName = require("validate-npm-package-name")

const questions = [
  {
    type: 'input',
    name: 'packageName',
    message: 'Package name',
    default: 'demo',
    validate: function (input) {
      var done = this.async();
      let res = validatePackageName(input)
      if (!(res.validForNewPackages && res.validForOldPackages)) {
        done(res.warnings[0]);
        return;
      }
      done(null, true);
    },
  },
  {
    type: 'list',
    name: 'packageType',
    message: 'Package Type（node not support now）',
    choices: [
      'browser',
      'node'
    ],
    default: function () {
      return 'browser'
    }
  },
  {
    type: 'input',
    name: 'version',
    message: 'Version',
    validate: function (input) {
      var done = this.async();
      let res = semver.valid(input)
      if (!res) {
        done(`Please input a correct version, like '1.0.0'`);
        return;
      }
      done(null, true);
    },
    default: function () {
      return '1.0.0'
    }
  },
  {
    type: 'checkbox',
    message: 'Select Test ways',
    name: 'testWays',
    choices: function (params) {
      if (params.packageType === 'browser') {
        return ['unit', 'e2e']
      } else {
        return ['unit']
      }
    },
    default: function () {
      return []
    }
  }

]

module.exports =  function () {
  return inquirer.prompt(questions);
}
