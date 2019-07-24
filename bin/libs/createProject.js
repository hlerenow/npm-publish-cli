class CreateProject {
  constructor(params, packageJson) {
    this.params = params;
    this.packageJson = packageJson;
    if (params.packageType === 'Node') {
      this.createNodeProject()
    } else {
      this.createBrowserProject()
    }

    this.copyProject()
  }

  createNodeProject () {
    // TO DO
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
        delete this.packageJson.devDependencies[deps[i]]
      }

      // 删除对应文件夹
    }
  }

}

module.exports = CreateProject
