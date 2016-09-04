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

    function updateCache(callback) {
      Api.getNotifications(() => {
        if (callback !== undefined && callback.constructor === Function) {
          callback()
        };
        console.log('updatingCache');
      });
    }

    function scheduleUpdate(period) {
      chrome.alarms.create({
        periodInMinutes: period
      });

      chrome.alarms.onAlarm.addListener(updateCache);
      chrome.alarms.onAlarm.addListener(Badge.updateView);
    }

    function init() {
      scheduleUpdate(Settings.get('interval'));
      updateCache(Badge.updateBadge);
    }

    init();
  }, false);
})();