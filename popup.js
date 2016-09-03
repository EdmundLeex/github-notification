(() => {
  const GitHubNotifications = chrome.extension.getBackgroundPage().GitHubNotifications;

  function createNotificationNode(notification) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('row');

    let titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = notification.subject.title;

    itemDiv.appendChild(titleDiv);

    return itemDiv;
  }

  function renderPopup() {
    const notifications = GitHubNotifications.cache.notifications;
    const divNotifications = document.getElementById('notifications');
    
    if (notifications) {
      renderNotifications(notifications);
    } else {
      renderSpinner();
    }
  }

  function renderNotifications(notifications) {
    notifications.forEach(notification => {
      let itemDiv = createNotificationNode(notification);
      divNotifications.appendChild(itemDiv);
    });
  }

  function renderSpinner() {
    
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderPopup();
  });
})();

// https://github.com/WhitehawkVentures/ProductsSite/pull/817#discussion_r73454892
// "https://api.github.com/repos/WhitehawkVentures/ProductsSite/pulls/846"