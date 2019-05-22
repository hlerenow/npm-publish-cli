// const fs = require('fs-extra')
module.exports = async function fetchRemoteTemplate (name, regPath) {
    // const os = require('os')
    // const path = require('path')
    const download = require('download-git-repo')
    // const tmpdir = path.join(os.tmpdir(), 'npm-publish-cli')

    // clone will fail if tmpdir already exists
    // https://github.com/flipxfx/download-git-repo/issues/41

    await new Promise((resolve, reject) => {
        download(name, regPath, err => {
            if (err) return reject(err)
            resolve()
        })
    })
}
