import React, { Component } from 'react';
import { WebView } from 'react-native'
import { width, height } from '../../constants'

console.disableYellowBox = true

export default class OpenVideo extends React.Component {

    render() {
        const { params = {} } = this.props.navigation.state
        return (
            <WebView source={{ uri: 'https://www.twitch.tv/' }} style={{ width: width, height: height }} />
        );
    }
}

