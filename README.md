# action-sample-scanner

GitHub action to scan pnp org hosted sample repos and generate a report.

## Inputs

## `token`

**Required** GitHub Token (${{ secrets.GITHUB_TOKEN }}).

## `dirs`

**Optional** The directories within this repository to scan. Default `"Samples"`.

## Sample Workflow

This is the workflow we use to test the scanner within this repo

```YML
name: 'Test Scanner'
on: [workflow_dispatch]

permissions:
  contents: read

jobs:
  local-scanner-testing:
    runs-on: ubuntu-latest
    steps:
      - name: 'Checkout Repository'
        uses: actions/checkout@v3
      - name: Sample Scanner
        uses: pnp/action-sample-scanner@main
        with:
          dirs: '["testing/samples"]'
          token: ${{ secrets.GITHUB_TOKEN }}
```