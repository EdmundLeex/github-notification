(() => {
  const GitHubNotifications = chrome.extension.getBackgroundPage().GitHubNotifications;

  function renderNotifications() {
    const notifications = GitHubNotifications.cache.notifications;
    const divNotifications = document.getElementById('notifications');
    
    notifications.forEach(notification => {
      let itemDiv = document.createElement('div');
      itemDiv.classList.add('row');

      let titleDiv = document.createElement('div');
      titleDiv.classList.add('title');
      titleDiv.textContent = notification.subject.title;

      itemDiv.appendChild(titleDiv);
      divNotifications.appendChild(itemDiv);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderNotifications();
  });
})();

// https://github.com/WhitehawkVentures/ProductsSite/pull/817#discussion_r73454892
// "https://api.github.com/repos/WhitehawkVentures/ProductsSite/pulls/846"