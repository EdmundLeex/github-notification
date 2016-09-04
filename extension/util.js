(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;
  const AppCache = GitHubNotifications.AppCache;
  const Api = GitHubNotifications.Api;
  const Notification = GitHubNotifications.Notification;

  const Util = (() => {
    var instance;

    function init() {
      function updateCache(callback) {
        Api.getNotifications().then(response => {
          response.json().then(notifications => {
            AppCache.count = notifications.length;
            AppCache.notifications = createNotifications(notifications);
            if (callback !== undefined && callback.constructor === Function) {
              callback();
            };
          })
        });
      }

      function timeAgo(date) {
        let units = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];
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
        let notificationsArr = [];
        notifications.forEach(notification => {
          notificationsArr.push(Notification(notification));
        });

        return notificationsArr;
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