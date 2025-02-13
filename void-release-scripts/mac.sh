# Do not run this unless you know what you're doing.
# Don't run this when Void is open, or Mac will confuse the two versions (run in terminal or VS Code). 

set -e


# To fix /Volumes/Void errors, DO NOT RUN IN VOID!!!
# To fix permission errors, sudo chmod -r +rwx ~/Desktop/void
# Run in sudo if have errors


# Build, sign and package arm64
./mac-sign.sh build arm64
./mac-sign.sh buildreh arm64
./mac-sign.sh sign arm64
./mac-sign.sh notarize arm64
./mac-sign.sh rawapp arm64
./mac-sign.sh hashrawapp arm64
./mac-sign.sh packagereh arm64

# Build, sign and package x64
./mac-sign.sh build x64
./mac-sign.sh buildreh x64
./mac-sign.sh sign x64
./mac-sign.sh notarize x64
./mac-sign.sh rawapp x64
./mac-sign.sh hashrawapp x64
./mac-sign.sh packagereh x64


# TODO: 1. make sure .zip is signed, 2. recursively codesign app
