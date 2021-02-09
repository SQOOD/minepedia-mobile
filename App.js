if (__DEV__) {
  import('./reactotron.config').then(() =>
    console.log('Reactotron Configured')
  );
}

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo';
import { Layout, ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import * as eva from '@eva-design/eva'
import 'react-native-gesture-handler'
import { t } from 'react-native-tailwindcss'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

import Route from './route'

const urlPath = 'https://localhost/api/';

const client = new ApolloClient({
  uri: urlPath,
  cache: new InMemoryCache()
});

const App = () => {
  const [ready,setReady] = useState(false)
  enableScreens();

  const _cacheResourcesAsync = async () => {
    const images = [require('@img/icon.png')]

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync()
    })
    
    return Promise.all(cacheImages)
  }

  if (ready) {
    return (
      <AppLoading
        startAsync={_cacheResourcesAsync}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    ); 
  }

  return (
    <ApolloProvider client={client}>
      <StatusBar style='auto'/>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          <Layout style={[t.mT8,t.hFull,t.flex]}>
            <Route/>
          </Layout>
        </ApplicationProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}

export default App