(() => {
  if (window.GitHubNotifications === undefined) {
    window.GitHubNotifications = {};
  }

  let GitHubNotifications = window.GitHubNotifications;

  function _Notification(params) {
    this.title = params.subject.title;
    this.type = params.subject.type;
    this.timeStamp = params.updated_at;
    this.url = params.subject.url;
    this.repo = params.repository.name;
    this.fullName = params.repository.full_name;
    this.markRead = () => {
      console.log(this.url);
    }
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