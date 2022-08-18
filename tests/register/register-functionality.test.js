/* eslint-disable testing-library/await-async-utils */
/* eslint-disable jest/valid-title */
/* eslint-disable no-undef */
import { Selector } from "testcafe";

fixture`Testing functionality on/from register-page`.page("http://185.51.76.204:9090/register")

/**
 * Functions
 */
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

/**
 * Tests
 */
test("Test register with valid information -> redirects", async t => {
    let rUser = makeid(10)
    let rPass = makeid(16)
    let rNick = makeid(10)

    await t
    .typeText(Selector('div.Register-InputWrapper:nth-child(1) > div:nth-child(2) > input:nth-child(2)'),rUser)
    .typeText(Selector('div.Register-InputWrapper:nth-child(2) > div:nth-child(2) > input:nth-child(2)'),rPass)
    .typeText(Selector('div.Register-InputWrapper:nth-child(3) > div:nth-child(2) > input:nth-child(2)'),rPass)
    .typeText(Selector('div.Register-InputWrapper:nth-child(4) > div:nth-child(2) > input:nth-child(2)'),rNick)
    .click(Selector(".Register-Button"))
    .wait(10000)
    .expect(Selector(".LoggedInNavbar-UserWrapper").exists)
    .eql(true)
})