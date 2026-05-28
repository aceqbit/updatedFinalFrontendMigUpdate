# Implementation Log — Angular v20 → v21 Migration

Date: 2026-05-28

## npm install output (clean install)

```
npm warn using --force Recommended protections disabled.
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory.
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
added 937 packages, and audited 938 packages in 1m

4 moderate severity vulnerabilities
Run `npm audit` for details.
```

## ng update started

Command started:
```
npx -p @angular/cli@21 ng update @angular/cli@21 @angular/core@21 --force --allow-dirty
```

Prompt encountered and auto-accepted:
```
Need to install the following packages:
@angular/cli@21.2.13
Ok to proceed? (y) y
```

Further migration steps completed. Collected `ng update` output:

```
Repository is not clean. Update changes will be mixed with pre-existing changes.
The installed Angular CLI version is outdated.
Installing a temporary Angular CLI versioned 21.2.13 to perform the update.
Using package manager: npm
Collecting installed dependencies...
Found 22 dependencies.
Fetching dependency metadata from registry...
		Updating package.json with dependency @angular-devkit/build-angular @ "21.2.13" (was "20.3.26")...
		Updating package.json with dependency @angular/cli @ "21.2.13" (was "20.3.26")...
		Updating package.json with dependency @angular/compiler-cli @ "21.2.14" (was "20.3.22")...
		Updating package.json with dependency @angular/animations @ "21.2.14" (was "20.3.22")...
		Updating package.json with dependency @angular/common @ "21.2.14" (was "20.3.22")...
		Updating package.json with dependency @angular/compiler @ "21.2.14" (was "20.3.22")...
		Updating package.json with dependency @angular/core @ "21.2.14" (was "20.3.22")...
		Updating package.json with dependency @angular/forms @ "21.2.14" (was "20.3.22")...
		Updating package.json with dependency @angular/platform-browser @ "21.2.14" (was "20.3.22")...
		Updating package.json with dependency @angular/platform-browser-dynamic @ "21.2.14" (was "20.3.22")...
		Updating package.json with dependency @angular/router @ "21.2.14" (was "20.3.22")...
UPDATE package.json (1061 bytes)
✔ Cleaning node modules directory
✔ Installing packages
** Executing migrations of package '@angular/cli' **

❯ Remove any karma configuration files that only contain the default content.
	The default configuration is automatically available without a specific project file.
	Migration completed (No changes made).

❯ Update 'moduleResolution' to 'bundler' in TypeScript configurations.
	You can read more about this, here: https://www.typescriptlang.org/tsconfig/#moduleResolution
	Migration completed (No changes made).

❯ Updates the 'lib' property in tsconfig files to use 'es2022' or a more modern version.
	Migration completed (No changes made).

** Optional migrations of package '@angular/cli' **

This package has 1 optional migration that can be executed.
Optional migrations may be skipped and executed after the update process, if preferred.

Selected default optional migration and executed it (auto-accepted default):

❯ Migrate application projects to the new build system.
	The output location of the browser build has been updated from "dist/frontend" to "dist/frontend/browser".
UPDATE angular.json (3395 bytes)
UPDATE package.json (1046 bytes)
✔ Packages installed successfully.
	Migration completed (2 files modified).
```

