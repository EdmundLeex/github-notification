(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;

  const Badge = (() => {
    var instance;

    function init() {
      function getDataFromCache(item) {
        return String(GitHubNotifications.cache.count);
      }

      function render() {
        chrome.browserAction.setBadgeText({text: text});
        // chrome.browserAction.setBadgeBackgroundColor({color});
        // chrome.browserAction.setTitle({title});
      }

      return {
        updateBadge: () => {
          const count = getDataFromCache('count');
          if (count === '0') { count = ''; }
          render(count);
        }
      };
    }

    return {
      getInstance: function () {
        if (!instance) {
          instance = init();
        }
        return instance;
      }
    };
  })();

  // const BadgeMixins = {
  //   function getDataFromCache(item) {
  //     return String(GitHubNotifications.cache.count);
  //   },

  //   updateView: () => {
  //     const count = getDataFromCache('count');
  //     if (count === '0') { count = ''; }
  //     render(count);
  //   },

  //   render: () => {
  //     chrome.browserAction.setBadgeText({text: text});
  //     // chrome.browserAction.setBadgeBackgroundColor({color});
  //     // chrome.browserAction.setTitle({title});
  //   }
  // };

  GitHubNotifications.Badge = Badge.getInstance();
})();