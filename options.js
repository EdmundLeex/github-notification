(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const formSettings = document.getElementById('form-settings');
    const btnCancel = document.getElementById('btn-cancel');
    const btnReset = document.getElementById('btn-reset');

    function showSettings() {
      const formAccessToken = formSettings.elements.namedItem('access-token');
      const formOnlyParticipating = formSettings.elements.namedItem('only-participating');

      formAccessToken.value = GitHubNotifications.settings.get('accessToken');
      formOnlyParticipating.checked = GitHubNotifications.settings.get('onlyParticipating');
    }

    showSettings();

    formSettings.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const token = form.elements.namedItem('access-token').value;
      const onlyParticipating = form.elements.namedItem('only-participating').checked;

      GitHubNotifications.settings.set('accessToken', token);
      GitHubNotifications.settings.set('onlyParticipating', onlyParticipating);

      self.close();
    });

    btnCancel.addEventListener('click', (e) => {
      e.preventDefault();
      self.close();
    });

    btnReset.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.clear();
      self.close();
    });
  });
})();