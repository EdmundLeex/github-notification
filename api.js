(() => {
  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;
  const AppCache = GitHubNotifications.AppCache;
  const Settings = GitHubNotifications.Settings;

  const Api = (() => {
    var instance;

    function init() {
      function getNotifications() {
        const query = queryString();
        const url = `${Settings.get('baseUrl')}?${query}`;

        return request(url);
      }

      function queryString() {
        let query = [];
        if (Settings.get('onlyParticipating')) {
          query.push('participating=true');
        }
        return query.join('&');
      }

      function request(url) {
        const token = Settings.get('accessToken');
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