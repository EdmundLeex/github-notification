(() => {
  'use strict';

  function init() {
    const defaults = {
      baseUrl: 'https://api.github.com/notifications',
      accessToken: 'b2957b8c193e9dcf608c8ec40a0e3afcd59564e3',
      onlyParticipating: true,
      interval: 1
    };

    const settings = {
      get: name => {
        const isDefault = defaults.hasOwnProperty(name);
        return isDefault ? defaults[name] : localStorage.getItem(name);
      },
      set:    localStorage.setItem.bind(localStorage),
      remove: localStorage.removeItem.bind(localStorage),
      reset:  localStorage.clear.bind(localStorage)
    };

    const cache = {
      get:    sessionStorage.getItem.bind(sessionStorage),
      set:    sessionStorage.setItem.bind(sessionStorage),
      remove: sessionStorage.removeItem.bind(sessionStorage),
      reset:  sessionStorage.clear.bind(sessionStorage)
    };

    const api = {
      settings: settings,
      cache: cache
    }

    return api;
  };

  let GitHubNotifications = window.GitHubNotifications = init();

  GitHubNotifications.getNotifications = (callback) => {
    const query = GitHubNotifications.queryString().join('&');
    const url = `${GitHubNotifications.settings.get('baseUrl')}?${query}`;

    GitHubNotifications.request(url).then(response => {
      response.json().then(notifications => {
        GitHubNotifications.cache.set('count', notifications.length);
        callback();
      });
    });
  };

  GitHubNotifications.queryString = () => {
    let query = [];
    if (GitHubNotifications.settings.get('onlyParticipating')) {
      query.push('participating=true');
    }
    return query;
  };

  GitHubNotifications.request = url => {
      const token = GitHubNotifications.settings.get('accessToken');
      if (!token) {
        return Promise.reject(new Error('missing token'));
      }

      const headers = Object.assign({
        Authorization: `token ${token}`,
        'If-Modified-Since': ''
      });

      return fetch(url, {headers});
    };
})();