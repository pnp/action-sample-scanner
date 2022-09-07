# action-sample-scanner
GitHub action to scan pnp org hosted sample repos and generate reports

# Hello world javascript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

## `scan-dirs`

**Optional** The name of the person to greet. Default `"Samples"`.

## Outputs

## `time`

The time we greeted you.

## Example usage

uses: actions/hello-world-javascript-action@v1.1
with:
  who-to-greet: 'Mona the Octocat'