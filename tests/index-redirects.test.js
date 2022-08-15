/* eslint-disable jest/valid-title */
import { Selector, ClientFunction } from 'testcafe'

// eslint-disable-next-line no-undef
fixture`Testing elements with redirect on index`.page("http://185.51.76.204:9090/")

/**
 * Tests for elements redirecting
 */
test("Test register redirects", async t => {
    const getLocation = ClientFunction(() => document.location.href);

    await t.click(Selector('a.Navbar-Button:nth-child(1)')).expect(getLocation()).contains('http://185.51.76.204:9090/register')
})

test("Test login redirects", async t => {
    const getLocation = ClientFunction(() => document.location.href);

    await t.click(Selector('a.Navbar-Button:nth-child(2)')).expect(getLocation()).contains('http://185.51.76.204:9090/login')
})

test("Test Logo redicects to index", async t => {
    const getLocation = ClientFunction(()=>document.location.href);

    await t.click(Selector('html body div#root div.App div.Navbar-Container div.Navbar-Wrapper div.Navbar-Logo a')).expect(getLocation()).contains('http://185.51.76.204:9090/')
})

test("Test join button redirects to login", async t => {
    const getLocation = ClientFunction(()=>document.location.href);
    
    await t.click(Selector('.LandingPage-JoinButton')).expect(getLocation()).contains('http://185.51.76.204:9090/login')
})

test("Test create button redirects to login", async t => {
    const getLocation = ClientFunction(()=>document.location.href);
    
    await t.click(Selector('.LandingPage-CreateRoom')).expect(getLocation()).contains('http://185.51.76.204:9090/login')
})