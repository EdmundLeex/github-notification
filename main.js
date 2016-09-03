(() => {
  'use strict';

  function render(text) {
    chrome.browserAction.setBadgeText({text: text});
    // chrome.browserAction.setBadgeBackgroundColor({color});
    // chrome.browserAction.setTitle({title});
  }

  function updateCache(callback) {
    GitHubNotifications.getNotifications(() => {
      if (callback !== undefined && callback.constructor === Function) { callback() };
      console.log('updatingCache');
    });
  }

  function updateView() {
    const count = getDataFromCache('count');
    if (count === '0') { count = ''; }
    render(count);
  }

  function scheduleUpdate(period) {
    chrome.alarms.create({
      periodInMinutes: period
    });

    chrome.alarms.onAlarm.addListener(updateCache);
    chrome.alarms.onAlarm.addListener(updateView);
  }

  function getDataFromCache(item) {
    return GitHubNotifications.cache.get('count');
  }

  function init() {
    scheduleUpdate(GitHubNotifications.settings.get('interval'));
    updateCache(updateView);
  }

  init();
})();