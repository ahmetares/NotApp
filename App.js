import React, {} from 'react';

import store from './src/store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

import Router from './src/Router';


const App = () => {
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


