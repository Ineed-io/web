# Ineed.io 🚀

Welcome to the website for `Ineed.io`! Below are all the things that you will need to know in order to contribute to this project!

## Setup 💻

#### Follow these steps in order to ensure everything gets set up correctly:

1. Fork the repo
   ![Fork](https://i.imgur.com/jB7NW0x.png)
2. Clone the forked repo: `$ git clone <SSH/HTTPS Link of forked repo>`
3. Navigate to the cloned repo: `$ cd <name of folder>`
4. Install yarn: `$ npm i -g yarn`
5. Start the server: `$ yarn dev`

## Contributing 📜

### Please follow very carefully to correctly contribute to this project! Follow these steps in order whenever you are working:

### 1. Pulling current changes:

The first step is to pull all changes made to this repo, that way we don't have conflicting code whenever we develop. Follow these exact steps!

1. The following is a **ONE TIME** command only:

- If working with SSH: `$ git remote add upstream git@github.com:Ineed-io/web.git`
- If working with HTTPS: `$ git remote add upstream https://github.com/Ineed-io/web.git`

2. Fetch all local changes **(Do this every time before you start coding)**:

- `$ git fetch upstream`

3. Overwrite your changes with the current changes **(Also do this before you start coding)**:

- `$ git rebase upstream/main`

### 2. Adding features & Making Pull Requests

This section will cover how to actually submit changes that you made (i.e new features, bug fixes, etc). **Follow along closely!**

1. **Before you start coding**:

- You need to work on your code in a separate branch, each branch represents a feature that you made! **The "main" branch represents the very current branch with the latest code, never push or make changes to this branch!**
- Run the following **before you start coding:** `$ git checkout -b <feature you are going to add>`
- I.e, `$ git checkout -b addingLoginForm`

2. Run `$ yarn install` to install all the latest packages

3. Now, go ahead and code whatever you want, usually you will need to look at Trello to see what needs to be done, and what has already been done!
4. Once finished, run the following commands in order:

- Add changes: `$ git add .`
- Commit changes with a message: `$ git commit -m "feat/chore/fix: some change"`
- Push changes **with the branch name specified**: `$ git push origin <branch name>`. I.e, `$ git push origin addingLoginForm`
  ![Pushed](https://i.imgur.com/ZWcToJm.png)

4. Create a pull request:

- Navigate to GitHub, and create a pull request
- Describe all the changes you made, be in depth
  ![Describe](https://i.imgur.com/yZ1efbY.png)
- Submit the pull request
  ![Submit](https://i.imgur.com/qzdNmkK.png)

### 3. Updating changes to a branch

If you ever decide to make a new feature, **make sure to do it to a new branch!** **_Never have a feature that you worked on later in the same branch, just make a new branch and work there!_**

- To navigate to a new branch, just do `$ git checkout -b newBranchName`, and start working!
- Just remember when you push changes, push it to this branch, i.e `$ git push origin newBranchName`

### 4. Getting latest changes

Make sure the **main** branch always has the current changes. To easily do this, just run the following **(do this after ANY pull requests have been pushed to the main branch!**

- `$ git checkout main` to switch to the main branch
- `$ git fetch upstream`
- `$ git rebase upstream/main`, and you're done!

### **_Important: you should never be working in the main branch, this will cause conflicts!_**

- Run `git branch` too see what current branch you're in **(starred branch is the one you are currently in!)**

That is it for contributing! Again, you need to **pull changes, create a new branch with the branch name being what feature you are going to work on, code whatever you need to, push changes to GitHub, then create a pull request!**
