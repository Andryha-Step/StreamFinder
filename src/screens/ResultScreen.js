import React, { Component } from 'react'
import {
    StyleSheet, Text, Image, Animated, ActivityIndicator, ScrollView,
    View, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { width, height, colors, sizeOf } from '../../constants'
import { connect } from 'react-redux'
import { systemWeights } from 'react-native-typography'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { setTeams } from '../actions'
import LinearGradient from 'react-native-linear-gradient'
import * as firebase from 'firebase'

console.disableYellowBox = true

class ResultScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dragonOpacity: new Animated.Value(0.7),
            isIndicator: false,
            rowWidth: new Animated.Value(width / 1.35)
        }
    }

    gradient = [
        '#000000',
        '#184238',
        '#24243e'
    ]

    images = {
        dragonIcon: {
            path: require('../../assets/images/TestIcon.png'),
            style: {
                width: 708 / (width / 35),
                height: 1000 / (width / 35)
            }
        }
    }

    static navigationOptions() {
        var header = null
        return { header }
    }

    async saveStream(obj) {
        // Function get the object (stream, which was added) 
        // and set this object to featured of CURRENT user
        // link is REQUIRED to be in obj, for detect streams
        var isStream = false
        var userRef = firebase.auth().currentUser.uid
        await firebase.database().ref(`featured/${userRef}`).once('value', snapshot => {
            values = snapshot.val()
            if (values != null) {
                Object.entries(values).map((item) => {
                    if (item[1].link == obj.link) {
                        isStream = true
                    }
                })
            }
        })
        if (!isStream) {
            try {
                firebase.database().ref(`featured/${userRef}`).push(obj)
            } catch (error) {
                console.log(error)
            }
        }
    }

    increaseValue(obj, value, duration) {
        Animated.timing(obj, {
            toValue: value,
            duration: duration
        }).start()
    }

    componentDidMount() {
        //Launch animations 
        this.increaseValue(this.state.rowWidth, width / 1.15, 600)
        this.increaseValue(this.state.dragonOpacity, 1, 750)
        //Get params from previous components
        this.props.navigation.setParams({
            nameFirstTeam: this.props.navigation.state.params.nameFirstTeam,
            nameSecondTeam: this.props.navigation.state.params.nameSecondTeam
        });
    }

    renderFeatured() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-end', marginRight: 2.5, marginBottom: 23.45 }}>
                <View style={{ width: width, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FeaturedScreen')}>
                        <Icon name="md-heart" color="white" size={40} style={{ marginRight: 30 }} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    renderHeader() {
        const { rowWidth, dragonOpacity } = this.state
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('InputScreen')}>
                    <View style={{ width: width, flexDirection: 'row', justifyContent: 'flex-start', marginLeft: 50, marginTop: getStatusBarHeight() + 2.5 }}>
                        <Icon name="ios-arrow-round-back" color="white" size={45} />
                    </View>
                </TouchableOpacity>
                <Animated.Image source={this.images.dragonIcon.path} style={[this.images.dragonIcon.style, { opacity: dragonOpacity }]} />
                <Animated.View style={[styles.row, { width: rowWidth }]} />
            </View>
        )
    }

    render() {
        const { params = {} } = this.props.navigation.state
        const { firstTeam, secondTeam } = this.props
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent={true} />
                <LinearGradient colors={[this.gradient[0], this.gradient[1]]} style={styles.container}>
                    {this.renderHeader()}
                    {/* Debugging */}
                    <View style={{ width: width, marginTop: 15, alignItems: 'center', width: width - 30, marginTop: height / 4 }}>
                        <Text style={[systemWeights.thin, { color: 'white', fontSize: 25 }]}>Для отладки</Text>
                        <Text style={[systemWeights.thin, { color: 'white', fontSize: 16, marginTop: 25 }]}>Первая команда: {firstTeam}</Text>
                        <Text style={[systemWeights.thin, { color: 'white', fontSize: 16, marginTop: 25 }]}>Вторая команда: {secondTeam}</Text>
                    </View>
                    {/* Debugging */}
                    {this.renderFeatured()}
                </LinearGradient>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        firstTeam: state.search.firstTeam,
        secondTeam: state.search.secondTeam
    }
}

export default connect(mapStateToProps, { setTeams })(ResultScreen)

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
