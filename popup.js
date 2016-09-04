(() => {
  const GitHubNotifications = chrome.extension.getBackgroundPage().GitHubNotifications;
  const divContainer = document.getElementById('container');
  const spinner = document.createElement('img');
  spinner.classList.add('spinner');
  spinner.src = 'loading.gif';

  let appCache = GitHubNotifications.AppCache;

  function renderPopup() {
    const notifications = appCache.notifications;
    
    if (notifications) {
      renderNotifications(notifications);
    } else {
      renderSpinner();
    }
  }

  function renderNotifications(notifications) {
    const divNotifications = document.createElement('div');
    notifications.forEach(notification => {
      let itemDiv = _notificationItemNode(notification);
      divNotifications.appendChild(itemDiv);
    });
    divContainer.innerHTML = '';
    divContainer.appendChild(divNotifications);
  }

  function renderSpinner() {
    divContainer.innerHTML = '';
    divContainer.appendChild(spinner);
  }

  function renderError() {

  }

  function _notificationItemNode(notification) {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('row');

    itemDiv.appendChild(_titleNode(notification));

    return itemDiv;
  }

  function _titleNode(notification) {
    let titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = notification.subject.title;

    return titleDiv;
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderPopup();
  });
})();

// https://github.com/WhitehawkVentures/ProductsSite/pull/817#discussion_r73454892
// "https://api.github.com/repos/WhitehawkVentures/ProductsSite/pulls/846"