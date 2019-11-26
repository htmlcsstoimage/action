import * as core from '@actions/core';
import fetchvcr from 'fetch-vcr';
import {Base64} from 'js-base64';
import {wait} from './wait'

let fetch = require('node-fetch');

// Do not make a real HTTP in tests
if (process.env.VCR_MODE) {
  fetch = fetchvcr
  fetch.configure({
    mode: 'playback',
    fixturePath: './fixtures'
  })
}

async function run() {
  try {
    const html = core.getInput('html', { required: true });
    const css = core.getInput('css', { required: false });
    const google_fonts = core.getInput('google_fonts', { required: false });

    const hcti_user_id = core.getInput('hcti_user_id', { required: true });
    const hcti_api_key = core.getInput('hcti_api_key', { required: true });

    core.setSecret(hcti_user_id);
    core.setSecret(hcti_api_key);

    const data = { html: html, css: css, google_fonts: google_fonts }

		let headers = {};
		headers['Authorization'] = 'Basic ' + Base64.encode(hcti_user_id + ":" + hcti_api_key);

    const response = await fetch('https://hcti.io/v1/image', { method: 'post', headers: headers, body: JSON.stringify(data)});

    if (response.ok) {
      const response_data = await response.json()

      console.log(response_data.url)
      core.setOutput('image_url', response_data.url);
    } else {
      new Error(response.statusText)
    }
  } catch (error) {
    console.error(error);
    core.setFailed(error.message);
  }
}

run();
