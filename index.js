/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './src/components/App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader',
    'Module RCTCameraManager',
    'Module RCTCardIOUtilities',
    'Module RNFetchBlob',
]);

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
