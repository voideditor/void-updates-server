# Do not run this unless you know what you're doing.
# Don't run this when Void is open, or Mac will confuse the two versions (run in terminal or VS Code). 

set -e


# Build, sign and package arm64
./mac-sign.sh build arm64
./mac-sign.sh sign arm64
./mac-sign.sh notarize arm64
./mac-sign.sh updater arm64
./mac-sign.sh hash arm64

./mac-sign.sh buildreh arm64
./mac-sign.sh packagereh arm64

# Build, sign and package x64
./mac-sign.sh build x64
./mac-sign.sh sign x64
./mac-sign.sh notarize x64
./mac-sign.sh updater x64
./mac-sign.sh hash x64

./mac-sign.sh buildreh x64
./mac-sign.sh packagereh x64
