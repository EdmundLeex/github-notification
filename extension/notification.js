(() => {
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

  // _Notification.prototype.markRead = () => {
  //   let self = this;
  //   function _markRead() {
  //     return self.url;
  //   }
  //   return _markRead();
  // }

  const Notification = (params) => {
    return new _Notification(params);
  }

  GitHubNotifications.Notification = Notification;
})();
// https://github.com/WhitehawkVentures/ProductsSite/pull/817#discussion_r73454892
// "https://api.github.com/repos/WhitehawkVentures/ProductsSite/pulls/846"