// ==UserScript==
// @name         Twitter Image to SauceNAO
// @namespace    http://yourwebsite.com
// @version      2.4
// @description  Adds a button to convert Twitter image URLs to SauceNAO search URLs independently of other extensions or buttons and changes color when clicked
// @author       FunkyJustin
// @match        https://twitter.com/*
// @match        https://x.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function createSauceNAOButton(imageUrl) {
        const button = document.createElement('div');
        button.className = 'saucenao-button';
        button.style.display = 'inline-block';
        button.style.marginLeft = '8px';
        button.style.cursor = 'pointer';
        button.style.color = 'rgb(29, 155, 240)';  // Twitter's default link color
        button.innerText = 'SauceNAO';

        button.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            const saucenaoUrl = convertToSauceNAOUrl(imageUrl);
            window.open(saucenaoUrl, '_blank');
        });

        return button;
    }

    function convertToSauceNAOUrl(imageUrl) {
        const encodedUrl = encodeURIComponent(imageUrl);
        return `https://saucenao.com/search.php?url=${encodedUrl}`;
    }

    function addSauceNAOButtons() {
        const images = document.querySelectorAll('img[src*="pbs.twimg.com/media"]');
        images.forEach(image => {
            const container = image.closest('article')?.querySelector('div[role="group"]');
            if (container) {
                const existingButton = container.querySelector('.saucenao-button');
                if (!existingButton) {
                    const sauceNAOButton = createSauceNAOButton(image.src);
                    container.appendChild(sauceNAOButton);
                }
            }
        });
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            addSauceNAOButtons();
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    addSauceNAOButtons();
})();
