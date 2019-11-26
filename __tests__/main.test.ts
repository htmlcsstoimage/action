import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_HCTI_USER_ID'] = 'fake';
  process.env['INPUT_HCTI_API_KEY'] = 'fake-key';

  process.env['INPUT_HTML'] = '<div>html</div>';
  process.env['INPUT_CSS'] = 'css';

  const ip = path.join(__dirname, '..', 'lib', 'main.js');
  const options: cp.ExecSyncOptions = {
    env: process.env
  };

  const output = cp.execSync(`VCR_MODE=playback node ${ip}`, options).toString();
});
