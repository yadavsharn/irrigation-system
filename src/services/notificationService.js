import messaging from '@react-native-firebase/messaging';

async function init(){
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  console.log('FCM permission', enabled);
  const token = await messaging().getToken();
  console.log('FCM Token', token);
  messaging().onMessage(async remoteMessage => {
    console.log('FCM msg', remoteMessage);
  });
}

export default { init };