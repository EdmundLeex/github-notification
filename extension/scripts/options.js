;(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const GitHubNotifications = chrome.extension.getBackgroundPage().GitHubNotifications;
    const Settings = GitHubNotifications.Settings;

    const formSettings = document.getElementById('form-settings');
    const btnCancel = document.getElementById('btn-cancel');
    const btnReset = document.getElementById('btn-reset');
    const formAccessToken = formSettings.elements.namedItem('access-token');
    const formOnlyParticipating = formSettings.elements.namedItem('only-participating');
    const formNotificationsEnabled = formSettings.elements.namedItem('notifications-enabled');

    function showSettings() {
      formAccessToken.value = Settings.get('accessToken');
      formOnlyParticipating.checked = Settings.get('onlyParticipating');
      formNotificationsEnabled.checked = Settings.get('notificationsEnabled');
    }

    showSettings();

    formSettings.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const token = formAccessToken.value;
      const onlyParticipating = formOnlyParticipating.checked;
      const notificationsEnabled = formNotificationsEnabled.checked;

      Settings.set('accessToken', token);
      Settings.set('onlyParticipating', onlyParticipating);
      Settings.set('notificationsEnabled', notificationsEnabled);

      self.close();
    });

    btnCancel.addEventListener('click', (e) => {
      e.preventDefault();
      self.close();
    });

    btnReset.addEventListener('click', (e) => {
      e.preventDefault();

      Settings.reset();
      showSettings();

      formSettings.value
    });
  });
})();