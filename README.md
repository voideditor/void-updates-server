


This is Void's update server. It's an endpoint that Void calls to check for updates.



## Relevant files

Whenever we release Void, we run `./mac.sh`. This generates a folder called VoidSign-arm64 with these contents:
- `Void.app` (inside a `.zip` file)
- `hash.json`
- `Void.dmg`

`Void.app` is the raw file that actually runs Void. This is what's supposed to get downloaded when an update is ready, and then hot-swapped in to update Void.


`hash.json` is used during updates to verify verify `Void.app` was not corrupted. It's of type `{ sha256hash, hash: sha1, timestamp: UNIX }`. 

`Void.dmg` is the installer for Void. It's just a wrapper that tells people to drag `Void.app` into their Applications folder. It's unrelated to updating Void.



## Updating flow

Here's how updating is intended to work. Reference [`abstractUpdateService.ts`](https://github.com/voideditor/void/blob/c1123f2cfd570e744e0e867f5f53d0c108c32c97/src/vs/platform/update/electron-main/abstractUpdateService.ts#L18) for Void Desktop implementation.

First, Void pings the update server (this repo) which lives on `https://updates.voideditor.dev/<product>/stable/<commit>`. (product is something like darwin-arm64, and commit is the commit hash, e.g. abcdefg123).

Here's what happens next:

```plaintext
Void on Desktop                                update server 
       			 -----check for update------>
												- compare latest commit hash with user's, and if not equal the the user should update so respond with a JSON (else return with status 204)
JSON  			 <---------respond----------
```

the returned JSON is of type: 
```ts
{
	
	"url": "https://github.com/voideditor/void/releases/v1.0.0/Void-RawApp-darwin-arm64.zip",  // where to go to get the `Void.app` `.zip` file
	
	// ------- this is all from the latest hash.json to validate the above url -------
	"sha256hash": "7bfd6874c1608149d9cecaab51e5cd5fca715ca0f7c3d34918017f0cbdadd81b", // sha256 hash
	"hash": "033bd94b1168d7e4f0d644c3c95e35bf1ce6bfab", // sha1 hash
	"timestamp": 1241241411738132963, // unix timestamp  (not really important)
	"version": "abcdefg123", 
	// -------------------------------------------------------------------------------

	// this doesn't really matter
	"productVersion": "1.9.4",

}
```


Right now, running everything described above, we get an error like "signature could not be verified" once `Void.app.zip` is downloaded. It's not clear if this is a hash signature issue, a mac codesigning issue, or something else.


## Todos

- We might want to turn Void into a monorepo so we can share version number and commit across the update server, website, and desktop app.


## New release of Void

To do a new Void release (should only be done by maintainers):

1. Run ./mac.sh on Mac, ./windows.sh on windows, and _ on linux (still being added).
2. Upload all files to the GitHub release (for now, typically we don't change the tag).
3. Update commit number and version number on the `void-updates-server` after all releases have been uploaded, to start informing users of an update.
4. If we changed the GitHub release tag, make sure to change the download URLs on `void-website` too.
5. Update the changelog on `void-website`.


## GitHub release version number

- For now, we're just sticking with a GitHub release the major version number so we don't have to make a lot of changes every time we update. For example, GitHub releases will be on v1.0.0 even if we're on 1.0.1, 1.1.0, etc. 
- We're not moving the v1.0.0 tag to the newer commit during releases, because we want the next tag to auto-populate all the changes since the last tag.
