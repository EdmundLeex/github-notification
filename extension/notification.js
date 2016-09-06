(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;

  function _Notification(params) {
    this.id = params.id;
    this.title = params.subject.title;
    this.type = params.subject.type;
    this.timeStamp = params.updated_at;
    this.repo = params.repository.name;
    this.fullName = params.repository.full_name;
    this.url = parseUrl(params.subject.url);
  }

  function parseUrl(url) {
    url = url.replace('api.', '').replace('/repos', '');
    return url;
  }

  const Notification = (params) => {
    return new _Notification(params);
  }

  GitHubNotifications.Notification = Notification;
})();
