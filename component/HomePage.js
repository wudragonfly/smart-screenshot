import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Image,
    View,
    Text,
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';

export default class HomePage extends Component {
    showImagePicker = () => {
        ImagePicker.openPicker({
           multiple: true
        }).done(images => {
            console.log(images);
            Actions.edit({images: images});
        });

    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.appTitle}>Smart Screenshot</Text>
                <Image style={styles.logoImage} source={require('../image/logo.png')}></Image>
                <View style={styles.iconButtonView}>
                    <Icon.Button name="image" size={24} borderRadius={24} backgroundColor="#444" onPress={this.showImagePicker}>
                        <Text style={styles.iconButtonText}>Add Photos From Library</Text>
                    </Icon.Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffee',
    },
    appTitle: {
        fontSize: 28,
        textAlign: 'center',
        margin: 10,
        color: "#777777",
    },
    logoImage: {
        margin: 50,
    },
    iconButtonView: {
        margin: 30,
    },
    iconButtonText: {
        fontFamily: 'Arial',
        fontSize: 15,
        color: 'white',
    }
});