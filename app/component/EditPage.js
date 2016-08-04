import React, {
    Component,
    CSSPropertyOperations,
} from 'react';
import {
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
        let scale = Dimensions.get('window').scale; // screen scale, 2 for 4/4S/5/5S/6/6S, 3 for 6+/6S+
        let windowWidth = Dimensions.get('window').width; // screen width in point. 320 for 4/4S, 375 for 5/5S/6/6S, 414 for 6+/6S+
        this.state = {
            images: props.images
        }
        this.state.images.map((item) => {
            item.resizeHeight = Number.parseInt(item.height / item.width * windowWidth); // resize image height in point
            item.resizeWidth = windowWidth;
            item.scale = scale;
            item.topInsetInPoint = Number.parseInt(item.topInset * item.resizeHeight / item.height);
            item.bottomInsetInPoint = Number.parseInt(item.bottomInset * item.resizeHeight / item.height);
        });
    }

    rightButtonPress = () => {
        Actions.preview({images:this.state.images});
    };

    leftButtonPress = () => {
        Actions.pop();
    };

    // top left button event handling
    topLeftButtonPress = (index) => {
        let images = this.state.images;
        let {topInsetInPoint, bottomInsetInPoint, resizeHeight} = images[index];
        if (topInsetInPoint + bottomInsetInPoint < resizeHeight) {
            images[index].topInsetInPoint += 1;
            this.setState({
                images: images
            });
        }
    };

    topLeftButtonPressIn = (index) => {
        this.topLeftTimer = setInterval(() => {this.topLeftButtonPress(index);}, 100);
    };

    topLeftButtonPressOut = () => {
        clearInterval(this.topLeftTimer);
    };

    // top right button event handling
    topRightButtonPress = (index) => {
        let images = this.state.images;
        let {topInsetInPoint} = images[index];
        if (topInsetInPoint > 0) {
            images[index].topInsetInPoint -= 1;
            this.setState({
                images: images
            });
        }
    };

    topRightButtonPressIn = (index) => {
        this.topRightTimer = setInterval(() => {this.topRightButtonPress(index);}, 100);
    };

    topRightButtonPressOut = () => {
        clearInterval(this.topRightTimer);
    };

    // bottom left button event handling
    bottomLeftButtonPress = (index) => {
        let images = this.state.images;
        let {bottomInsetInPoint} = images[index];
        if (bottomInsetInPoint > 0) {
            images[index].bottomInsetInPoint -=1;
            this.setState({
                images: images
            });
        }
    };

    bottomLeftButtonPressIn = (index) => {
        this.bottomLeftTimer = setInterval(() => {this.bottomLeftButtonPress(index);}, 100);
    };

    bottomLeftButtonPressOut = () => {
        clearInterval(this.bottomLeftTimer);
    };

    // bottom right button event handling
    bottomRightButtonPress = (index) => {
        let images = this.state.images;
        let {topInsetInPoint, bottomInsetInPoint, resizeHeight} = images[index];
        if (topInsetInPoint + bottomInsetInPoint < resizeHeight) {
            images[index].bottomInsetInPoint +=1;
            this.setState({
                images: images
            });
        }
    };

    bottomRightButtonPressIn = (index) => {
        this.bottomRightTimer = setInterval(() => {this.bottomRightButtonPress(index);}, 100);
    };

    bottomRightButtonPressOut = () => {
        clearInterval(this.bottomRightTimer);
    };


    render() {

        return (
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Image style={styles.headerLogo} source={require('../image/logo.png')}/>
                <Text style={styles.headerText}>Smart Screenshot</Text>
                <View style={styles.contentView}>
                {
                    this.state.images.map((item, index) => {
                        let currentWrapperHeight = item.resizeHeight - item.topInsetInPoint - item.bottomInsetInPoint;
                        return (
                            <View key={index} style={[styles.imageWrapper, {height:currentWrapperHeight}]}>
                                <Image source={{uri: item.path}} style={[styles.absoluteImage, {height: item.resizeHeight, top: -item.topInsetInPoint}]}/>
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