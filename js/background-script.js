chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "js/jquery-3.2.1.min.js"});
    chrome.tabs.executeScript(null, {file: "js/content-script.js"});
});
