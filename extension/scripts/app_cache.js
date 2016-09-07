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
      let appCache = {};

      function set(name, val) {
        appCache[name] = val;
        instance.publish('APP_CACHE_CHANGE');
        return val;
      }

      function get(name) {
        return appCache[name];
      }

      return {
        set: set,
        get: get
      };
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