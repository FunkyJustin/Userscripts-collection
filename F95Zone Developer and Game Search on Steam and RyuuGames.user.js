// ==UserScript==
// @name         F95Zone Developer and Game Search on Steam and RyuuGames
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  Adds buttons to search for the developer on f95zone and the game title on Steam and RyuuGames
// @author       FunkyJustin
// @license      MIT
// @match        https://f95zone.to/threads/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=f95zone.to
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create a search button
    function createSearchButton(buttonText, searchUrls) {
        const button = document.createElement('button');
        button.innerText = buttonText;
        button.style.marginLeft = '10px';
        button.style.cursor = 'pointer';

        // Styling to match the website's button style
        button.style.padding = '5px 10px';
        button.style.fontSize = '14px';
        button.style.color = '#FFFFFF';
        button.style.backgroundColor = '#0073e6';
        button.style.border = 'none';
        button.style.borderRadius = '3px';
        button.style.display = 'inline-block';
        button.style.textAlign = 'center';

        // Hover effect
        button.onmouseover = function() {
            button.style.backgroundColor = '#005bb5';
        };
        button.onmouseout = function() {
            button.style.backgroundColor = '#0073e6';
        };

        button.onclick = function() {
            searchUrls.forEach(url => window.open(url, '_blank'));
        };
        return button;
    }

    // Find the title element
    const titleElement = document.querySelector('.p-title h1.p-title-value');
    if (titleElement) {
        // Create a container for the buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginTop = '10px';

        // Extract the full title text
        const titleText = titleElement.innerText;

        // Extract the developer's name
        const developerMatch = titleText.match(/\[([^\]]+)\]$/);
        if (developerMatch) {
            const developerName = developerMatch[1];
            const developerSearchUrl = `https://f95zone.to/sam/latest_alpha/#/cat=games/page=1/creator=${developerName}`;
            const developerSteamSearchUrls = [
                `https://store.steampowered.com/search/?developer=${developerName}`,
                `https://store.steampowered.com/search/?term=${developerName}`
            ];
            const developerSearchButton = createSearchButton('Search Developer on F95Zone', [developerSearchUrl]);
            const developerSteamSearchButton = createSearchButton('Search Developer on Steam', developerSteamSearchUrls);

            // Append the developer search buttons to the container
            buttonContainer.appendChild(developerSearchButton);
            buttonContainer.appendChild(developerSteamSearchButton);
        }

        // Function to extract game title without modifying the DOM
        function extractGameTitle(element) {
            let gameTitle = '';
            element.childNodes.forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    gameTitle += node.textContent;
                }
            });
            return gameTitle.replace(/\[.*?\]/g, '').trim();
        }

        // Extract and clean the game title
        const gameTitle = extractGameTitle(titleElement);

        // Encode the game title to handle special characters
        const encodedGameTitle = encodeURIComponent(gameTitle.trim());

        // Construct the search URL with additional parameters
        const gameSearchUrl = `https://store.steampowered.com/search/?term=${encodedGameTitle}&supportedlang=english&ndl=1`;
        const gameSearchButton = createSearchButton('Search Game on Steam', [gameSearchUrl]);

        // Construct the search URL for RyuuGames
        const gameRyuuGamesSearchUrl = `https://www.ryuugames.com/?s=${encodedGameTitle}`;
        const gameRyuuGamesSearchButton = createSearchButton('Search Game on RyuuGames', [gameRyuuGamesSearchUrl]);

        // Append the game search buttons to the container
        buttonContainer.appendChild(gameSearchButton);
        buttonContainer.appendChild(gameRyuuGamesSearchButton);

        // Append the button container to the title element
        titleElement.appendChild(buttonContainer);
    }
})();
