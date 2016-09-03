(() => {
  const GitHubNotifications = chrome.extension.getBackgroundPage().GitHubNotifications;

  function renderNotifications() {
    const notifications = GitHubNotifications.cache.notifications;
    const divNotifications = document.getElementById('notifications');
    
    notifications.forEach(notification => {
      let titleDiv = document.createElement('div');
      titleDiv.textContent = notification.subject.title;
      divNotifications.appendChild(titleDiv);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderNotifications();
  });
})();

// https://github.com/WhitehawkVentures/ProductsSite/pull/817#discussion_r73454892
// "https://api.github.com/repos/WhitehawkVentures/ProductsSite/pulls/846"