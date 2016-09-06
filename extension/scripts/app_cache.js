;(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;
  let Publisher = GitHubNotifications.Publisher;

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

        Object.assign(instance, Publisher);

        return instance;
      }
    }
  })();

  GitHubNotifications.AppCache = AppCache.getInstance();
})();