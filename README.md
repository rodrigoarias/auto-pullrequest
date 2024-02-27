# pr-to-file-javascript-action

This action tries to create a Pull Request from a changed branch (which should trigger the action to another branch).
Example:
In a project where *main* is the default branch and should have all the changes made in "hotfix/*" branches, this could be done:
 ```
on:
  push:
    branches:
      - 'hotfix/*'
jobs:
  create_pull_request:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Alert main of changes in hotfix
        0uses: rodrigoarias/auto-pullrequest@v1.0.0
        with:
          git-token: ${{ secrets.PUSH_TOKEN }}
          base-branch: main
          title: My pull request
          body: "**Automated pull request**"
```
Note that the hotfix/* is not being defined. That's the idea of this action.

## Inputs

## `git-token`

**Required** A GITHUB_SECRET with enough permissions to create a Pull Request.

## `base-branch`

**Required** The Pull Request target

## `title`

The PR title. Default: `"Auto created Pull Request"`.

## `body`

The PR body. Default: `"This PR was created by a Github Action"`.

## Outputs
This action has no outputs.

## Example usage

```
on:
  push:
    branches:
      - 'hotfix/*'
jobs:
  create_pull_request:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Alert main of changes in hotfix
        uses: rodrigoarias/auto-pullrequest@v1.0.0
        with:
          git-token: ${{ secrets.PUSH_TOKEN }}
          base-branch: main
          title: My pull request
          body: "**Automated pull request**"
```
