#!/usr/bin/env node

import {Readability} from "@mozilla/readability";
import {JSDOM} from "jsdom";

const filepath = process.argv[2] || ""
const encoding = process.argv[3] || "utf-8"

if (filepath) {
    processFile(filepath, encoding);
} else {
    let input = '';
    process.stdin.on('data', (chunk) => {
        input += chunk;
    });
    process.stdin.on('end', () => {
        processInput(input, encoding);
    });
}

function processFile(filepath, encoding) {
    JSDOM.fromFile(filepath, encoding && {contentType: `text/html; charset=${encoding}`}).then(dom => {
        processDom(dom)
    });
}

function processInput(content, encoding) {
    let dom = new JSDOM(content, encoding && {contentType: `text/html; charset=${encoding}`})
    processDom(dom)
}

function processDom(dom) {
    let article = new Readability(dom.window.document, {debug: false}).parse()
    if (article) {
        article['charset'] = dom.window.document.characterSet;
    }
    console.log(JSON.stringify(article, null, 4))
}
