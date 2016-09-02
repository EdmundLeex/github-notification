(() => {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const formAccessToken = document.getElementById('access-token');
    const formOnlyParticipating = document.getElementById('only-participating');

    function showSettings() {
      formAccessToken.value = GitHubNotifications.settings.get('accessToken');
      formOnlyParticipating.checked = GitHubNotifications.settings.get('onlyParticipating');
    }

    showSettings();

    formAccessToken.addEventListener('change', (e) => {
      debugger;
    });
  });
})();