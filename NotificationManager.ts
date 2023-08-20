import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';

class NotificationManager {
  configure = () => {
    PushNotification.configure({
      onRegister: function (token: any) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel', // (required)
        channelName: 'Channel', // (required)
      },
      (created: any) => console.log(`createChannel returned '${created}`),
    );
  };

  buildAndroidNotification = (
    id: number,
    title: string,
    message: string,
    data = {},
    options = {},
  ) => {
    return {
      id: id,
      autoCancel: true,
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_launcher',
      bigText: message || '',
      subText: title || '',
      vibration: 300,
      vibrate: false,
      priority: 'high',
      importance: 'high',
      data: data,
    };
  };

  cancelAllNotification = () => {
    console.log('cancel');
    PushNotification.cancelAllLocalNotifications();
  };

  showNotification = (
    id: number,
    title: string,
    message: string,
    data = {},
    options = {},
    date: Date,
  ) => {
    PushNotification.localNotificationSchedule({
      //Android
      ...this.buildAndroidNotification(id, title, message, data, options),

      // Android and iOS
      title: title || '',
      message: message || '',
      playSound: true,
      soundName: 'default',
      date: date,
    });
  };
  unregister = () => {
    PushNotification.unregister();
  };
}
export default NotificationManager;
