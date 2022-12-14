# 🗑️🎬 Delete Merged Action

GitHub Action to automatically delete merged branches, with a highly configurable `branches` option.

[![Build CI](https://github.com/koj-co/delete-merged-action/workflows/Build%20CI/badge.svg)](https://github.com/koj-co/delete-merged-action/actions?query=workflow%3A%22Build+CI%22)
[![Test CI](https://github.com/koj-co/delete-merged-action/workflows/Test%20CI/badge.svg)](https://github.com/koj-co/delete-merged-action/actions?query=workflow%3A%22Test+CI%22)
[![Release CI](https://github.com/koj-co/delete-merged-action/workflows/Release%20CI/badge.svg)](https://github.com/koj-co/delete-merged-action/actions?query=workflow%3A%22Release+CI%22)
[![Node CI](https://github.com/koj-co/delete-merged-action/workflows/Node%20CI/badge.svg)](https://github.com/koj-co/delete-merged-action/actions?query=workflow%3A%22Node+CI%22)

## ⚙️ Usage

You might not need this action, because GitHub natively supports deleting merged branches. However, you can configure exactly which branches to delete using this action. It also works well for GitHub Free accounts that don't support protected branches.

### Inputs

#### `branches`

Glob rules for names of branches to delete, defaults to `!master, !main, *`

### Environment variables

#### `GITHUB_TOKEN` (required)

GitHub token to delete branches: `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}`

### Example

```yaml
name: Merge PRs
on:
  pull_request:
    types:
      - opened
      - closed
      - edited
      - reopened
jobs:
  automerge:
    runs-on: ubuntu-latest
    steps:
      - name: Delete merged branch
        uses: koj-co/delete-merged-action@master
        with:
          branches: "!master, !production, *"
        env:
          GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}"
```

## 📄 License

- Code: [MIT](./LICENSE) © [Koj](https://koj.co)
- "GitHub" is a trademark of GitHub, Inc.

<p align="center">
  <a href="https://koj.co">
    <img width="44" alt="Koj" src="https://kojcdn.com/v1598284251/website-v2/koj-github-footer_m089ze.svg">
  </a>
</p>
<p align="center">
  <sub>An open source project by <a href="https://koj.co">Koj</a>. <br> <a href="https://koj.co">Furnish your home in style, for as low as CHF175/month →</a></sub>
</p>
