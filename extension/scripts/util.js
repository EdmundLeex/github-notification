;(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;
  const AppCache = GitHubNotifications.AppCache;
  const Api = GitHubNotifications.Api;
  const Notification = GitHubNotifications.Notification;
  const Badge = GitHubNotifications.Badge;

  const Util = (() => {
    var instance;

    function init() {
      function updateCache(errorHandler) {
        if (errorHandler === undefined) errorHandler = handleError;

        Api.getNotifications().then(response => {
          response.json().then(notifications => {
            AppCache.set('count', notifications.length);
            AppCache.set('notifications', createNotifications(notifications));
          })
        }).catch(errorHandler);
      }

      function timeAgo(date) {
        let units = ['yrs', 'mo', 'days', 'hrs', 'mins', 'sec'];
        let dividents = [31536000, 2592000, 86400, 3600, 60];
        date = new Date(date);

        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / dividents.shift());

        function _timeSince() {
          while (interval <= 1) {
            units.shift();
            interval = Math.floor(seconds / dividents.shift());
          }
          if (interval !== interval) {
            return Math.floor(seconds) + " seconds";
          } else {
            return `${interval} ${units.shift()}`;
          }
        }

        return `${_timeSince()} ago`;
      }

      function createNotifications(notifications) {
        let notificationsHash = {};
        notifications.forEach(notification => {
          notificationsHash[notification.id] = Notification(notification);
        });

        return notificationsHash;
      }

      function handleError() {
        Badge.update('!');
      }

      return {
        updateCache: updateCache,
        timeAgo: timeAgo,
        handleError: handleError
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

  GitHubNotifications.Util = Util.getInstance();
})();