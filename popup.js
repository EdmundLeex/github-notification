(() => {
  const GitHubNotifications = chrome.extension.getBackgroundPage().GitHubNotifications;
  const AppCache = GitHubNotifications.AppCache;
  const Util     = GitHubNotifications.Util;

  const divContainer = document.getElementById('container');
  const spinner = document.createElement('img');
  spinner.classList.add('spinner');
  spinner.src = 'loading.gif';

  function renderPopup() {
    const notifications = AppCache.notifications;
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
      const itemDiv = _notificationItemNode(notification);
      divNotifications.appendChild(itemDiv);
    });

    return divNotifications;
  }

  function _notificationItemNode(notification) {
    const link = document.createElement('a');
    const itemDiv = document.createElement('div');
    link.href = notification.url;
    link.target = '_blank';
    itemDiv.classList.add('row');

    link.appendChild(itemDiv);
    itemDiv.appendChild(_titleNode(notification));
    itemDiv.appendChild(_timeNode(notification));

    return link;
  }

  function _titleNode(notification) {
    const container = document.createElement('div');
    const titleSpan = document.createElement('span');
    container.classList.add('title');
    container.appendChild(titleSpan);
    titleSpan.textContent = notification.title;

    return container;
  }

  function _timeNode(notification) {
    const container = document.createElement('div');
    const timeSpan = document.createElement('span');
    container.classList.add('time');
    container.appendChild(timeSpan);
    timeSpan.textContent = `${Util.timeAgo(notification.timeStamp)}`;

    return container;
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
