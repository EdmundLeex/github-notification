;(() => {
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
    const Util = GitHubNotifications.Util;

    function updateBadge() {
      const count = AppCache.count;
      Badge.update(count);
    }

    function scheduleUpdate() {
      const updateInterval = Settings.get('interval');

      chrome.alarms.create({
        periodInMinutes: updateInterval
      });

      chrome.alarms.onAlarm.addListener(Util.updateCache.bind(Util, updateBadge));
    }

    function init() {
      AppCache.on('APP_CACHE_CHANGE', updateBadge);

      scheduleUpdate();
      Util.updateCache(Util.handleError);
    }

    init();
  }, false);
})();