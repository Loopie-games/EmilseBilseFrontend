/* eslint-disable jest/valid-title */
import { Selector } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`Testing elements on login`.page('http://185.51.76.204:9090/login')

/**
 * Tests for elements existance
 */
test("Test logo exists", async t => {
    await t.expect(Selector('.Navbar-Logo > a:nth-child(1) > img:nth-child(1)').exists).eql(true)
})

test("Test login pane exists", async t => {
    await t.expect(Selector("html body div#root div.App div.Login-Container div.Login-Wrapper div.Login-Component.animComponent").exists).eql(true)
})

test("Test does login-btn exist", async t => {
    await t.expect(Selector('a.Navbar-Button:nth-child(2)').exists).eql(true)
})

test("Test does register-btn exist", async t => {
    await t.expect(Selector('a.Navbar-Button:nth-child(1)').exists).eql(true)
})

test("Test login username-info exists", async t => {
    await t.expect(Selector('div.Login-InputWrapper:nth-child(1) > div:nth-child(2)').exists).eql(true)
})

test("Test login password-info exists", async t => {
    await t.expect(Selector('div.Login-InputWrapper:nth-child(2) > div:nth-child(2)').exists).eql(true)
})

test("Test login submit-button exists", async t => {
    await t.expect(Selector('.Login-Button').exists).eql(true)
})

test("Test sign up text exists", async t => {
    await t.expect(Selector('.Login-NeedAccountButton > a:nth-child(1)').exists).eql(true)
})

test("Test error message empty fields", async t => {
    await t.click(Selector(".Login-Button")).expect(Selector(".Login-Component > div:nth-child(2)").innerText).eql("Incorrect username or password")
})