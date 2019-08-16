import React, { Component } from 'react';
import {
    StyleSheet, Text, Image, Animated, ActivityIndicator, ScrollView,
    View, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { width, height, colors } from '../../constants'
import { systemWeights } from 'react-native-typography'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import LinearGradient from 'react-native-linear-gradient'
import * as firebase from 'firebase'

console.disableYellowBox = true

export default class FeaturedScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dragonOpacity: new Animated.Value(0.7),
            isIndicator: true,
            rowWidth: new Animated.Value(width / 1.35),
            streams: null
        }
    }

    images = {
        dragonIcon: {
            path: require('../../assets/images/TestIcon.png'),
            style: {
                width: 708 / (width / 35),
                height: 1000 / (width / 35)
            }
        }
    }

    gradient = [
        '#000000',
        '#282238',
        '#24243e'
    ]

    static navigationOptions() {
        var header = null
        return { header }
    }

    increaseValue(obj, value, duration) {
        Animated.timing(obj, {
            toValue: value,
            duration: duration
        }).start()
    }

    renderHeader() {
        const { rowWidth, dragonOpacity } = this.state
        return (
            <View style={{ width: width, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <View style={{ width: width, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 50, marginTop: getStatusBarHeight() + 2.5 }}>
                        <Icon name="ios-arrow-round-back" color="white" size={45} />
                    </View>
                </TouchableOpacity>
                <Animated.Image source={this.images.dragonIcon.path} style={[this.images.dragonIcon.style, { opacity: dragonOpacity }]} />
                <Animated.View style={[styles.row, { width: rowWidth }]} />
            </View>
        )
    }

    async getFeaturedStreams() {
        // After this function is done, 'streams' are massive with featured streams,
        // item[1] of every items of this array - it's featrured streams
        var streams = null
        let returnedArray = new Array
        var userRef = firebase.auth().currentUser.uid
        await firebase.database().ref(`featured/${userRef}`).once('value', snapshot => {
            let values = snapshot.val()
            if (values != null) {
                streams = values
            }
        }).then(() => {
            let str = Object.entries(streams)
            str.map((item) => {
                returnedArray.push(item[1])
            })
            this.setState({ isIndicator: false })
            this.setState({ streams: returnedArray })
        })
        return returnedArray
    }

    async componentDidMount() {
        //Launch animations
        this.increaseValue(this.state.rowWidth, width / 1.15, 600)
        this.increaseValue(this.state.dragonOpacity, 1, 750)
    }

    render() {
        const { params = {} } = this.props.navigation.state
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent={true} />
                <LinearGradient colors={[this.gradient[0], this.gradient[1]]} style={styles.container}>
                    {this.renderHeader()}
                    {/* Debugging */}
                    <View style={{ width: width, marginTop: 15, alignItems: 'center', width: width - 30, marginTop: height / 3.25 }}>
                        <Text style={[systemWeights.thin, { color: 'white', fontSize: 24 }]}>Избранные трансляции</Text>
                    </View>
                    {/* Debugging */}
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }, row: {
        backgroundColor: 'white',
        height: 0.75,
        borderRadius: 30,
        marginTop: 17.5
    }
});
