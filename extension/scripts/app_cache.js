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

      function clear() {
        appCache = {};
        instance.publish('APP_CACHE_CHANGE');
        return true;
      }

      return {
        set: set,
        get: get,
        clear: clear
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