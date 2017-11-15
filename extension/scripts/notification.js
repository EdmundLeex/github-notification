;(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;
  const Settings = GitHubNotifications.Settings;

  function _Notification(params) {
    this.id = params.id;
    this.title = params.subject.title;
    this.type = params.subject.type;
    this.timeStamp = params.updated_at;
    this.repo = params.repository.name;
    this.fullName = params.repository.full_name;
    this.url = parseUrl(params.subject.url);
    this.img = `assets/images/${this.type.toLowerCase()}.png`;
  }

  function parseUrl(url) {
    var newUrl = url.slice();
    if (Settings.get('githubEnterpriseEnabled')) {
      newUrl = newUrl.replace('/api/v3', '');
    } else {
      newUrl = newUrl.replace('api.', '');
    }
    newUrl = newUrl.replace('/repos', '')
                   .replace('pulls', 'pull');

    return newUrl;
  }

  const Notification = (params) => {
    return new _Notification(params);
  }

  GitHubNotifications.Notification = Notification;
})();
