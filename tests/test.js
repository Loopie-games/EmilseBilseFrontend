/**
 * This is an empty file for testing
 * This file has no meaning for the rest of the program
 */

 import { Selector } from 'testcafe';

 // eslint-disable-next-line no-undef
 fixture `Element properties`
     .page('https://devexpress.github.io/testcafe/example/');
 
 test("Check an element's markup", async t => {
     const selector = Selector('label[for]').addCustomDOMProperties({
         outerHTML: el => el.outerHTML
     });
 
     const elementOuterHTML = await selector().outerHTML;
 
     await t.expect(elementOuterHTML).eql('<label for="remote-testing"><input type="checkbox" name="remote" id="remote-testing" data-testid="remote-testing-checkbox">Support for testing on remote devices</label>');
 });