export const onChangeRequestHeaders = (requestHeaderEnable: boolean) => {
		
    console.log('OnChangeRequestHeader: ', requestHeaderEnable)

    const allResourceTypes = Object.values(chrome.declarativeNetRequest.ResourceType);
    const rules: chrome.declarativeNetRequest.Rule[] = [
        {
          id: 1,
          priority: 1,
          action: {
            type: chrome.declarativeNetRequest.RuleActionType.MODIFY_HEADERS,
            requestHeaders: [{
                operation: chrome.declarativeNetRequest.HeaderOperation.SET,
                header: 'Origin',
                value: 'test-value',
            }]
          },
          condition: {
            urlFilter: '*',
            resourceTypes: allResourceTypes,
          }
        }, 
      ];
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rules.map((rule) => rule.id), // remove existing rules
        addRules: !requestHeaderEnable ? [] : rules
      });
}