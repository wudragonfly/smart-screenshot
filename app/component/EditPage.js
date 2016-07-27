import React, {
    Component,
    CSSPropertyOperations,
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

export default class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {images: props.images};
    }

    rightButtonPress = () => {
        Actions.preview({images:this.state.images});
    };

    leftButtonPress = () => {
        Actions.pop();
    };

    topLeftButtonPress = (index) => {
        if (this.state.images[index].topInset + this.state.images[index].bottomInset < this.state.images[index].resizeHeight) {
            this.state.images[index].topInset +=1;
            this.forceUpdate();
        }
    };

    topLeftButtonPressIn = (index) => {
        this.topLeftTimer = setInterval(() => {this.topLeftButtonPress(index);}, 120);
    };

    topLeftButtonPressOut = () => {
        clearInterval(this.topLeftTimer);
    };

    topRightButtonPress = (index) => {
        if (this.state.images[index].topInset > 0) {
            this.state.images[index].topInset -=1;
            this.forceUpdate();
        }
    };

    topRightButtonPressIn = (index) => {
        this.topRightTimer = setInterval(() => {this.topRightButtonPress(index);}, 120);
    };

    topRightButtonPressOut = () => {
        clearInterval(this.topRightTimer);
    };

    bottomLeftButtonPress = (index) => {
        if (this.state.images[index].bottomInset > 0) {
            this.state.images[index].bottomInset -=1;
            this.forceUpdate();
        }
    };

    bottomLeftButtonPressIn = (index) => {
        this.bottomLeftTimer = setInterval(() => {this.bottomLeftButtonPress(index);}, 120);
    };

    bottomLeftButtonPressOut = () => {
        clearInterval(this.bottomLeftTimer);
    };

    bottomRightButtonPress = (index) => {
        if (this.state.images[index].topInset + this.state.images[index].bottomInset < this.state.images[index].resizeHeight) {
            this.state.images[index].bottomInset +=1;
            this.forceUpdate();
        }
    };

    bottomRightButtonPressIn = (index) => {
        this.bottomRightTimer = setInterval(() => {this.bottomRightButtonPress(index);}, 80);
    };

    bottomRightButtonPressOut = () => {
        clearInterval(this.bottomRightTimer);
    };


    render() {
        let scale = Dimensions.get('window').scale;
        let imageCount = this.state.images.length;
        let imageHeight = this.state.images[0].height;
        let imageWidth = this.state.images[0].width;
        let windowWidth = Dimensions.get('window').width;
        let resizeHeight = imageHeight / imageWidth * windowWidth;
        this.state.images.map((item, index) => {
            item.resizeHeight = resizeHeight;
            item.resizeWidth = windowWidth;
            item.scale = scale;
            if (index !== 0) {
                item.topInset = item.topInset === undefined ? 92 : item.topInset;
            } else {
                item.topInset = item.topInset === undefined ? 0 : item.topInset;
            }
            if (index !== imageCount - 1) {
                item.bottomInset = item.bottomInset === undefined ? 55 : item.bottomInset;
            } else {
                item.bottomInset = item.bottomInset === undefined ? 0 : item.bottomInset;
            }
            console.log(index + ") top:" + item.topInset + ", bottom:" + item.bottomInset);
        });

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
                                <View style={[styles.icons, {height:currentWrapperHeight}]}>
                                    <View style={styles.topIcons}>
                                        <TouchableOpacity style={[styles.topLeftIcon]}
                                                          onPress={() => this.topLeftButtonPress(index)}
                                                          onPressIn={() => this.topLeftButtonPressIn(index)}
                                                          onPressOut={() => this.topLeftButtonPressOut()}>
                                            <Icon name="arrow-up" size={18} color="#ffd" style={styles.icon}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.topRightIcon]}
                                                          onPress={() => this.topRightButtonPress(index)}
                                                          onPressIn={() => this.topRightButtonPressIn(index)}
                                                          onPressOut={() => this.topRightButtonPressOut()}>
                                            <Icon name="arrow-down" size={18} color="#ffd" style={styles.icon}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.bottomIcons}>
                                        <TouchableOpacity style={[styles.bottomLeftIcon]}
                                                          onPress={() => this.bottomLeftButtonPress(index)}
                                                          onPressIn={() => this.bottomLeftButtonPressIn(index)}
                                                          onPressOut={() => this.bottomLeftButtonPressOut()}>
                                            <Icon name="arrow-down" size={18} color="#ffd" style={styles.icon}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.bottomRightIcon]}
                                                          onPress={() => this.bottomRightButtonPress(index)}
                                                          onPressIn={() => this.bottomRightButtonPressIn(index)}
                                                          onPressOut={() => this.bottomRightButtonPressOut()}>
                                            <Icon name="arrow-up" size={18} color="#ffd" style={styles.icon}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
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
                            <Icon name="eye" size={18} color="#ffd" style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    };
}