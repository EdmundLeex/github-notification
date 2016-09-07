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
            const oldNotifications = AppCache.get('notifications');
            const newNotifications = findNewNotifications(oldNotifications, notifications);

            AppCache.set('newNotifications', newNotifications);
            AppCache.set('count', notifications.length);
            AppCache.set('notifications', createNotifications(notifications));
          })
        }).catch(errorHandler);
      }

      function timeAgo(date) {
        let units = ['yr', 'mo', 'day', 'hr', 'min', 'sec'];
        let dividents = [31536000, 2592000, 86400, 3600, 60];
        date = new Date(date);

        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / dividents.shift());
        function _timeSince() {
          while (interval < 1) {
            units.shift();
            interval = Math.floor(seconds / dividents.shift());
          }
          let unit = units.shift();
          if (interval > 1) unit = `${unit}s`;
          return `${interval} ${unit}`;
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
        AppCache.clear();
      }

      function findNewNotifications(oldNotifications, newNotifications) {
        let newOnes = [];

        if (!oldNotifications) {
          newNotifications.forEach(notification => {
            newOnes.push(Notification(notification));
          });
        } else {
          newNotifications.forEach(notification => {
            if (!oldNotifications[notification.id]) {
              newOnes.push(Notification(notification));
            }
          });
        }

        return newOnes;
      }

      function markRead(notification) {
        const notifications = AppCache.get('notifications');
        const count = AppCache.get('count');

        delete notifications[notification.id];
        AppCache.set('count', count - 1);
      }

      return {
        updateCache: updateCache,
        timeAgo: timeAgo,
        markRead: markRead
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