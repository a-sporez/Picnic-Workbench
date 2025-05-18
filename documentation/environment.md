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

Now you have:

* `tsconfig.json`
* The TypeScript compiler ready to use with `yarn tsc`

---

## Add Your First Code

Create a `src/` folder:

```sh
mkdir src
touch src/index.ts
```

Example `src/index.ts`:

```ts
const msg: string = "Hello from TypeScript and Yarn Berry!";
console.log(msg);
```

---

## Update `package.json` Scripts

Edit your `package.json` and add:

```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "tsc --watch"
}
```

---

## Build and Run

```sh
yarn build
yarn start
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
