(() => {
  'use strict';

  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;

  function _Notification(params) {
    this.title = params.subject.title;
    this.type = params.subject.type;
    this.timeStamp = params.updated_at;
    this.repo = params.repository.name;
    this.fullName = params.repository.full_name;
    this.url = prUrl(params.subject.url, this.fullName);

    this.markRead = () => {
      console.log(this.url);
    }
  }

  function prUrl(url, fullName) {
    const baseUrl = `https://github.com/`;
    const regex = /\/pulls\/(\w+)/g;
    const prNumber = regex.exec(url)[1];

    return `${baseUrl}/${fullName}/pull/${prNumber}`;
  }

  const Notification = (params) => {
    return new _Notification(params);
  }

  GitHubNotifications.Notification = Notification;
})();
