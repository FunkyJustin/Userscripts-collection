// ==UserScript==
// @name         F95Zone Search Buttons for DLsite
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  Adds buttons to search for the current game, circle, and product ID on F95Zone and its forums from DLsite. Also autofills and submits the search form on the F95Zone forums search page by clicking the search button. Adds buttons to search OtomiGames using the game title and product ID.
// @author       FunkyJustin
// @match        https://www.dlsite.com/maniax/work/=/product_id/*
// @match        https://www.dlsite.com/pro/work/=/product_id/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function createF95ZoneButton() {
        const gameTitle = document.querySelector('h1[id="work_name"]').innerText.trim();
        const circleNameElement = document.querySelector('span[itemprop="brand"] a');
        const circleName = circleNameElement.innerText.trim();
        let productId = window.location.href.match(/product_id\/([^\/]+)/)[1];

        // Remove the .html extension if present
        productId = productId.replace('.html', '');

        const f95zoneGameLink = `https://f95zone.to/sam/latest_alpha/#/cat=games/page=1/search=${encodeURIComponent(gameTitle)}`;
        const f95zoneForumLink = `https://f95zone.to/search/?q=${encodeURIComponent(gameTitle)}&t=post&c[child_nodes]=1&c[nodes][0]=2&c[title_only]=1&o=relevance`;
        const f95zoneCircleLink = `https://f95zone.to/sam/latest_alpha/#/cat=games/page=1/creator=${encodeURIComponent(circleName)}`;
        const f95zoneProductIdLink = `https://f95zone.to/search/?q=${encodeURIComponent(productId)}`;

        const otomiGamesSearchLink = `https://otomi-games.com/?s=${encodeURIComponent(gameTitle)}`;
        const otomiGamesProductIdLink = `https://otomi-games.com/${productId}/`;

        const gameButton = createButton('Search on F95Zone', f95zoneGameLink);
        const forumButton = createButton('Search on F95Zone Forums', f95zoneForumLink);
        const productIdButton = createButton('Search Product ID on F95Zone', f95zoneProductIdLink);
        const circleButton = createButton('Search Circle on F95Zone', f95zoneCircleLink);
        const otomiGamesSearchButton = createButton('Search on OtomiGames', otomiGamesSearchLink);
        const otomiGamesProductIdButton = createButton('Search Product ID on OtomiGames', otomiGamesProductIdLink);

        const titleContainer = document.querySelector('.base_title_br');
        const titleButtonWrapper = document.createElement('div');
        titleButtonWrapper.style.display = 'inline-block';
        titleButtonWrapper.style.marginLeft = '20px'; // Adjust spacing as needed

        titleButtonWrapper.appendChild(gameButton);
        titleButtonWrapper.appendChild(forumButton);
        titleButtonWrapper.appendChild(productIdButton);
        titleContainer.appendChild(titleButtonWrapper);

        const circleContainer = circleNameElement.parentNode;
        const circleButtonWrapper = document.createElement('div');
        circleButtonWrapper.style.display = 'inline-block';
        circleButtonWrapper.style.marginLeft = '10px'; // Adjust spacing as needed

        circleButtonWrapper.appendChild(circleButton);
        circleContainer.appendChild(circleButtonWrapper);

        const additionalButtonWrapperLeft = document.createElement('div');
        additionalButtonWrapperLeft.style.display = 'inline-block';
        additionalButtonWrapperLeft.style.marginLeft = '10px'; // Adjust spacing as needed

        additionalButtonWrapperLeft.appendChild(otomiGamesSearchButton);
        titleContainer.appendChild(additionalButtonWrapperLeft);

        const additionalButtonWrapperRight = document.createElement('div');
        additionalButtonWrapperRight.style.display = 'inline-block';
        additionalButtonWrapperRight.style.marginLeft = '10px'; // Adjust spacing as needed

        additionalButtonWrapperRight.appendChild(otomiGamesProductIdButton);
        titleContainer.appendChild(additionalButtonWrapperRight);

        // Click the search button on F95Zone forums page after loading
        if (window.location.href === f95zoneForumLink || window.location.href === f95zoneProductIdLink) {
            window.onload = function() {
                setTimeout(function() {
                    const searchField = document.querySelector('.input[name="keywords"]');
                    if (searchField) {
                        searchField.value = gameTitle;
                        searchField.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
                    }
                }, 1000); // 1 second delay before pressing Enter
            };
        }
    }

    function createButton(text, link) {
        const button = document.createElement('a');
        button.innerText = text;
        button.href = link;
        button.target = '_blank';
        button.style.display = 'inline-block';
        button.style.marginRight = '10px';
        button.style.color = '#fff';
        button.style.backgroundColor = '#009688';
        button.style.padding = '10px';
        button.style.borderRadius = '5px';
        button.style.textDecoration = 'none';
        button.style.cursor = 'pointer';

        return button;
    }

    // Wait for the game details to load before creating the button
    window.addEventListener('load', createF95ZoneButton);
})();
