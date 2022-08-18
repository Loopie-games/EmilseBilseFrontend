/* eslint-disable jest/valid-title */
import { Selector, ClientFunction } from 'testcafe'


// eslint-disable-next-line no-undef
fixture`Testing elements with redirect on register`.page("http://185.51.76.204:9090/register")

/**
 * Constant variables and anonymous variables
 */
const getLocation = ClientFunction(()=>document.location.href);

/**
 * Tests for elements redirecting
 */
test("Test register redirects", async t => {
    await t.click(Selector('a.Navbar-Button:nth-child(1)')).expect(getLocation()).contains('http://185.51.76.204:9090/register')
})

test("Test login redirects", async t => {
    await t.click(Selector('a.Navbar-Button:nth-child(2)')).expect(getLocation()).contains('http://185.51.76.204:9090/login')
})

test("Test Logo redirects to index", async t => {
    await t.click(Selector('html body div#root div.App div.Navbar-Container div.Navbar-Wrapper div.Navbar-Logo a')).expect(getLocation()).contains('http://185.51.76.204:9090/')
})

test("Test login-text redirects to login", async t => {
    await t.click(Selector('.Register-NeedAccountButton > a:nth-child(1)')).expect(getLocation()).contains('http://185.51.76.204:9090/login')
})
