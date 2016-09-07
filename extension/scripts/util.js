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
        console.log('updating');
        Api.getNotifications().then(response => {
          console.log('got response');
          if (response.status === 304) return;
          response.json().then(notifications => {
            console.log('parsed json');
            const oldNotifications = AppCache.get('notifications');
            const newNotifications = findNewNotifications(oldNotifications, notifications);

            AppCache.set('newNotifications', newNotifications);
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
            return `${Math.floor(seconds)} ${units.shift()}`;
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
              newOnes.push(notification);
            }
          });
        }

        return newOnes;
      }

      return {
        updateCache: updateCache,
        timeAgo: timeAgo
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