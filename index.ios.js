/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Navigator,
  View,
} from 'react-native';
import {
  Scene,
  Router,
  Actions
} from 'react-native-router-flux';
import HomePage from './app/component/HomePage';
import EditPage from './app/component/EditPage';
import PreviewPage from './app/component/PreviewPage';


class SmartScreenshot extends Component {
  render() {
    return (
        <Router>
          <Scene key="root">
            <Scene key="home" component={HomePage} hideNavBar={true} initial={true}
            />
            <Scene key="edit" component={EditPage} hideNavBar={false} title="Edit"
                   backTitle="Home"
                   onBack={Actions.home}
                   sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}
            />
            <Scene key="preview" component={PreviewPage} hideNavBar={false} title="Preview"
                   backTitle="Edit"
                   onBack={Actions.edit}
                   sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}
            />
          </Scene>
        </Router>
    );
  }
}

AppRegistry.registerComponent('SmartScreenshot', () => SmartScreenshot);
