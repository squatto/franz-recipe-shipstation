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
      unread = parseInt(
        contains('#workflow span.tray-display-name', 'Awaiting Shipment')[0]
          .parentElement
          .querySelector('.status-count')
          .innerText
          .replace(',', ''),
        10,
      );
    } catch (e) {
      // unable to find order count
    }

    Franz.setBadge(parseInt(unread, 10));
  };

  Franz.loop(getMessages);
};
