import fs from 'fs'

/**
 *
 * @param url The url to get
 * @param download Whether or not to download the file (returns the `response.body`)
 * @returns Object, or null if error (or if download is true, the response body)
 */
async function get (url: string, downloadLocation?: string): Promise< Response | { [index: string]: any } | null | undefined> {
  const response = await fetch(url)
    .catch((err: any) => {
      console.error(`Error fetching ${url}: ${err.message}`.red)
      return null
    })

  if (!response) return null

  if (response.ok === false) {
    const data = await response.json()
    console.error(`Error fetching ${url}: ${data.error}`.red)

    if (data.error) console.error(data.error)
    return data || null
  }

  if (downloadLocation && response.body) {
    console.log(`Downloading ${url} to ${downloadLocation}`.cyan)
    const reader = response.body.getReader()
    const stream = fs.createWriteStream(downloadLocation)

    await new Promise<void>((resolve, reject) => {
      reader.read()
        .then(function process({ done, value }): any {
          if (done) {
            stream.close(() => { resolve() })
          } else {
            stream.write(value)
            return reader.read().then(process)
          }
        })
    })

    return null

  }

  return await response.json()
}

async function post (url: string, body: any): Promise<{ [index: string]: any } | null> {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .catch((err: any) => {
      console.error(`Error posting ${url}: ${err.message}`.red)
      return null
    })

  if (!response) return null

  return await response.json()
}

export { get, post }
