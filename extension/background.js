chrome.webNavigation.onHistoryStateUpdated.addListener(function(data) {
	chrome.tabs.get(data.tabId, function(tab) {
		chrome.tabs.executeScript(data.tabId, {code: 'if (typeof AddScreenshotButton !== "undefined") { AddScreenshotButton(); }', runAt: 'document_start'});
	});
}, {url: [{hostSuffix: '.coursera.org'}]});

// background.js

// chrome.runtime.onInstalled.addListener(() => {
// 	console.log("Extension installed.");
//   });
  
//   // Listen for page load events
//   chrome.webNavigation.onCompleted.addListener((details) => {
// 	console.log("Page has finished loading:", details.url);
  
// 	// Execute your code here
// 	// For example, you can send a message to the content script to run code there
// 	chrome.tabs.sendMessage(details.tabId, { action: "runCodeAfterLoad" });
//   }, { url: [{ schemes: ["http", "https"] }] });
  