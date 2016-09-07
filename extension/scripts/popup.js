;(() => {
  const GitHubNotifications = chrome.extension.getBackgroundPage().GitHubNotifications;
  const AppCache = GitHubNotifications.AppCache;
  const Util     = GitHubNotifications.Util;
  const Settings = GitHubNotifications.Settings;

  const divContainer = document.getElementById('container');
  const spinner = document.createElement('img');
  spinner.classList.add('spinner');
  spinner.src = 'assets/images/loading.gif';

  function renderPopup() {
    const notifications = AppCache.get('notifications');

    if (Settings.get('accessToken') === '') {
      renderSetting();
    } else if (notifications) {
      renderNotifications(notifications);
    } else {
      renderSpinner();
    }
  }

  function renderNotifications(notifications) {
    const isEmpty = _isEmpty(notifications);
    let content;
    if (isEmpty) {
      content = document.createElement('div');
      content.classList.add('center');
      content.textContent = 'Congrats! You are all caught up.'
    } else {
      const groups = _groupNotifications(notifications);
      content = _groupsNode(groups);
    }
    divContainer.innerHTML = '';
    divContainer.appendChild(content);
  }

  function renderSpinner() {
    divContainer.innerHTML = '';
    divContainer.appendChild(spinner);
  }

  function renderSetting() {
    const divTitle = document.createElement('div');
    const link = document.createElement('a');
    link.text = 'Settings';
    link.classList.add('center');
    divTitle.classList.add('center');
    divTitle.textContent = 'Please click here to add your Github access token.';
    divContainer.appendChild(divTitle);
    divContainer.appendChild(link);
    link.addEventListener('click', _openSettings);
    // const optionPage = loadPage('options.html');
    // divContainer.innerHTML = optionPage;
  }

  function renderError() {

  }

  function _openSettings(e) {
    const appId = Settings.get('appId');
    const url = `chrome://extensions/?options=${appId}`;

    chrome.tabs.create({'url': url});
  }

  function _groupsNode(groups) {
    const divGroups = document.createElement('div');

    for (var groupName in groups) {
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
    itemDiv.dataset.id = notification.id;

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
    for (var id in notifications) {
      const notification = notifications[id];
      const groupName = notification.fullName;
      if (notificationsByGroup[groupName] === undefined) {
        notificationsByGroup[groupName] = [];
      }

      notificationsByGroup[groupName].push(notification);
    }

    return notificationsByGroup;
  }

  function loadPage(href) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.responseText;
  }

  function _isEmpty(notifications) {
    for (var key in notifications) {
      if (hasOwnProperty.call(notifications, key)) return false;
    }
    return true;
  }

  document.addEventListener('DOMContentLoaded', function() {
    renderPopup();
  });
})();
