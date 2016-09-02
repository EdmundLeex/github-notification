(() => {
  'use strict';

  function render(text) {
    chrome.browserAction.setBadgeText({text: text});
    // chrome.browserAction.setBadgeBackgroundColor({color});
    // chrome.browserAction.setTitle({title});
  }

  function update() {
    GitHubNotifications.getNotifications(() => {
      const count = GitHubNotifications.cache.get('count');
      console.log('updating');
      render(count);
    });
  }

  function scheduleUpdate(period) {
    chrome.alarms.create({
      periodInMinutes: period
    });

    chrome.alarms.onAlarm.addListener(update);
  }

  scheduleUpdate(GitHubNotifications.settings.get('interval'));
})();