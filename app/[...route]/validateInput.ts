/* eslint-disable prefer-const */

const INSIDER = 'insider'
const STABLE = 'stable'
const QUALITIES = new Set([INSIDER, STABLE])

const DARWIN = 'darwin'
const WINDOWS = 'win32'
const LINUX = 'linux'
const OS = new Set([DARWIN, LINUX, WINDOWS])

const ARM64 = 'arm64'
const IA32 = 'ia32'
const X64 = 'x64'
const ARCH = new Set([ARM64, IA32, X64])

const SYSTEM = 'system'
const ARCHIVE = 'archive'
const MSI = 'msi'
const USER = 'user'
const TYPES = new Set([ARCHIVE, MSI, USER, SYSTEM])


// from vscodium (not currently being used)
export function validateInput(platform: string, quality: string) {
    // a bunch of validation rules for the different permutations
    if (!QUALITIES.has(quality)) return false

    let [os, arch, type] = platform.split('-')
    if (!OS.has(os)) return false

    if (os === WINDOWS) {
        if (!type) {
            if (!arch) {
                type = SYSTEM
                arch = IA32
            } else if (TYPES.has(arch)) {
                type = arch
                arch = IA32
            } else {
                type = SYSTEM
            }
        }

        if (!TYPES.has(type)) return false
    } else if (os === DARWIN) {
        if (!arch) arch = X64
    }

    if (!ARCH.has(arch)) return false

    return { quality, os, arch, type }
}