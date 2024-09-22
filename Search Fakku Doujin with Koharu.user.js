// ==UserScript==
// @name         Search Fakku Doujin with Koharu
// @namespace    http://tampermonkey.net/
// @version      1.01
// @description  Extracts title and searches on Koharu.to
// @author       FunkyJustin
// @match        https://www.fakku.net/hentai/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // Extract the title from the h1 element
    const titleElement = document.querySelector('h1.block.col-span-full.text-2xl.pt-2.font-bold.text-brand-light.text-left.dark\\:text-white.dark\\:link\\:text-white');
    if (titleElement) {
        const title = titleElement.innerText;

        // Create a new button element
        const button = document.createElement('button');
        button.innerText = 'Search with Koharu';
        button.style.padding = '10px';
        button.style.fontSize = '16px';
        button.style.marginTop = '10px';
        button.style.backgroundColor = '#4CAF50';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';

        // When the button is clicked, open a new tab with the Koharu search URL
        button.onclick = function() {
            const searchUrl = `https://koharu.to/?s=${encodeURIComponent(title)}`;
            window.open(searchUrl, '_blank');
        };

        // Insert the button after the h1 element
        titleElement.parentNode.insertBefore(button, titleElement.nextSibling);
    }
})();
