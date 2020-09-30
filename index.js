import { AppRegistry } from 'react-native'
import { App } from './App.tsx'
import codePush from 'react-native-code-push'
import { name as appName } from './app.json'

let app = App

if (!__DEV__) {
  app = codePush({
    checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
    installMode: codePush.InstallMode.ON_NEXT_RESTART,
    mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  })(app)
}
AppRegistry.registerComponent(appName, () => app)
