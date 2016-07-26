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
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EditPage extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {

    }

    topLeftButtonClick = (index) => {
        this.props.images[index].topInset +=5;
        this.forceUpdate();
    };

    topRightButtonClick = (index) => {
        this.props.images[index].topInset -=5;
        this.forceUpdate();
    };

    bottomLeftButtonClick = (index) => {
        this.props.images[index].bottomInset -=5;
        this.forceUpdate();
    };

    bottomRightButtonClick = (index) => {
        this.props.images[index].bottomInset +=5;
        this.forceUpdate();
    };

    render() {
        let imageCount = this.props.images.length;
        this.props.images.map((item, index) => {
            // if (index !== 0) {
                item.topInset = item.topInset === undefined ? 20 : item.topInset;
            // }
            // if (index !== imageCount) {
                item.bottomInset = item.bottomInset === undefined ? 20 : item.bottomInset;
            // }
        });

        let imageHeight = this.props.images[0].height;
        let imageWidth = this.props.images[0].width;
        let windowWidth = Dimensions.get('window').width;
        let resizeHeight = imageHeight / imageWidth * windowWidth;

        return (
            <ScrollView style={styles.scrollView}
                        showsVerticalScrollIndicator={false}>
                <Image style={styles.headerLogo} source={require('../image/logo.png')}/>
                <Text style={styles.headerText}>Smart Screenshot</Text>
                <View style={styles.contentView}>
                {
                    this.props.images.map((item, index) => {
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
                                        <TouchableOpacity style={[styles.topLeftIcon]} onPress={() => this.topLeftButtonClick(index)}>
                                            <Icon name="arrow-up" size={18} color="#ffd" style={styles.icon}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.topRightIcon]} onPress={() => this.topRightButtonClick(index)}>
                                            <Icon name="arrow-down" size={18} color="#ffd" style={styles.icon}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.bottomIcons}>
                                        <TouchableOpacity style={[styles.bottomLeftIcon]} onPress={() => this.bottomLeftButtonClick(index)}>
                                            <Icon name="arrow-down" size={18} color="#ffd" style={styles.icon}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.bottomRightIcon]} onPress={() => this.bottomRightButtonClick(index)}>
                                            <Icon name="arrow-up" size={18} color="#ffd" style={styles.icon}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )
                    })
                }
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#ffffee',
        marginBottom: -100,
    },
    headerLogo: {
        alignSelf:'center',
        width: 40,
        height: 40,
        top: -110,
    },
    headerText: {
        textAlign: 'center',
        color: '#777777',
        fontSize: 20,
        height: 60,
        top: -100,
    },
    contentView: {
        top: -100,
    },
    icons: {
        position: 'absolute',
        top: 0,
        left:0,
        right:0,
        bottom:0,
    },
    topIcons: {
        flex: 1,
        alignSelf: 'center',
        flexDirection:'row',
        justifyContent:'center',
    },
    bottomIcons: {
        flex: 1,
        alignSelf: 'center',
        flexDirection:'row',
        justifyContent:'center',
    },
    icon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor:'#00000070',
        textAlign: 'center',
        paddingTop: 6,
    },
    topLeftIcon: {
        flex: 1,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        flexDirection:'column',
        marginTop: 10,
        marginLeft: 10,
    },
    topRightIcon: {
        flex: 1,
        alignSelf: 'flex-start',
        alignItems: 'flex-end',
        flexDirection:'column-reverse',
        marginTop: 10,
        marginRight: 10,
    },
    bottomLeftIcon: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-start',
        flexDirection:'column',
        marginBottom: 10,
        marginLeft: 10,
    },
    bottomRightIcon: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        flexDirection:'column',
        marginBottom: 10,
        marginRight: 10,
    },
    imageWrapper: {
        overflow: 'hidden'
    },
    absoluteImage: {
    }
});