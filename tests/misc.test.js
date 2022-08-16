/* eslint-disable jest/valid-title */
/* eslint-disable no-undef */
import { Selector } from "testcafe";

fixture`Random tests with no real connection`.page('http:185.51.76.204:9090');

/**
 * Functions
 */
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


test("Test user sees 404 on page-not-found", async t => {
    await t
    .expect(Selector('.PageNotFound_Container').exists)
    .eql(true)
}).page(`http://185.51.76.204:9090/${makeid(64)}`)