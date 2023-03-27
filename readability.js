#!/usr/bin/env node

import {Readability} from "@mozilla/readability";
import {JSDOM} from "jsdom";

const filepath = process.argv[2]
const encoding = process.argv[3] || null

if (!filepath) {
    console.log("filepath empty")
    process.exit(0)
}

JSDOM.fromFile(filepath, encoding && {contentType: `text/html; charset=${encoding}`}).then(dom => {
    let article = new Readability(dom.window.document, {debug: false}).parse()
    article['charset'] = dom.window.document.characterSet;
    console.log(JSON.stringify(article, null, 4))
});
