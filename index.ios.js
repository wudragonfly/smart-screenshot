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
import HomePage from './component/HomePage';
import EditPage from './component/EditPage';
import PreviewPage from './component/PreviewPage';


class SmartScreenshot extends Component {
  onPreviewPressed = () => {
    Actions.preview();
  };

  onSavePressed = () => {
    alert("saved!");
  };

  backToHome = () => {
    alert("back to home");
    Actions.pop();
  };

  backToEdit = () => {
    alert("back to edit");
    Actions.pop();
  }

  render() {
    return (
        <Router>
          <Scene key="root">
            <Scene key="home" component={HomePage} hideNavBar={true} initial={true}
            />
            <Scene key="edit" component={EditPage} hideNavBar={false} title="Edit"
                   backTitle="Home"
                   onBack={this.backToHome}
                   rightTitle="Preview"
                   onRight={this.onPreviewPressed}
                   sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}
            />
            <Scene key="preview" component={PreviewPage} hideNavBar={false} title="Preview"
                   backTitle="Edit"
                   onBack={this.backToEdit}
                   rightTitle="Save"
                   onRight={this.onSavePressed}
                   sceneStyle={{paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight}}
            />
          </Scene>
        </Router>
    );
  }
}

AppRegistry.registerComponent('SmartScreenshot', () => SmartScreenshot);
