// ==UserScript==
// @name        Remove Apple Color Emoji from Font Family
// @namespace   http://xolve.net
// @version     1.0
// @license     AGPLv3
// @description Removes "Apple Color Emoji" from the font-family CSS property of text elements
// @match       *://*.notion.so/*
// @match       *://luma.com/*
// @grant       none
// @run-at      document-start
// @homepageURL  https://github.com/xolve/fx-linux-fix-apple-emoji-font
// @supportURL   https://github.com/xolve/fx-linux-fix-apple-emoji-font/issues
// @downloadURL  https://raw.githubusercontent.com/xolve/fx-linux-fix-apple-emoji-font/refs/heads/main/fx-apple-emoji-font-fixer.js
// @updateURL    https://raw.githubusercontent.com/xolve/fx-linux-fix-apple-emoji-font/refs/heads/main/fx-apple-emoji-font-fixer.js
// ==/UserScript==

'use strict';

function sanitizeFontFamily(el) {
    if (!el.textContent.trim()) return;

    const computedFont = window.getComputedStyle(el).fontFamily;
    if (!computedFont.includes('Apple Color Emoji')) return;

    const fonts = computedFont.split(',').map(f => f.trim().replace(/['"]/g, ''));
    const filtered = fonts.filter(f => f !== 'Apple Color Emoji');
    if (filtered.length < fonts.length) {
        el.style.fontFamily = filtered.map(f => f.includes(' ') ? `"${f}"` : f).join(', ');
    }
}

function processElement(el) {
    sanitizeFontFamily(el);
    el.querySelectorAll('*').forEach(sanitizeFontFamily);
}

function observeMutations() {
    const observer = new MutationObserver(mutations => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    processElement(node);
                }
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

function main() {
    processElement(document.body);
    observeMutations();
}

document.addEventListener('DOMContentLoaded', main);
