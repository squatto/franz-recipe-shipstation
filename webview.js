"use strict";

module.exports = Franz => {
  const contains = function (selector, text) {
    const elements = document.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function (element) {
      return RegExp(text).test(element.textContent);
    });
  };

  const getMessages = function getMessages() {
    let unread = 0;

    try {
      // old layout
      unread += parseInt(
        contains('#workflow span.tray-display-name', 'Awaiting Shipment')[0]
          .parentElement
          .querySelector('.status-count')
          .textContent
          .replace(',', ''),
        10,
      );
      unread += parseInt(
        contains('#workflow span.tray-display-name', 'On Hold')[0]
          .parentElement
          .querySelector('.status-count')
          .textContent
          .replace(',', ''),
        10,
      );
    } catch (e) {
      // unable to find order count (it's likely not the old layout)
    }

    try {
      // new layout
      unread += parseInt(
        contains('#app-root a', 'Awaiting Shipment')[0]
          .nextSibling
          .children[0]
          .textContent
          .replace(',', ''),
        10,
      );
      unread += parseInt(
        contains('#app-root a', 'On Hold')[0]
          .nextSibling
          .children[0]
          .textContent
          .replace(',', ''),
        10,
      );
    } catch (e) {
      // unable to find order count (it's likely not the new layout)
    }

    Franz.setBadge(parseInt(unread, 10));
  };

  Franz.loop(getMessages);
};
