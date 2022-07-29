
chrome.tabs.onActivated.addListener(function (tabId, info, tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tab.id, { action: "test", message: tabs[0].url })
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (info.status == "complete") {
        chrome.tabs.sendMessage(tab.id, { action: "test", message: tab.url })
    }
});

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    chrome.tabs.update({url: "https://example.com"});
    sendResponse("Gotcha!");
});