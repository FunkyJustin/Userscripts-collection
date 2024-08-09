// ==UserScript==
// @name         Danbooru to Gelbooru Search Switcher and vice versa
// @namespace    https://greasyfork.org/en/users/187317-funkyjustin
// @version      0.7
// @description  Add buttons to switch between Danbooru and Gelbooru searches
// @author       FunkyJustin
// @license      MIT
// @match        https://danbooru.donmai.us/*
// @match        https://gelbooru.com/*
// @grant        GM_addStyle
// @downloadURL https://update.greasyfork.org/scripts/491016/Danbooru%20to%20Gelbooru%20Search%20Switcher%20and%20vice%20versa.user.js
// @updateURL https://update.greasyfork.org/scripts/491016/Danbooru%20to%20Gelbooru%20Search%20Switcher%20and%20vice%20versa.meta.js
// ==/UserScript==



(function() {
    'use strict';

    // Function to convert Danbooru URL to Gelbooru URL
    function danbooruToGelbooru(url) {
        return url.replace("danbooru.donmai.us/posts?tags=", "gelbooru.com/index.php?page=post&s=list&tags=");
    }

    // Function to convert Gelbooru URL to Danbooru URL
    function gelbooruToDanbooru(url) {
        return url.replace("gelbooru.com/index.php?page=post&s=list&tags=", "danbooru.donmai.us/posts?tags=");
    }

    // Add button to switch to Gelbooru search
    function addGelbooruButton() {
        let currentURL = window.location.href;
        let gelbooruURL = danbooruToGelbooru(currentURL);
        let gelbooruButton = document.createElement("a");
        gelbooruButton.textContent = "Search on Gelbooru";
        gelbooruButton.href = gelbooruURL;
        gelbooruButton.classList.add("search-button");
        document.body.appendChild(gelbooruButton);
    }

    // Add button to switch back to Danbooru search
    function addDanbooruButton() {
        let currentURL = window.location.href;
        let danbooruURL = gelbooruToDanbooru(currentURL);
        let danbooruButton = document.createElement("a");
        danbooruButton.textContent = "Search on Danbooru";
        danbooruButton.href = danbooruURL;
        danbooruButton.classList.add("search-button");
        document.body.appendChild(danbooruButton);
    }

    // Check if on Danbooru search page and add Gelbooru button
    if (window.location.href.includes("danbooru.donmai.us/posts?tags=")) {
        addGelbooruButton();
    }

    // Check if on Gelbooru search page and add Danbooru button
    if (window.location.href.includes("gelbooru.com/index.php?page=post&s=list&tags=")) {
        addDanbooruButton();
    }

    // Add event listeners for hover effect
    let buttons = document.querySelectorAll('.search-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.opacity = "1";
        });
        button.addEventListener('mouseleave', function() {
            this.style.opacity = "0.5";
        });
    });
})();

// Add CSS styles
GM_addStyle(`
.search-button {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    z-index: 9999;
    opacity: 0.5; /* Initially set opacity to 0.5 */
    transition: opacity 0.3s ease; /* Add transition effect */
}

.search-button:hover {
    opacity: 1; /* Set opacity to 1 when hovering over the button */
}
`);
