# HTML/CSS to Image Action

Convert HTML/CSS to an image (png, jpg or webp) using GitHub Actions.

## Set your secrets

Sign up for an API key at https://htmlcsstoimage.com. Then set the following secrets in your repository. The values for each are available on your [dashboard](https://htmlcsstoimage.com/dashboard).

- `HCTI_USER_ID`
- `HCTI_API_KEY`

## Add to your workflow

Install the dependencies  
```yml
on:
  push

name: Generate image

jobs:
  image:
    name: Cowsays
    runs-on: ubuntu-latest
    steps:
    - name Create image
      uses: htmlcsstoimage/action@v1
      with:
       hcti_user_id: ${{ secrets.HCTI_USER_ID }}
       hcti_api_key: ${{ secrets.HCTI_API_KEY }}
       html: "<div id='box'>Hello, world</div>"
       css: ".box { width: 200px; height: 200px; font-family: 'Roboto' }"
       google_fonts: "Roboto"
    - name: Print url
      uses: mscoutermarsh/cowsays-action@master
      with:
        text: ${{ steps.create_image.outputs.url }} 
```

**Output:**
The API will return a URL with your created image.

```
  with:
    hcti_user_id: ***
    hcti_api_key: ***
    html: <div class="box">Hello, world</div>
    css: .box { width: 400px }
{
  url: 'https://hcti.io/v1/image/8bfe53b8-fcd3-4cd9-9aa5-2fe67046d59c'
}
```

You can then access it via the `outputs` in your next steps to pass it to another Action. `${{ steps.create_image.outputs.url }}`

## Change action.yml

The action.yml contains defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
import * as core from '@actions/core';
...

async function run() {
  try { 
      ...
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Publish to a distribution branch

Actions are run from GitHub repos.  We will create a releases branch and only checkin production modules (core in this case). 

Comment out node_modules in .gitignore and create a releases/v1 branch
```bash
# comment out in distribution branches
# node_modules/
```

```bash
$ git checkout -b releases/v1
$ git commit -a -m "prod dependencies"
```

```bash
$ npm prune --production
$ git add node_modules
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing the releases/v1 branch

```yaml
uses: actions/typescript-action@releases/v1
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and tested action

```yaml
uses: actions/typescript-action@v1
with:
  milliseconds: 1000
```
