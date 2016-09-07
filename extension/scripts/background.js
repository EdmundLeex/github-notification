;(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    if (window.GitHubNotifications === undefined) {
      window.GitHubNotifications = {};
    }

    const GitHubNotifications = window.GitHubNotifications;
    const Badge = GitHubNotifications.Badge;
    const Settings = GitHubNotifications.Settings;
    const AppCache = GitHubNotifications.AppCache;
    const Util = GitHubNotifications.Util;

    function updateBadge() {
      const count = AppCache.get('count');
      Badge.update(count);
    }

    function prompNotifier() {
      let newNotifications = AppCache.get('newNotifications');

      if (!newNotifications) return;

      while (newNotifications.length) {
        const notification = newNotifications.pop();

        chrome.notifications.create(notification.id, {
          type: 'basic',
          iconUrl: 'assets/images/icon-lg.png',
          title: notification.fullName,
          message: notification.title
        });
      }
    }

    function scheduleUpdate() {
      const updateInterval = Settings.get('interval');

      chrome.alarms.create({
        periodInMinutes: updateInterval
      });

      chrome.alarms.onAlarm.addListener(Util.updateCache);
    }

    function init() {
      AppCache.on('APP_CACHE_CHANGE', updateBadge);
      AppCache.on('APP_CACHE_CHANGE', prompNotifier);
      Settings.on('SETTINGS_CHANGE', Util.updateCache);

      chrome.notifications.onClicked.addListener((id) => {
        const notification = AppCache.get('notifications')[id];
        Util.markRead(notification);
        chrome.tabs.create({ url: notification.url });
      });

      scheduleUpdate();
      Util.updateCache();
    }

    init();
  }, false);
})();