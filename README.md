# Projects3D my readme

## Purpose of projects3D

Projects3D intends to demonstrate how to use ThreeJs (www.threejs.org) with Angular 5 through several progressive examples with minimal interface.

## Original README

[original README](./original_README.md)

## Creation of the project

#### Upgrade NodeJs and NPM

Download and install the MacOS .dmg from https://nodejs.org/en/

#### Check version of NodeJs and NPM
```bash
node -v
npm -v
```

#### Update Angular CLI

**Ref :** https://stackoverflow.com/questions/43931986/how-to-upgrade-angular-cli-to-the-latest-version

```bash
npm uninstall -g angular-cli
npm cache clean
npm install -g @angular/cli@latest
```

#### Update NPM

```bash
npm i -g npm
```

#### Set Yarn as global package manager for Angular

```bash
ng set --global packageManager=yarn
```

#### Create the project locally

```bash
cd /Users/franckve/Documents/WebStormProjects2017/
ng --version # check Angular CLI version
ng new projects3d # create project called 'projects3d'
cd projects3d
```

#### Create the GitHub project

**NB :** Just create the project named `projects3d` on GitHub.

```bash
curl -u 'FranckVE' https://api.github.com/user/repos -d '{"name":"projects3d", "private": true, "has_issues": true, "has_projects": true, "has_wiki": true}'
```

#### Setup git locally and Push first commit

```bash
git remote add origin https://github.com/FranckVE/projects3d.git
git commit -m "first commit"
git push -u origin master
```

#### Other Git operations



##### Checking git status

```bash
git status
```

##### Pushing changes

```bash
git add -A
git commit -m "adding threejs lib"
git push -u origin master
```

##### Checking the difference between local git and remote git

```bash
git diff master origin/master
```

**NB :**
- press [SPACE] key to show next line
- [ENTER] to show next page
- [q] to quite diff review

##### Tracking untracked files, adding changes to git

**Reference :** https://stackoverflow.com/questions/572549/difference-between-git-add-a-and-git-add#answer-572660

###### Summary:

- ` git add -A ` stages All
- ` git add . ` stages new and modified, without deleted
- ` git add -u ` stages modified and deleted, without new

###### Detail:

`git add -A` is equivalent to  `git add .; git add -u`.

The important point about `git add .`` is that it looks at the working tree and adds all those paths to the staged changes if they are either changed or are new and not ignored, it does not stage any `rm` actions.

`git add -u` looks at all the already tracked files and stages the changes to those files if they are different or if they have been removed. It does not add any new files, it only stages changes to already tracked files.

`git add -A` is a handy shortcut for doing both of those.

You can test the differences out with something like this (note that for Git version 2.x your output for git add . git status will be different):

```bash
git init
echo Change me > change-me
echo Delete me > delete-me
git add change-me delete-me
git commit -m initial

echo OK >> change-me
rm delete-me
echo Add me > add-me

git status
# Changed but not updated:
#   modified:   change-me
#   deleted:    delete-me
# Untracked files:
#   add-me

git add .
git status

# Changes to be committed:
#   new file:   add-me
#   modified:   change-me
# Changed but not updated:
#   deleted:    delete-me

git reset

git add -u
git status

# Changes to be committed:
#   modified:   change-me
#   deleted:    delete-me
# Untracked files:
#   add-me

git reset

git add -A
git status

# Changes to be committed:
#   new file:   add-me
#   modified:   change-me
#   deleted:    delete-me
```



## Adding ThreeJS

**Reference :** https://stackoverflow.com/questions/40085132/using-three-js-in-angular2
https://www.npmjs.com/package/@avatsaev/three-orbitcontrols-ts

```bash
yarn add three
yarn add https://github.com/FranckVE/three-orbitcontrols-ts.git
```

> _formerly : `yarn add https://github.com/zadgroup/three-orbitcontrols-ts.git`_

And to include the ThreeJs types to Angular 5 (@types/three for the community supported project, https://github.com/FranckVE/types-three.git for the most up-to-date version):
whether :
```bash
yarn add --dev https://github.com/FranckVE/types-three.git
```
or :
```bash
yarn add --dev https://github.com/FranckVE/types-three.git
```

> formerly : `yarn add --dev @types/three`

Then in the code :
```js
import * as THREE from 'three';
import { OrbitControls } from "new-three-orbitcontrols-ts";
```

> _formerly : `import { OrbitControls } from "zadgroup-three-orbitcontrols-ts";`_

## Adding Stats

**Reference :** https://stackoverflow.com/questions/46616041/cannot-use-stats-js-on-angular-cli-1-4-4
https://www.npmjs.com/package/@types/stats.js

```bash
npm install stats-js
npm install @types/stats.js
```
or with Yarn
```bash
yarn add stats-js
yarn add --dev @types/stats.js
```

```js
import * as STATS from 'stats-js';
```

## Git : Removing a file from the index (the 'add list')

```bash
git rm --cached yarn.lock
```

## Yarn : removing a dependency

For example, in order to revert the usage of the `new-three-orbitcontrols-ts` dependency of : `yarn add https://github.com/FranckVE/three-orbitcontrols-ts.git`.
You remove the name present in `package.json` corresponding to the module to remove :

```bash
yarn remove new-three-orbitcontrols-ts
```


## Install Bootstrap 4

```bash
yarn add bootstrap@next
```

We need to add @next to the package name because at the time of writing this post Bootstrap 4 is still in beta. The @next addition makes sure that version 4 of Bootstrap is installed, not version 3.


```bash
yarn add bootstrap@4.0.0-beta.2
```
NB:  this version works better than `add bootstrap@4.0.0-beta.3`


## Install ng-bootstrap

```bash
yarn add @ng-bootstrap/ng-bootstrap
```
