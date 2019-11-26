"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const fetch_vcr_1 = __importDefault(require("fetch-vcr"));
const js_base64_1 = require("js-base64");
fetch_vcr_1.default.configure({
    mode: 'playback',
    fixturePath: './fixtures',
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const html = core.getInput('html', { required: true });
            const css = core.getInput('css', { required: false });
            const google_fonts = core.getInput('google_fonts', { required: false });
            const hcti_user_id = core.getInput('hcti_user_id', { required: true });
            const hcti_api_key = core.getInput('hcti_api_key', { required: true });
            core.setSecret(hcti_user_id);
            core.setSecret(hcti_api_key);
            const data = { html: html, css: css, google_fonts: google_fonts };
            let headers = {};
            headers['Authorization'] = 'Basic ' + js_base64_1.Base64.encode(hcti_user_id + ":" + hcti_api_key);
            const response = yield fetch_vcr_1.default('https://hcti.io/v1/image', { method: 'post', headers: headers, body: JSON.stringify(data) });
            const response_data = yield response.json();
            core.setOutput('image_url', response_data.url);
        }
        catch (error) {
            console.error(error);
            core.setFailed(error.message);
        }
    });
}
run();
