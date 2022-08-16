/* eslint-disable jest/valid-title */
import { Selector } from 'testcafe'


// eslint-disable-next-line no-undef
fixture`Testing elements on index`.page("http://185.51.76.204:9090/")

/**
 * Tests for elements existance
 */
test("Test logo exists", async t => {
    await t.expect(Selector('.Navbar-Logo > a:nth-child(1) > img:nth-child(1)').exists).eql(true)
})

test("Test landing-page exists", async t => {
    await t.expect(Selector(".LandingPage-Wrapper").exists).eql(true)
})

test("Test does login-btn exist", async t => {
    await t.expect(Selector('a.Navbar-Button:nth-child(2)').exists).eql(true)
})

test("Test does register-btn exist", async t => {
    await t.expect(Selector('a.Navbar-Button:nth-child(1)').exists).eql(true)
})