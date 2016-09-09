;(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;

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
        if (text === undefined) {
          text = '!';
          title = 'Click me for more info.';
        } else {
          title = `${text} unread notifications`;
        }

        if (text === 0) text = ''; 
        render(text, title);
      }

      return {
        update
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