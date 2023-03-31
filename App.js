import React, {} from 'react';
import OneSignal from 'react-native-onesignal';

import store from './src/store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

import Router from './src/Router';


const App = () => {

  OneSignal.setAppId('f99fc2fd-73fe-4af9-a6f0-8b1224c56113');
  OneSignal.promptForPushNotificationsWithUserResponse();
  /// promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
  OneSignal.promptForPushNotificationsWithUserResponse();


  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
    let notification = notificationReceivedEvent.getNotification();
    console.log("notification: ", notification);
    const data = notification.additionalData
    console.log("additionalData: ", data);
    // Complete with null means don't show a notification.
    notificationReceivedEvent.complete(notification);
  });

  //Method for handling notifications opened
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log("OneSignal: notification opened:", notification);
  });

  let persistor = persistStore( store, null, () => {
      console.log('rehydration completed!');
    },
    10000,
  ); // 10 saniye içinde yeniden oluşturma işlemi tamamlanmazsa timeout hatası verir

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;


