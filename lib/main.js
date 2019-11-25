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
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
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
            console.log(`${html} ${css} ${google_fonts}`);
            core.setOutput('image_url', 'hi mike');
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
