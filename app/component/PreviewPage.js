import React, {
    Component
} from 'react';
import {
    ScrollView,
    Dimensions,
    TouchableOpacity,
    View,
    Image,
    Text,
    NativeModules
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-root-toast';
import styles from '../style/Styles';
SSImageGenerator = NativeModules.SSImageGenerator;

export default class PreviewPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: props.images
        };
    }

    rightButtonPress = () => {
        SSImageGenerator.generateImage(this.state.images, (width, height) => {
            let message;
            if (width > 0 && height > 0) {
                message = "Photo Successfully Saved";
            } else {
                message = "Failed to save photo";
            }
            Toast.show(message, {
                duration: Toast.durations.LONG,
                position: -60,
            });
        });
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
                            let currentWrapperHeight = item.resizeHeight - item.topInsetInPoint - item.bottomInsetInPoint;
                            return (
                                <View key={index} style={[styles.imageWrapper, {height:currentWrapperHeight}]}>
                                    <Image source={{uri: item.path}} style={[styles.absoluteImage, {height: item.resizeHeight, top: -item.topInsetInPoint}]}/>
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