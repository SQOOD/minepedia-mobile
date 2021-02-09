import Reactotron from 'reactotron-react-native';
import SecureStorage from 'expo-secure-store';

import { NativeModules } from 'react-native';
import url from 'url';

const {hostname} = url.parse(NativeModules.SourceCode.scriptURL);

Reactotron
.setAsyncStorageHandler(SecureStorage)
.configure({host: hostname})  
.useReactNative()
.connect();