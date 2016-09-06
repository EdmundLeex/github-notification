;(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;

  const AppCache = (() => {
    var instance;

    function init() {
      return {}
    }

    return {
      getInstance: () => {
        if (!instance) {
          instance = init();
        }
        return instance;
      }
    }
  })();

  GitHubNotifications.AppCache = AppCache.getInstance();
})();