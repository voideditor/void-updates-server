



// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#caching
export const dynamic = 'force-static' // static 
export const revalidate = 86400 // 24 hrs (must not be 60*60*24 or not statically analyzable)

export const dynamicParams = true // false -> any new [version] will be treated as a 404
// export const fetchCache = 'auto'  // dont want to touch for now
export const runtime = 'nodejs'
export const preferredRegion = 'auto'




// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// const QUALITIES = new Set(['insider', 'stable'])
// const OS = new Set(['darwin', 'win32', 'linux'])
// const TYPES = new Set(['system', 'archive', 'msi', 'user'])
// const ARCH = new Set(['arm64', 'ia32', 'x64'])


// TODO we should fetch this...
// https://github.com/VSCodium/update-api/blob/master/api/update/index.js
// https://github.com/VSCodium/versions/blob/master/stable/win32/arm64/user/latest.json
// https://github.com/VSCodium/versions/blob/master/stable/darwin/arm64/latest.json


// keep a history here:
// const latestCommit = '1b4943f39e76924600633712f14678964c6b8358'
// const latestVersionTag = 'v1.0.0'

// const latestCommit = 'a6b4955f8d834a6de97db5315dcd70551fb03c7c'
// const latestVersionTag = 'v1.0.1'

// const latestCommit = 'a3f145328bc505f44034872c6f9aca54c31a9470'
// const latestVersionTag = 'v1.0.2' // was also called 1.0.2
// requires a URL in the message string; all we give them is the message

// const latestCommit = '47998e4ee5b6dcd8a6df9ec68dd56518c9903a7d' // accidentally '6ecf7be826778a3d34bdf0aa2ad3d1d2cac7b65e' on windows for a second
const latestVersionTagForMessage = 'v1.0.2'
// has hard-coded link to https://voideditor.com/download-beta for updating
// has reh download at https://github.com/voideditor/void-updates-server/releases/download/test/void-server-{os}-{arch}.tar.gz

console.log('booting')



// https://nextjs.org/docs/app/building-your-application/routing/route-handlers#convention
export async function GET(request: Request, { params }: { params: Promise<{ route: string[] }> }) {
    try {

        console.log('trying...', request.url)

        const { route } = await params

        const err = (msg: string) => { return new Error(msg + JSON.stringify(route)) }

        if (route.length !== 3) throw err('!=3')

        const [_api, _v0, commit] = route
        if (_api !== 'api') throw err('api')
        if (_v0 !== 'v0') throw err('v0')

        if (commit !== '47998e4ee5b6dcd8a6df9ec68dd56518c9903a7d' && commit !== '6ecf7be826778a3d34bdf0aa2ad3d1d2cac7b65e' && commit !== '6fd514230ce5e392dac90420f001718dcf985d2b')
            return Response.json({ hasUpdate: true, downloadMessage: `A new Void update is available. [Void ${latestVersionTagForMessage}](https://voideditor.com/download-beta). Please reinstall! It only takes a second.` })

        return Response.json({ hasUpdate: false })


        // if (route.length !== 5) throw err('!=5')
        // const [_api, _update, platform, quality, commit] = route

        // if (_api !== 'api') throw err('api')
        // if (_update !== 'update') throw err('update')

        // if (!platform) throw err('platform')
        // if (!quality) throw err('quality')

        // if (!commit || (commit === latestCommit)) {
        //     console.log('no commit to update, or latest', commit)
        //     return new Response(null, { status: 204 })
        // }
        // const input = validateInput(platform, quality)
        // if (!input) {
        //     return new Response(null, { status: 204 })
        // }


        // const res = {
        //     url: `https://github.com/voideditor/void/releases/download/${latestVersionTag}/Void-RawApp-${input.os}-${input.arch}.zip`,
        //     version: latestCommit,
        //     productVersion: '1.9.5',
        //     // name: '1.96.4.25017',
        //     "sha256hash": "5421b504ccdec0b0d4f2add0d20951e8a952fe1716bdeee0a5ae838bf61d702f",
        //     "hash": "9c083fc0378fca279a56c64e0b96d7b7f0b71256",
        //     "timestamp": 1737354783
        //         }
        // console.log('res!!!!', res)
        // return Response.json(res)

    } catch (e) {
        console.error('ERROR:', e)
        return new Response(null, { status: 500 })
    }
}

