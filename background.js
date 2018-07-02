'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: 'gooseShitContextMenu',
    title: 'Feed it to the Goose',
    contexts: ['selection']
  });

  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    var url = info.pageUrl;
    var text = info.selectionText;

    var postData = {
      snippet: {
        source: url,
        data: text
      }
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/snippets.json", true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 201) {
          alert("Snippet saved faster than shit through a goose!");
        } else {
          alert("Goose shit failure.");
        }
      }
    };
    xhr.send(JSON.stringify(postData));
  });
});
