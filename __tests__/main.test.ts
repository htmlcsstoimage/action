import {wait} from '../src/wait'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

test('throws invalid number', async() => {
    const input = parseInt('foo', 10);
    await expect(wait(input)).rejects.toThrow('milleseconds not a number');
});

test('wait 500 ms', async() => {
    const start = new Date();
    await wait(500);
    const end = new Date();
    var delta = Math.abs(end.getTime() - start.getTime());
    expect(delta).toBeGreaterThan(450);
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    process.env['INPUT_HCTI_USER_ID'] = 'user-id';
    process.env['INPUT_HCTI_API_KEY'] = 'api-key';

    process.env['INPUT_HTML'] = 'html';
    process.env['INPUT_CSS'] = 'css';
    const ip = path.join(__dirname, '..', 'lib', 'main.js');
    const options: cp.ExecSyncOptions = {
        env: process.env
    };
    console.log(cp.execSync(`node ${ip}`, options).toString());
});
