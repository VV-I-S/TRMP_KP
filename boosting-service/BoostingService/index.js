/**
 * @format
 */

import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import axios from 'axios'
axios.defaults.baseURL = 'http://192.168.1.140:8080/api/'

AppRegistry.registerComponent(appName, () => App)
