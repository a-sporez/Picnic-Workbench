# Bootstrapping a Yarn Berry + TypeScript Project From Scratch

This guide assumes:

* You're using **PowerShell**, **bash**, **Linux**, **macOS**, or **WSL**

---

## Create Github Repository

Select node.js for the .gitignore template and a license. (MIT is most unrestrictive)
Initialize repository with readme and connect your local workspace to your favorite IDE (editor configs enforces consistent format between collaborators but is not essential).

---

## Install Node.js and Enable Corepack

```sh
corepack enable
corepack prepare yarn@stable --activate
```

### If Corepack Not Found

```sh
npm install -g corepack
corepack enable
corepack prepare yarn@stable --activate
```

✅ Confirm:

```sh
yarn -v   # Should show 3.x
```

---

## Initialize Your Project

```sh
yarn init -2
```

This creates:

* `package.json`
* `.yarnrc.yml`
* `.yarn/releases/yarn-*.cjs`

Then run:

```sh
yarn install
```

---

## Add TypeScript

```sh
yarn add --dev typescript
yarn tsc --init
```

## Import Type Nodes

```sh
npm install --save-dev @types/node
```

## Varify and correct package.json

It needs to include these paramaters:

```json
{
  "name": "TypeScript-Workbench",
  "packageManager": "yarn@4.9.1",
  "devDependencies": {
    "@types/node": "^22.15.19",
    "typescript": "^5.8.3"
  },
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsc --watch"
  }
}
```

---

## Build and Run

```sh
yarn build
yarn start
```

**If the console output returns this error you are up to speed in development:**

```sh
[root-index] bootstrapping module host...
(node:1453) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///mnt/Black-Branch-Collective/TypeScript-Workbench/dist/index.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to /mnt/c/Coding-Workbench/Black-Branch-Collective/TypeScript-Workbench/package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
[root-index] failed to start module host: Error: ENOENT: no such file or directory, scandir '/mnt/c/Coding-Workbench/Black-Branch-Collective/TypeScript-Workbench/src/plugins/chat'
    at Object.readdirSync (node:fs:1584:26)
    at loadFromFolder (file:///mnt/Black-Branch-Collective/TypeScript-Workbench/dist/src/module_host/pluginManager.js:13:26)
    at load_plugins (file:///mnt/Black-Branch-Collective/TypeScript-Workbench/dist/src/module_host/pluginManager.js:35:11)
    at Module.main (file:///mnt/Black-Branch-Collective/TypeScript-Workbench/dist/src/module_host/main.js:4:11)
    at bootstrap (file:///mnt/Black-Branch-Collective/TypeScript-Workbench/dist/index.js:13:37) {
  errno: -2,
  code: 'ENOENT',
  syscall: 'scandir',
  path: '/mnt/Black-Branch-Collective/TypeScript-Workbench/src/plugins/chat'
}
```

---

## Add `.gitignore`

Create a `.gitignore` file:

```gitignore
# Yarn Berry
.yarn/*
!.yarn/releases
!.yarn/plugins
!.yarn/sdks
!.yarn/patches
.pnp.*
.yarnrc.yml

# Node
node_modules/
yarn.lock

# TypeScript
dist/
build/
*.tsbuildinfo

# Editor
.vscode/
*.log
.DS_Store
```

---

## Commit Your Setup

```sh
git add .
git commit -m "Initial Yarn Berry + TypeScript setup"
git push
```

---
