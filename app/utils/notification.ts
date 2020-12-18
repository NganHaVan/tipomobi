/* eslint-disable */
import PushNotification from "react-native-push-notification"

export const FEEDBACK_CHANNEL = "tipomobi-feedback-channel"

export function notification(title: string, message: string, yesBtn: string, noBtn: string) {
  PushNotification.localNotification({
    channelId: FEEDBACK_CHANNEL,
    vibration: 100,
    actions: [yesBtn],
    title: title,
    message: message,
    userInfo: {},
    playSound: false,
  })
}

export function scheduledNotification(title: string, message: string, yesBtn: string, noBtn: string) {
  PushNotification.localNotificationSchedule({
    channelId: FEEDBACK_CHANNEL,
    vibration: 100,
    actions: [yesBtn],
    invokeApp: true,
    title: title,
    message: message,
    date: new Date(Date.now() + (60 * 60 * 1000)), // 1h
    allowWhileIdle: true,
  })
}
