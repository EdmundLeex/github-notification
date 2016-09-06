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
      function render(text, title) {
        chrome.browserAction.setBadgeText({text: String(text)});
        chrome.browserAction.setBadgeBackgroundColor({color: [166, 41, 41, 255]});
        chrome.browserAction.setTitle({title: title});
      }

      function update(text) {
        let title;
        if (text === 0 || text === undefined) { text = ''; }
        if (text === '!') {
          title = 'Click me for more info.';
        } else {
          title = `${text} unread notifications`;
        }

        render(text, title);
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