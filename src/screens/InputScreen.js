import React, { Component } from 'react';
import {
    StyleSheet, Text, Image, Animated, ActivityIndicator, ScrollView,
    View, StatusBar, TextInput, TouchableOpacity, KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { width, height, colors } from '../../constants'
import { connect } from 'react-redux'
import { systemWeights } from 'react-native-typography'
import LinearGradient from 'react-native-linear-gradient'
import { setTeams } from '../actions'
import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyB62YjyGMNS2-jPkbSXqUYamu6k2BdeEXI",
    authDomain: "cyberteamfinder.firebaseapp.com",
    databaseURL: "https://cyberteamfinder.firebaseio.com",
    projectId: "cyberteamfinder",
    storageBucket: "",
    messagingSenderId: "214650377088",
    appId: "1:214650377088:web:25dce407c9293be4"
};
firebase.initializeApp(firebaseConfig);

console.disableYellowBox = true

class InputScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nameFirstTeam: null,
            nameSecondTeam: null,
            dragonOpacity: new Animated.Value(0.45),
            isIndicator: false,
            loggedIn: false
        }
    }

    gradient = [
        '#000000',
        '#182238',
        '#24243e'
    ]

    images = {
        dragonIcon: {
            path: require('../../assets/images/TestIcon.png'),
            style: {
                width: 708 / (width / 50),
                height: 1000 / (width / 50),
                marginTop: 65
            }
        }
    }

    static navigationOptions() {
        var header = null
        return { header }
    }

    increaseValue(obj) {
        Animated.timing(obj, {
            toValue: 1,
            duration: 1250
        }).start()
    }

    authorizationUser() {
        firebase.auth().signInAnonymously()
            .then(() => this.setState({ loggedIn: true }))
            .catch((e) => console.log('Error: ' + e))
    }

    findTeams() {
        const { nameFirstTeam, nameSecondTeam } = this.state
        const { movie } = this.props
        this.props.setTeams(nameFirstTeam, nameSecondTeam)
        this.setState({ isIndicator: true })
        setTimeout(() => {
            if ((nameFirstTeam && nameSecondTeam) != null
                && (nameFirstTeam && nameSecondTeam) != '')
                this.props.navigation.navigate('ResultScreen', {
                    nameFirstTeam: nameFirstTeam,
                    nameSecondTeam: nameSecondTeam,
                    movie: movie
                })
            this.setState({ isIndicator: false })
        }, 1250)
    }

    componentDidMount() {
        //Launch animation with change opacity for dragonIcon
        this.increaseValue(this.state.dragonOpacity)
        this.authorizationUser()
    }

    renderForm() {
        const { isIndicator } = this.state
        return (
            <View style={styles.form}>
                <View style={styles.input}>
                    <Icon name="ios-people" color="white" size={30} />
                    <TextInput
                        style={[systemWeights.light, styles.textInputs]}
                        onChangeText={(value) => this.setState({ nameFirstTeam: value })}
                        placeholder="Первая команда"
                        placeholderTextColor={colors.lightGray}
                        paddingLeft={12.5}
                    />
                </View>
                <Icon name="ios-swap" color="white" size={30} style={{ marginTop: 8.5, transform: [{ rotate: '90deg' }] }} />
                <View style={styles.input}>
                    <Icon name="ios-people" color="white" size={30} />
                    <TextInput
                        style={[systemWeights.light, styles.textInputs]}
                        onChangeText={(value) => this.setState({ nameSecondTeam: value })}
                        placeholder="Вторая команда"
                        placeholderTextColor={colors.lightGray}
                        paddingLeft={12.5}
                    />
                </View>
                <TouchableOpacity onPress={!isIndicator ? () => this.findTeams() : null}>
                    <View style={styles.submit}>
                        {isIndicator ?
                            <ActivityIndicator size="small" color="white" />
                            :
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}>
                                <Text style={[{ color: 'white', fontSize: 16, marginLeft: 15 }, systemWeights.regular]}>Поиск</Text>
                                <Icon name="ios-search" color="white" size={21} style={{ marginLeft: 12, marginTop: 2 }} />
                            </View>
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderFeatured() {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('FeaturedScreen')}>
                <View style={{ width: width, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Icon name="md-heart" color="white" size={40} style={{ marginRight: 30 }} />
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { dragonOpacity } = this.state
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent={true} />
                <LinearGradient colors={[this.gradient[0], this.gradient[1]]} style={styles.container}>
                    <KeyboardAvoidingView behavior="padding">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.container}>
                                <Animated.Image source={this.images.dragonIcon.path} style={[this.images.dragonIcon.style, { opacity: dragonOpacity }]} />
                                {this.renderForm()}
                                {this.renderFeatured()}
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
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

export default connect(mapStateToProps, { setTeams })(InputScreen)

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        justifyContent: 'space-around',
        alignItems: 'center'
    }, input: {
        height: 50,
        color: colors.black,
        backgroundColor: '#111729',
        marginHorizontal: 10,
        borderRadius: 17.5,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        position: 'relative',
        elevation: 10,
        width: width / 1.2,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 15,
        marginTop: 8.5,
        borderColor: 'white',
        borderWidth: 0.75
    }, form: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    }, submit: {
        height: 45,
        color: colors.black,
        backgroundColor: '#111729',
        borderRadius: 17.5,
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        position: 'relative',
        elevation: 10,
        width: width / 2.25,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: 'white',
        borderWidth: 0.75
    }, textInputs: {
        color: 'white',
        width: width / 1.45
    }
});
