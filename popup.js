(() => {
  const GitHubNotifications = chrome.extension.getBackgroundPage().GitHubNotifications;
  const divContainer = document.getElementById('container');
  const spinner = document.createElement('img');
  spinner.classList.add('spinner');
  spinner.src = 'loading.gif';

  let appCache = GitHubNotifications.AppCache;

  function renderPopup() {
    const notifications = appCache.notifications;
    const groups = _groupNotifications(notifications);
    
    if (notifications) {
      divContainer.innerHTML = '';
      divContainer.appendChild(_groupsNode(groups));
    } else {
      renderSpinner();
    }
  }

  function renderSpinner() {
    divContainer.innerHTML = '';
    divContainer.appendChild(spinner);
  }

  function renderError() {

  }

  function _groupsNode(groups) {
    const divGroups = document.createElement('div');

    for (groupName in groups) {
      const divGroup = _groupNode(groupName, groups[groupName]);
      divGroups.appendChild(divGroup);
    }

    return divGroups;
  }

  function _groupNode(groupName, notifications) {
    const divGroup = document.createElement('div');
    const divTitle = document.createElement('div');
    divGroup.classList.add('group');
    divTitle.classList.add('group-title');
    divTitle.textContent = groupName;

    divGroup.appendChild(divTitle);
    divGroup.appendChild(_notificationsNode(notifications));

    return divGroup;
  }

  function _notificationsNode(notifications) {
    const divNotifications = document.createElement('div');
    divNotifications.classList.add('notifications');
    notifications.forEach(notification => {
      let itemDiv = _notificationItemNode(notification);
      divNotifications.appendChild(itemDiv);
    });

    return divNotifications;
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
    titleDiv.textContent = notification.title;

    return titleDiv;
  }

  function _groupNotifications(notifications) {
    let notificationsByGroup = {};
    notifications.forEach(notification => {
      const groupName = notification.fullName;
      if (notificationsByGroup[groupName] === undefined) {
        notificationsByGroup[groupName] = [];
      }

      notificationsByGroup[groupName].push(notification);
    });

    return notificationsByGroup;
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderPopup();
  });
})();

// https://github.com/WhitehawkVentures/ProductsSite/pull/817#discussion_r73454892
// "https://api.github.com/repos/WhitehawkVentures/ProductsSite/pulls/846"