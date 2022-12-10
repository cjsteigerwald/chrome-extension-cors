import rules from '../static/rules1';

// if (true) {

// 	chrome.declarativeNetRequest.updateDynamicRules({
// 	  removeRuleIds: rules.map((rule) => rule.id), // remove existing rules
// 	  addRules: rules.map((rule) => {
	
// 		const headerObj = {
// 			operation: chrome.declarativeNetRequest.HeaderOperation.SET,
// 			header: 'Origin',
// 			value: 'test-value',
// 		}
	
// 		rule.action.requestHeaders.push(headerObj);
// 		console.log('New rule', rule)
// 		return rule;
// 	  })
// 	});
// }

// chrome.webRequest.onBeforeRequest.addListener((details) => {
//   const url = details.url;
//   const filters = ['googleadservices', 'googlesyndication', 'g.doubleclick']
//   for (const filter of filters) {
//     if (url.indexOf(filter) != -1) {
//       console.log(url)
//       return {cancel: true}
//     }
//   }
//   return {
//     cancel: false,
//   }
// },{
//   urls: ["<all_urls>"]
// }, ['blocking'])

