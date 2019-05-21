const inquirer = require('inquirer')

const questions = [
  {
    type: 'input',
    name: 'packageName',
    message: 'Package name',
    default: 'demo'
  },
  {
    type: 'list',
    name: 'packageType',
    message: 'Package Type',
    choices: [
      'Browser',
      'Node'
    ],
    default: function () {
      return '1.0.0'
    }
  },
  {
    type: 'input',
    name: 'version',
    message: 'Version',
    default: function () {
      return '1.0.0'
    }
  },
  {
    type: 'checkbox',
    message: 'Select Test ways',
    name: 'testWays',
    choices: function (params) {
      if (params.packageType === 'Browser') {
        return ['unit', 'e2e']
      } else {
        return ['unit']
      }
    }
  }

]

module.exports = exports = function (cb) {
  inquirer.prompt(questions).then(answers => {
    cb(answers)
  })
}
