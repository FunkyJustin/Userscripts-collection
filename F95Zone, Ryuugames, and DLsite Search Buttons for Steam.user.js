// ==UserScript==
// @name         F95Zone, Ryuugames, and DLsite Search Buttons for Steam
// @namespace    http://tampermonkey.net/
// @version      6.0
// @description  Adds buttons to search for the current game and developer on F95Zone and its forums, and search for the game on Ryuugames, OtomiGames, and DLsite. Also autofills and submits the search form on the F95Zone forums search page by clicking the search button.
// @author       FunkyJustin
// @match        https://store.steampowered.com/app/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function createF95ZoneButton() {
        const gameTitle = document.querySelector('.apphub_AppName').innerText.trim();
        const f95zoneGameLink = `https://f95zone.to/sam/latest_alpha/#/cat=games/page=1/search=${encodeURIComponent(gameTitle)}`;
        const f95zoneForumLink = `https://f95zone.to/search/?q=${encodeURIComponent(gameTitle)}&t=post&c[child_nodes]=1&c[nodes][0]=2&c[title_only]=1&o=relevance`;
        const ryuugamesLink = `https://www.ryuugames.com/?s=${encodeURIComponent(gameTitle)}`;
        const otomiGamesLink = `https://otomi-games.com/?s=${encodeURIComponent(gameTitle)}`;
        const dlsiteProLink = `https://www.dlsite.com/pro/fsr/=/language/jp/sex_category%5B0%5D/male/keyword/${encodeURIComponent(gameTitle)}/work_category%5B0%5D/pc/order%5B0%5D/trend/options_and_or/and/per_page/30/page/1/from/fs.header`;
        const dlsiteManiaxLink = `https://www.dlsite.com/maniax/fsr/=/language/jp/sex_category%5B0%5D/male/keyword/${encodeURIComponent(gameTitle)}/work_category%5B0%5D/doujin/work_category%5B1%5D/books/work_category%5B2%5D/pc/work_category%5B3%5D/app/order%5B0%5D/trend/options_and_or/and/per_page/30/page/1/from/fs.header`;
        const developerElement = document.querySelector('#developers_list a');

        const gameButton = createButton('Search on F95Zone', f95zoneGameLink);
        const forumButton = createButton('Search on F95Zone Forums', f95zoneForumLink);
        const ryuugamesButton = createButton('Search on Ryuugames', ryuugamesLink);
        const otomiGamesButton = createButton('Search on OtomiGames', otomiGamesLink);
        const dlsiteProButton = createButton('Search on DLsite (Pro)', dlsiteProLink);
        const dlsiteManiaxButton = createButton('Search on DLsite (Maniax)', dlsiteManiaxLink);

        const titleElement = document.querySelector('.apphub_AppName');
        titleElement.parentElement.appendChild(gameButton);
        titleElement.parentElement.appendChild(document.createTextNode(' '));
        titleElement.parentElement.appendChild(forumButton);
        titleElement.parentElement.appendChild(document.createTextNode(' '));
        titleElement.parentElement.appendChild(ryuugamesButton);
        titleElement.parentElement.appendChild(document.createTextNode(' '));
        titleElement.parentElement.appendChild(otomiGamesButton);
        titleElement.parentElement.appendChild(document.createTextNode(' '));
        titleElement.parentElement.appendChild(dlsiteProButton);
        titleElement.parentElement.appendChild(document.createTextNode(' '));
        titleElement.parentElement.appendChild(dlsiteManiaxButton);

        if (developerElement) {
            const developerName = developerElement.innerText.trim();
            const f95zoneDeveloperLink = `https://f95zone.to/sam/latest_alpha/#/cat=games/page=1/creator=${encodeURIComponent(developerName)}`;
            const dlsiteDeveloperLink = `https://www.dlsite.com/pro/fsr/=/language/jp/sex_category%5B0%5D/male/keyword/${encodeURIComponent(developerName)}/order%5B0%5D/trend/options_and_or/and/per_page/30/page/1/from/fs.header`;

            const developerButtonF95Zone = createButton('Search Developer on F95Zone', f95zoneDeveloperLink);
            developerButtonF95Zone.style.fontSize = '0.8em'; // Adjust font size to match other buttons
            developerButtonF95Zone.style.whiteSpace = 'nowrap'; // Prevent text wrapping
            developerButtonF95Zone.style.backgroundColor = 'rgba(255, 215, 0, 0.5)'; // Translucent gold background
            developerButtonF95Zone.style.color = '#000'; // Black text color

            const developerButtonDLsite = createButton('Search Developer on DLsite', dlsiteDeveloperLink);
            developerButtonDLsite.style.fontSize = '0.8em'; // Adjust font size to match other buttons
            developerButtonDLsite.style.whiteSpace = 'nowrap'; // Prevent text wrapping
            developerButtonDLsite.style.backgroundColor = 'rgba(255, 215, 0, 0.5)'; // Translucent gold background
            developerButtonDLsite.style.color = '#000'; // Black text color

            titleElement.parentElement.appendChild(document.createElement('br')); // Add a line break for separation
            titleElement.parentElement.appendChild(developerButtonF95Zone);
            titleElement.parentElement.appendChild(document.createTextNode(' '));
            titleElement.parentElement.appendChild(developerButtonDLsite);
        }
    }

    function createButton(text, link) {
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'esi-add-note btnv6_blue_hoverfade btn_medium';
        buttonContainer.style.margin = '5px 10px 5px 0'; // 5px top, 10px right, 5px bottom, 0px left
        buttonContainer.style.overflow = 'hidden'; // Hide overflow content

        const button = document.createElement('span');
        button.innerText = text;
        button.style.whiteSpace = 'nowrap'; // Prevent text wrapping
        button.style.overflow = 'hidden'; // Hide overflow content
        button.style.textOverflow = 'ellipsis'; // Add ellipsis for overflow text

        buttonContainer.appendChild(button);

        buttonContainer.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default action
            openUniqueTab(link); // Open link in a new tab
        });

        return buttonContainer;
    }

    function openUniqueTab(url) {
        window.open(url, '_blank'); // Open link in a new tab
    }

    // Wait for the game details to load before creating the button
    window.addEventListener('load', createF95ZoneButton);
})();
