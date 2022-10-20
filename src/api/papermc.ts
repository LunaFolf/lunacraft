import { get } from './http'

interface Build {
  build: number,
  time: string,
  channel: string,
  promoted: false,
  changes: object[],
  downloads: {
    application: {
      name: string,
      sha256: string
    },
    'mojang-mappings': {
      name: string,
      sha256: string
    }
  }
}


export async function getBuilds (version: string, build?: string | number): Promise<Build[] | null> {
  if (build) {
    const response = await get(`https://papermc.io/api/v2/projects/paper/versions/${version}/builds/${build}`)
    if (!response) return null

    return [<Build>response]
  }

  const response = await <Promise<{ builds: any[] }>>get(`https://papermc.io/api/v2/projects/paper/versions/${version}/builds`)
  if (!response) return null

  return response.builds
}

/**
 *
 * @param version The version of minecraft
 * @param build The PaperMC build number
 * @param name The name of the file
 */
export async function downloadBuildJar (version: string, build: string | number, name: string = `paper-${version}-${build}.jar`): Promise<any> {
  await get(`https://papermc.io/api/v2/projects/paper/versions/${version}/builds/${build}/downloads/${name}`, `./bin/${name}`)
  return `./bin/${name}`
}
