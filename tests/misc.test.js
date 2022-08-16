/* eslint-disable jest/valid-title */
/* eslint-disable no-undef */
import { Selector } from "testcafe";
import { MakeId } from "./util/util";

fixture`Random tests with no real connection`.page('http:185.51.76.204:9090');

test("Test user sees 404 on page-not-found", async t => {
    await t
    .expect(Selector('.PageNotFound_Container').exists)
    .eql(true)
}).page(`http://185.51.76.204:9090/${MakeId(64)}`)