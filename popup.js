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
      const itemDiv = _notificationItemNode(notification);
      divNotifications.appendChild(itemDiv);
    });

    return divNotifications;
  }

  function _notificationItemNode(notification) {
    const link = document.createElement('a');
    const itemDiv = document.createElement('div');
    link.href = notification.url;
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
    timeSpan.textContent = `${timeSince(notification.timeStamp)} ago`;

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

  function timeSince(date) {
    date = new Date(date);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderPopup();
  });
})();

// https://github.com/WhitehawkVentures/ProductsSite/pull/817#discussion_r73454892
// "https://api.github.com/repos/WhitehawkVentures/ProductsSite/pulls/846"