const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const projectDir = path.join(__dirname, '..')
const distDir = "dist"
const GROUP_ID = "com.gdn.partners"
const ARTIFACT_ID = process.env.npm_package_name
const VERSION = process.env.npm_package_version

const createHealthFile = () => {
  let output = '{"status":"UP"}'
  fs.writeFileSync(path.join(projectDir, distDir, 'health'), output)
}

const createVersionFile = (version) => {
  let output = 'maven.project.groupId=' + GROUP_ID + '\n' +
    'maven.project.artifactId=' + ARTIFACT_ID + '\n' +
    'maven.project.version=' + version + '\n' +
    'maven.build.time=' + new Date().toISOString().replace('T', ' ').substr(0, 19)
  fs.writeFileSync(path.join(projectDir, distDir, 'version'), output)
}

const archive = (target) => {
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
  archive.file(path.join(projectDir, distDir, 'health'), {
    name: 'health'
  })
  archive.file(path.join(projectDir, distDir, 'version'), {
    name: 'version'
  })
  archive.directory(path.join(projectDir, distDir, 'static'), 'static')
  archive.finalize()
}

module.exports = {
  package: (mode) => {
    const version = 'RELEASE' === mode ? VERSION : VERSION + '-' + mode
    const target = path.join(projectDir, distDir, ARTIFACT_ID + '-' + version + '.zip')
    createHealthFile()
    createVersionFile(version)
    archive(target)
  }
}
