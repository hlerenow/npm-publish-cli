const download = require('download-git-repo');
module.exports = async function fetchRemoteTemplate (name, regPath) {
    await new Promise((resolve, reject) => {
        download(name, regPath, err => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            resolve()
        })
    })
}
