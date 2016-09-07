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
        const url = `${Settings.get('baseUrl')}?${query}`;

        return request(url, token);
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

        const headers = Object.assign({
          Authorization: `token ${token}`,
          'If-Modified-Since': ''
        });

        return fetch(url, {headers});
      }

      return {
        getNotifications: getNotifications
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