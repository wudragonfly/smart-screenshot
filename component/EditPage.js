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
    View,
    Image,
    Text,
} from 'react-native';

export default class EditPage extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.imageCount = this.props.images.length;

        this.state = {
            imagesInset: new Array(this.imageCount).fill({top:0, bottom:0})
        }
    }

    render() {
        let imageHeight = this.props.images[0].height;
        let imageWidth = this.props.images[0].width;
        let windowWidth = Dimensions.get('window').width;
        let resizeHeight = imageHeight / imageWidth * windowWidth;
        console.log(resizeHeight);

        return (
            <ScrollView style={styles.scrollView}
                        showsVerticalScrollIndicator={false}>
                {
                    this.props.images.map(function(item, index){
                        return (
                            <Image key={index} source={{uri: item.path}}
                                   style={{height: resizeHeight}} />
                        )
                    })
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#ffffee',
    },
});