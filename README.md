# HTML/CSS to Image Action

Convert HTML/CSS to an image (png, jpg or webp) using GitHub Actions.

## Set your secrets

Sign up for an API key at https://htmlcsstoimage.com. Then set the following secrets in your repository. The values for each are available on your [dashboard](https://htmlcsstoimage.com/dashboard).

- `HCTI_USER_ID`
- `HCTI_API_KEY`

## Add to your workflow

```yml
- name: Create image
  id: create_image
  uses: htmlcsstoimage/action@v1
  with:
    hcti_user_id: ${{ secrets.HCTI_USER_ID }}
    hcti_api_key: ${{ secrets.HCTI_API_KEY }}
    html: "<div id='box'>Hello, world</div>"
    css: ".box { width: 200px; height: 200px; font-family: 'Roboto' }"
    google_fonts: "Roboto"
```

Here's a full example in a workflow.

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
      id: create_image
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
        color: "green"
```

<img src="https://p196.p4.n0.cdn.getcloudapp.com/items/E0uE5Zzb/Image+2019-11-30+at+4.41.38+PM.png?v=eb99d3869208b6dfe7fa10c3fd719bc3" width="500px"></img>

## Output
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

You can then access it via the `outputs` in your next steps to pass it to another Action. `${{ steps.create_image.outputs.url }}`. The `create_image` comes from the `id` set in your step using this Action.
