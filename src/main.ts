import * as core from '@actions/core';
import {wait} from './wait'

async function run() {
  try {
    const html = core.getInput('html', { required: true });
    const css = core.getInput('css', { required: false });
    const google_fonts = core.getInput('google_fonts', { required: false });

    const hcti_user_id = core.getInput('hcti_user_id', { required: true });
    const hcti_api_key = core.getInput('hcti_api_key', { required: true });

    core.setSecret(hcti_user_id);
    core.setSecret(hcti_api_key);

    console.log(`${html} ${css} ${google_fonts}`)

    core.setOutput('image_url', 'hi mike');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
