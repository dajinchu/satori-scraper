//var scraperUtilityCSS = document.createElement("style");

//scraperUtilityCSS.src = chrome.extension.getURL("css/styles.css");
//scraperUtilityScript.src = chrome.extension.getURL("js/scraper-script.js")

var CSSNode = document.createElement("link");
CSSNode.rel = "stylesheet";
CSSNode.href = chrome.extension.getURL("css/styles.css");
document.head.appendChild(CSSNode);

var scriptNode = document.createElement("script");
scriptNode.src = chrome.extension.getURL("js/scraper-script.js");
document.head.appendChild(scriptNode);

var scraperTool = document.createElement("header");
scraperTool.id = "scraper-tool";
document.body.insertBefore(scraperTool, document.body.firstChild);
$(scraperTool).load(chrome.extension.getURL("html/scraper.html"));