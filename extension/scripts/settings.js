;(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;

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
        set:    localStorage.setItem.bind(localStorage),
        remove: localStorage.removeItem.bind(localStorage),
        reset:  localStorage.clear.bind(localStorage)
      };

      Object.assign(settings, { defaults: defaults });

      return settings;
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

  GitHubNotifications.Settings = Settings.getInstance();
})();