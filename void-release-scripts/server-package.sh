#!/usr/bin/env bash
set -e

# This file is used to build void server and package it into a tarball for download by Open Remote-SSH extension

# Arguments:
ARCH=$2
PLATFORM=$3

# Required variables (store these values in mac-env.sh and copy them over to run this script):
USER="ADD_YOUR_USER"
HOME="/Users/${USER}"
VOID_DIR="${HOME}/Desktop/void"
ORIGINAL_SERVER_DIR="${HOME}/Desktop/void-reh-${PLATFORM}-${ARCH}"
PACKAGED_SERVER_DIR="${HOME}/Desktop/VoidServer-${PLATFORM}-${ARCH}"

case "$1" in
   build)
        echo "-------------------- Running $1 for void-server-${PLATFORM}-${ARCH} --------------------"
        cd "${VOID_DIR}"
        npm run gulp "vscode-reh-${PLATFORM}-${ARCH}-min"
        echo "-------------------- Done $1 for void-server-${PLATFORM}-${ARCH} --------------------"
        ;;
   package)
        echo "-------------------- Running $1 for void-server-${PLATFORM}-${ARCH} --------------------"
        echo "Cleaning up ${PACKAGED_SERVER_DIR}"
        rm -rf "${PACKAGED_SERVER_DIR}"
        mkdir -p "${PACKAGED_SERVER_DIR}"
        echo "Packaging ${ORIGINAL_SERVER_DIR} into ${PACKAGED_SERVER_DIR}/void-server-${PLATFORM}-${ARCH}.tar.gz"
        tar -czf "${PACKAGED_SERVER_DIR}/void-server-${PLATFORM}-${ARCH}.tar.gz" -C "$(dirname "$ORIGINAL_SERVER_DIR")" "$(basename "$ORIGINAL_SERVER_DIR")"
        echo "-------------------- Done $1 for void-server-${PLATFORM}-${ARCH} --------------------"
        ;;
   *)
        echo "Usage: $0 {build|package} {arm64|x64} {darwin|linux|win32}"
        exit 1
        ;;
esac
