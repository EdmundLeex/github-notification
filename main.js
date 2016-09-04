(() => {

  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    if (window.GitHubNotifications === undefined) {
      window.GitHubNotifications = {};
    }

    const GitHubNotifications = window.GitHubNotifications;
    const Badge = GitHubNotifications.Badge;
    const Settings = GitHubNotifications.Settings;
    const Api = GitHubNotifications.Api;
    const AppCache = GitHubNotifications.AppCache;
    const Notification = GitHubNotifications.Notification;

    function updateCache(callback) {
      Api.getNotifications().then(response => {
        response.json().then(notifications => {
          AppCache.count = notifications.length;
          AppCache.notifications = createNotifications(notifications);
          if (callback !== undefined && callback.constructor === Function) {
            callback()
          };
        })
      });
    }

    function updateBadge() {
      const count = AppCache.count;
      Badge.update(count);
    }

    function scheduleUpdate(period) {
      chrome.alarms.create({
        periodInMinutes: period
      });

      chrome.alarms.onAlarm.addListener(updateCache);
      chrome.alarms.onAlarm.addListener(updateBadge);
    }

    function createNotifications(notifications) {
      let notificationsArr = [];
      notifications.forEach(notification => {
        notificationsArr.push(Notification(notification));
      });

      return notificationsArr;
    }

    function init() {
      scheduleUpdate(Settings.get('interval'));
      updateCache(updateBadge);
    }

    init();
  }, false);
})();