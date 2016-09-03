(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;

  const Cache = (() => {
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

  GitHubNotifications.Cache = Cache.getInstance();
})();