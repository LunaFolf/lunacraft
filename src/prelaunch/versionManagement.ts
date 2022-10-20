import { getBuilds, downloadBuildJar } from '@/api/papermc'
import fs from 'fs'

module.exports = {
  requiredDirectories: ['bin'],
  async init () {
    if (globalThis.skipUpdate) return

    // Get MC version from env
    const mcVersion: string | undefined = process.env.MINECRAFT_VERSION

    if (!mcVersion) {
      console.error('MINECRAFT_VERSION not set, can\'t check for builds!'.red)
      return
    }

    // Get the latest build from PaperMC
    const builds = await getBuilds(mcVersion)

    if (!builds) {
      console.error('Error getting builds from PaperMC!'.red)
      return
    }

    const latestBuild = builds[builds.length - 1]

    // Check if bin has the latest build
    const binHasLatestBuild = fs.existsSync(`./bin/${latestBuild.downloads.application.name}.jar`)

    if (!binHasLatestBuild) {
      console.debug(latestBuild)
      console.log('Downloading latest build...'.cyan)

      // Download the latest build
      const download = await downloadBuildJar(mcVersion, latestBuild.build, latestBuild.downloads.application.name)
      console.log(`Downloaded latest build! ${download}`.green)
    }
  }
}
