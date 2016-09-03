(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;

  const ViewMixins = {
    updateView: () => {
      const count = getDataFromCache('count');
      if (count === '0') { count = ''; }
      render(count);
    },

    render: () => {
      chrome.browserAction.setBadgeText({text: text});
      // chrome.browserAction.setBadgeBackgroundColor({color});
      // chrome.browserAction.setTitle({title});
    }
  };

  Object.assign(GitHubNotifications, ViewMixins);
});