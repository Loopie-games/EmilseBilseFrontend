/* eslint-disable jest/valid-title */
import { Selector } from 'testcafe'
import { GetLocation } from '../util/util'


// eslint-disable-next-line no-undef
fixture`Testing elements with redirect on index`.page("http://185.51.76.204:9090/login")

/**
 * Tests for elements redirecting
 */
test("Test register redirects", async t => {
    await t.click(Selector('a.Navbar-Button:nth-child(1)')).expect(GetLocation()).contains('http://185.51.76.204:9090/register')
})

test("Test login redirects", async t => {
    await t.click(Selector('a.Navbar-Button:nth-child(2)')).expect(GetLocation()).contains('http://185.51.76.204:9090/login')
})

test("Test Logo redirects to index", async t => {
    await t.click(Selector('html body div#root div.App div.Navbar-Container div.Navbar-Wrapper div.Navbar-Logo a')).expect(GetLocation()).contains('http://185.51.76.204:9090/')
})

