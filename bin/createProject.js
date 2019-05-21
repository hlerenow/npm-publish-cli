const { execSync } = require('child_process')
const path = require('path')
class CreateProject {
  constructor (props) {
    this.params = props
    if (props.packageType === 'Node') {
      this.packageJson = require('../prj-template/node/package.json')
    } else {
      this.packageJson = require('../prj-template/browser/package.json')
    }

    this.copyProject()
  }

  createNodeProject () {
  }

  createBrowserProject () {
    const { params } = this
    const { testWays } = params
    if (testWays.indexOf('unit') < 0) {
      // 删除命令脚本
      delete this.packageJson.scripts['test:unit']
      delete this.packageJson.scripts['test:unit_watch']
      this.packageJson.scripts.test = 'npm run test:e2e'

      // 删除依赖
      let deps = ['karma-chai', 'karma', 'karma-chrome-launcher', 'karma-coverage-istanbul-reporter', 'karma-html-reporter', 'karma-mocha', 'karma-webpack', 'mocha', 'chain']
      for (let i = 0; i < deps.length; i++) {
        delete this.packageJson.devDependencies[deps[i]]
      }

      // 删除对应文件夹
    }
  }

  copyProject () {
    const { packageJson, params } = this
    const templatePath = path.resolve(__dirname, '../prj-template')
    console.log(templatePath)
    const res = execSync(`mkdir ${params.packageName}`)
    if (res.indexOf('File exists')) {
      console.log('文件夹已存在')
    }
    execSync(``)

    console.log(execSync(`cd ${params.packageName} && cp -r ${templatePath}/browser/ ./`))
  }
}

module.exports = exports = CreateProject
