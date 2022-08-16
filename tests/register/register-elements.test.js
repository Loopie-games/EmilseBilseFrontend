/* eslint-disable jest/valid-title */
import { Selector } from 'testcafe'


// eslint-disable-next-line no-undef
fixture`Testing elements on register`.page("http://185.51.76.204:9090/register")

/**
 * Tests for elements existance
 */
test("Test logo exists", async t => {
    await t.expect(Selector('.Navbar-Logo > a:nth-child(1) > img:nth-child(1)').exists).eql(true)
})

test("Test landing-page exists", async t => {
    await t.expect(Selector(".Register-Component").exists).eql(true)
})

test("Test does login-btn exist", async t => {
    await t.expect(Selector('a.Navbar-Button:nth-child(2)').exists).eql(true)
})

test("Test does register-btn exist", async t => {
    await t.expect(Selector('a.Navbar-Button:nth-child(1)').exists).eql(true)
})

test("Test does input username exist", async t => {
    await t.expect(Selector('div.Register-InputWrapper:nth-child(1) > div:nth-child(2) > input:nth-child(2)').exists).eql(true)
})

test("Test does input password exist", async t => {
    await t.expect(Selector('div.Register-InputWrapper:nth-child(2) > div:nth-child(2) > input:nth-child(2)').exists).eql(true)
})

test("Test does input repeat password exist", async t => {
    await t.expect(Selector('div.Register-InputWrapper:nth-child(3) > div:nth-child(2) > input:nth-child(2)').exists).eql(true)
})

test("Test does input nickname exist", async t => {
    await t.expect(Selector('div.Register-InputWrapper:nth-child(4) > div:nth-child(2) > input:nth-child(2)').exists).eql(true)
})

test("Test does submit-btn exist", async t => {
    await t.expect(Selector('.Register-Button').exists).eql(true)
})

test("Test does GoToLogin text exist", async t => {
    await t.expect(Selector('.Register-NeedAccountButton > a:nth-child(1) ').exists).eql(true)
})