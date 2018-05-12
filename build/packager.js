const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const projectDir = path.join(__dirname, '..')
const distDir = "dist"
const GROUP_ID = "com.gdn.partners"
const ARTIFACT_ID = process.env.npm_package_name
const VERSION = process.env.npm_package_version
module.exports = {
  package: (mode) => {
    const version = 'RELEASE' === mode ? VERSION : VERSION + '-' + mode
    const target = path.join(projectDir, distDir, ARTIFACT_ID + '-' + version + '.zip')
    let output = fs.createWriteStream(target)
    let archive = archiver('zip', {zlib: {level: 9}})
    output.on('close', () => {
    })
    archive.on('error', (err) => {
      throw err
    })
    archive.pipe(output)
    archive.file(path.join(projectDir, distDir, 'index.html'), {
      name: 'index.html'
    })
    archive.directory(path.join(projectDir, distDir, 'static'), 'static')
    archive.finalize()
  }
}
