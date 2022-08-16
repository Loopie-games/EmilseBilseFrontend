/* eslint-disable testing-library/await-async-utils */
/* eslint-disable jest/valid-title */
import { Selector, ClientFunction } from "testcafe";

// eslint-disable-next-line no-undef
fixture`Testing functionality on/from login-page`.page("http://185.51.76.204:9090/login")

/**
 * Constant variables and anonymous variables
 */
const getLocation = ClientFunction(() => document.location.href);

/**
 * Tests
 */
test("Test login with correct information redirects and logs in", async t => {
    await t
        .typeText(Selector('div.Login-InputWrapper:nth-child(1) > div:nth-child(2) > input:nth-child(2)'), "GULLEROD4")
        .typeText(Selector('div.Login-InputWrapper:nth-child(2) > div:nth-child(2) > input:nth-child(2)'), "GULLEROD4")
        .click(Selector(".Login-Button"))
        //.wait(10000)
        .expect(getLocation())
        .eql("http://185.51.76.204:9090/")
})


test("Test login with incorrect information throws error", async t => {
    await t
        .typeText(Selector('div.Login-InputWrapper:nth-child(1) > div:nth-child(2) > input:nth-child(2)'), "NOT_A_USER")
        .typeText(Selector('div.Login-InputWrapper:nth-child(2) > div:nth-child(2) > input:nth-child(2)'), "NOT_A_PASSWORD")
        .click(Selector(".Login-Button"))
        .expect(Selector(".Login-Component > div:nth-child(2)").innerText)
        .eql("Incorrect username or password")
})