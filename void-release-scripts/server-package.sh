#!/usr/bin/env bash
set -e

ARCH=$2
PLATFORM=$3
VOID_DIR="${HOME}/Desktop/void"
ORIGINAL_SERVER_DIR="${HOME}/Desktop/void-reh-${PLATFORM}-${ARCH}"
SERVER_DIR="${HOME}/Desktop/VoidServer-${PLATFORM}-${ARCH}"

case "$1" in
   build)
       cd "${VOID_DIR}"
       npm run gulp "vscode-reh-${PLATFORM}-${ARCH}-min"
       ;;
   package)
       rm -rf "${SERVER_DIR}"
       mkdir -p "${SERVER_DIR}"
       tar -czf "${SERVER_DIR}/void-server-${PLATFORM}-${ARCH}.tar.gz" -C "$(dirname "$ORIGINAL_SERVER_DIR")" "$(basename "$ORIGINAL_SERVER_DIR")"
       ;;
   *)
       echo "Usage: $0 {build|package} {arm64|x64} {darwin|linux|win32}"
       exit 1
       ;;
esac