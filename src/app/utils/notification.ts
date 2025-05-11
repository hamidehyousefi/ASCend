import {Store, NotificationTitleMessage, NOTIFICATION_TYPE} from 'react-notifications-component'

function setNotification(
  title: NotificationTitleMessage,
  message: NotificationTitleMessage,
  type: NOTIFICATION_TYPE
) {
  Store.addNotification({
    title,
    message,
    type,
    container: 'top-left',
    insert: 'top',
    dismiss: {
      duration: 5000,
      onScreen: false,
      showIcon: false,
    },
  })
}

function success(message: NotificationTitleMessage, title?: NotificationTitleMessage) {
  setNotification(title || '', message, 'success')
}
function danger(message: NotificationTitleMessage, title?: NotificationTitleMessage) {
  setNotification(title || '', message, 'danger')
}
function warning(message: NotificationTitleMessage, title?: NotificationTitleMessage) {
  setNotification(title || '', message, 'warning')
}
function info(message: NotificationTitleMessage, title?: NotificationTitleMessage) {
  setNotification(title || '', message, 'info')
}
function show(message: NotificationTitleMessage, title?: NotificationTitleMessage) {
  setNotification(title || '', message, 'default')
}

export const notification = {success, danger, warning, info, show}
