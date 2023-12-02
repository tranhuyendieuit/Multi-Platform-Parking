/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { registerRootComponent } from 'expo';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

AppRegistry.registerComponent('MultiPlatform', () => App);
registerRootComponent(App);
