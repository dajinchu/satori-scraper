chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {file: "js/jquery-3.2.1.min.js"});
    chrome.tabs.insertCSS(null, {file: "css/styles.css"});
    chrome.tabs.executeScript(null, {file: "js/content-script.js"});
});
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    console.log(sender);
    if (request.action == "xhttp") {
        $.ajax({
            url:request.url,
            type:request.type,
            headers:request.headers,
            data:request.data,
            success:function(e){
                console.log(e);
            },
            error:function(e){
                console.log(e);
            }
        });
    }
    // Pass along messages from iframe to content-script
    if(request.action == "user-selection"){
        chrome.tabs.sendMessage(sender.tab.id, request);
    }
    if(request.action == "resize"){
        chrome.tabs.sendMessage(sender.tab.id, request);
    }
    if(request.action == "boxselector"){
        chrome.tabs.sendMessage(sender.tab.id, request);
    }
});
