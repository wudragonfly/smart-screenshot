import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    CameraRoll,
    StatusBar,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    View,
    Image,
    Text,
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/Styles';
import { NativeModules } from 'react-native';
import Toast from 'react-native-root-toast';
SSImageGenerator = NativeModules.SSImageGenerator;

export default class PreviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {images: props.images};
    }

    rightButtonPress = () => {
        SSImageGenerator.generateImage(this.state.images, (result) => {
            console.log(result);
        });
        setTimeout(() => {Toast.show("Photo Successfully Saved",{
                duration: Toast.durations.LONG,
                position: -60,
            });},
        200);
    };

    leftButtonPress = () => {
        Actions.pop();
    };
    render() {
        let imageHeight = this.state.images[0].height;
        let imageWidth = this.state.images[0].width;
        let windowWidth = Dimensions.get('window').width;
        let resizeHeight = imageHeight / imageWidth * windowWidth;

        return (
            <ScrollView style={styles.scrollView}
                        showsVerticalScrollIndicator={false}>
                <Image style={styles.headerLogo} source={require('../image/logo.png')}/>
                <Text style={styles.headerText}>Smart Screenshot</Text>
                <View style={styles.contentView}>
                    {
                        this.state.images.map((item, index) => {
                            let currentWrapperHeight = resizeHeight - item.topInset - item.bottomInset;
                            let viewRef = "view" + index;
                            let imageRef = "image" + index;
                            return (
                                <View key={index}
                                      style={[styles.imageWrapper, {height:currentWrapperHeight}]}
                                      ref={viewRef}>
                                    <Image source={{uri: item.path}}
                                           style={[styles.absoluteImage, {height: resizeHeight, top: -item.topInset}]}
                                           ref={imageRef}
                                    />
                                </View>
                            )
                        })
                    }
                </View>
                <View style={styles.footerView}>
                    <View style={styles.bottomIcons}>
                        <TouchableOpacity style={[styles.bottomLeftIcon]}
                                          onPress={() => this.leftButtonPress()}>
                            <Icon name="arrow-left" size={18} color="#ffd" style={styles.icon}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.bottomRightIcon]}
                                          onPress={() => this.rightButtonPress()}>
                            <Icon name="save" size={18} color="#ffd" style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}