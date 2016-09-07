;(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;
  let Publisher = GitHubNotifications.Publisher;

  const Settings = (() => {
    var instance;

    function init() {
      const defaults = {
        baseUrl: 'https://api.github.com/notifications',
        accessToken: '',
        onlyParticipating: true,
        interval: 1,
        appId: chrome.runtime.id
      };

      let settings = {
        get: name => {
          const isSet = localStorage.hasOwnProperty(name);
          let value = isSet ? localStorage.getItem(name) : defaults[name];
          if (value === 'true' || value === 'false') {
            return value === 'true';
          } else {
            return value;
          }
        },
        set: (name, val) => {
          localStorage.setItem(name, val);
          instance.publish('SETTINGS_CHANGE');
          return val;
        },
        reset: () => {
          localStorage.clear();
          instance.publish('SETTINGS_CHANGE');
        },
        remove: localStorage.removeItem.bind(localStorage),
      };

      return settings;
    }

    return {
      getInstance: () => {
        if (!instance) {
          instance = init();
        }

        Object.assign(instance, Publisher);

        return instance;
      }
    };
  })();

  GitHubNotifications.Settings = Settings.getInstance();
})();