(() => {
  const GitHubNotifications = chrome.extension.getBackgroundPage().GitHubNotifications;
  const divContainer = document.getElementById('container');
  // const spinnerDiv = document.createElement('div');
  const spinner = document.createElement('img');
  spinner.classList.add('spinner');
  spinner.src = 'loading.gif';
  // spinnerDiv.appendChild(spinner);

  let appCache = GitHubNotifications.AppCache;

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
      let itemDiv = createNotificationNode(notification);
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

  document.addEventListener('DOMContentLoaded', function() {
    renderPopup();
  });
})();

// https://github.com/WhitehawkVentures/ProductsSite/pull/817#discussion_r73454892
// "https://api.github.com/repos/WhitehawkVentures/ProductsSite/pulls/846"