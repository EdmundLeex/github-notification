(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;
  const AppCache = GitHubNotifications.AppCache;

  const Badge = (() => {
    var instance;

    function init() {
      function render(text) {
        chrome.browserAction.setBadgeText({text: String(text)});
        // chrome.browserAction.setBadgeBackgroundColor({color});
        // chrome.browserAction.setTitle({title});
      }

      function update(count) {
        if (count === '0') { count = ''; }
        render(count);
      }

      return {
        update: update
      };
    }

    return {
      getInstance: () => {
        if (!instance) {
          instance = init();
        }
        return instance;
      }
    };
  })();

  GitHubNotifications.Badge = Badge.getInstance();
})();