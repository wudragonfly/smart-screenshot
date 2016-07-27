import React, {
    Component
} from 'react';
import {
    StyleSheet,
} from 'react-native';

export default styles = StyleSheet.create({
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
    },
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
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor:'#00000070',
        textAlign: 'center',
        paddingTop: 16,
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
    },
    footerView: {
        top: -100,
        height: 70,
    }
});