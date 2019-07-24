const fs = require('fs-extra');
const path = require('path');

class CreateProject {
  constructor(params, packageJson, prjDir) {
    this.prjDir = prjDir;
    this.params = params;
    this.packageJson = JSON.parse(JSON.stringify(packageJson));
    if (params.packageType === 'Node') {
      this.createNodeProject()
    } else {
      return this.createBrowserProject()
    }
  }

  createNodeProject () {
    // TO DO
  }

  createBrowserProject () {
    const { params } = this
    const { testWays } = params
    let pkgJson = {};
    if (testWays.indexOf('unit') < 0) {
      pkgJson = this.deleteUnit()
    }

    if (testWays.indexOf('e2e') < 0) {
      pkgJson = this.deleteE2E();
    }

    if (testWays.indexOf('unit') < 0 && testWays.indexOf('e2e') < 0) {
      delete pkgJson.scripts.test
      // 删除所有的测试文件夹
      let delFiles = [
        'testReport',
        'test'
      ]
      delFiles.map((pth) => {
        // 删除对应文件夹
        let filePath = path.resolve(this.prjDir, pth)
        fs.remove(filePath, err => {
          if (err) return console.error(err)
        })
      })

    }


    return pkgJson;
  }

  deleteUnit() {
    // 删除命令脚本
    delete this.packageJson.scripts['test:unit']
    delete this.packageJson.scripts['test:unit_watch']
    this.packageJson.scripts.test = 'npm run test:e2e'

    // 删除依赖
    let deps = [
      'karma-chai',
      'karma',
      'karma-chrome-launcher',
      'karma-coverage-istanbul-reporter',
      'karma-html-reporter',
      'karma-mocha',
      'karma-webpack',
      'mocha',
      'chain'
    ]
    for (let i = 0; i < deps.length; i++) {
      let devDependencies = this.packageJson.devDependencies;
      delete devDependencies[deps[i]]
    }

    let delFiles = [
      'karma.conf.js',
      'testReport/unit',
      'test/unit'
    ]

    delFiles.map((pth) => {
      // 删除对应文件夹
      let filePath = path.resolve(this.prjDir, pth)
      fs.remove(filePath, err => {
        if (err) return console.error(err)
      })
    })

    return this.packageJson
  }

  deleteE2E() {
    // 删除命令脚本
    delete this.packageJson.scripts['test:e2e']
    this.packageJson.scripts.test = 'npm run test:unit'
    // 删除依赖
    let deps = [
      'chromedriver',
      'nightwatch',
      'nightwatch-html-reporter',
    ]
    for (let i = 0; i < deps.length; i++) {
      let devDependencies = this.packageJson.devDependencies;
      delete devDependencies[deps[i]]
    }
    // 删除对应文件夹
    let delFiles = [
      'nightwatch.json',
      'nightwatch-reporter.js',
      'testReport/e2e',
      'test/e2e'
    ]

    delFiles.map((pth) => {
      // 删除对应文件夹
      let filePath = path.resolve(this.prjDir, pth)
      fs.remove(filePath, err => {
        if (err) return console.error(err)
      })
    })
    return this.packageJson
  }

}

module.exports = CreateProject
