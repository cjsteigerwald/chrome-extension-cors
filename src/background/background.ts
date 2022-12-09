chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(function (o) {
	console.log('rule matched:', o);
});

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// 	console.log(message);
// 	console.log(sender);
// 	sendResponse('From the background script');
// });
