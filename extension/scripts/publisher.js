;(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;

  const Publisher = (() => {
    let instance;
    let subscribers = {};

    function init() {
      function on(evt, fn) {
        if (typeof fn !== 'function') {
          throw new TypeError('You can only subscribe a function');
        }

        if (subscribers[evt] === undefined) subscribers[evt] = [];
        subscribers[evt].push(fn);

        return true;
      }

      function publish(evt) {
        const events = subscribers[evt];
        events.forEach(fn => {
          fn.call();
        });
      }

      return {
        on,
        publish
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

  GitHubNotifications.Publisher = Publisher.getInstance();
})();