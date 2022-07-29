
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            var link = mutation.target.querySelector('div');
            if (link) {
                setTimeout(function () {
                    link.remove();
                    chrome.runtime.sendMessage({ text: "hey" }, function (response) {
                        console.log("Response: ", response);
                    })
                }, 1000);
            } else {
                console.log('this ell has no link BUT it was an added el')
            }
        }
    })
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action == "test") {
        callOnPage(message.message);
    }
});

var callOnPage = (function (activeTab) {

    var googleImages = activeTab.indexOf('google.com') !== -1 && activeTab.indexOf('tbm=isch') !== -1;
    var googleVideos = activeTab.indexOf('google.com') !== -1 && activeTab.indexOf('tbm=vid') !== -1;

    if (googleImages || googleVideos) {
        var images = document.getElementsByTagName('img');
        var l = images.length;
        for (var i = 0; i < l; i++) {
            images[0].parentNode.removeChild(images[0]);
            observer.observe(document, { attributes: false, childList: true, characterData: false, subtree: true });
        }
    }
})