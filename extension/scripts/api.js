;(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;
  const Settings = GitHubNotifications.Settings;

  const Api = (() => {
    var instance;

    function init() {
      function getNotifications() {
        const token = Settings.get('accessToken');
        const onlyParticipating = Settings.get('onlyParticipating');
        const query = queryString(onlyParticipating);
        const baseUrl = Settings.get('baseUrl');
        let url;
        if (Settings.get('githubEnterpriseEnabled')) {
          url = `${baseUrl}/api/v3/notifications?${query}`;
        } else {
          url = `${Settings.get('baseUrl')}?${query}`;
        }

        return request(url, token).then(response => {
          if (response.status > 300) {
            return Promise.reject(new Error(response.statusText));
          } else {
            return response.json();
          }
        });
      }

      function queryString(onlyParticipating) {
        let query = [];
        if (onlyParticipating) {
          query.push('participating=true');
        }
        return query.join('&');
      }

      function request(url, token) {
        if (!token) {
          return Promise.reject(new Error('missing token'));
        }
        const headers = {
          Authorization: `token ${token}`,
          'If-Modified-Since': ''
        };

        return fetch(url, {headers});
      }

      return {
        getNotifications
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

  GitHubNotifications.Api = Api.getInstance();
})();
