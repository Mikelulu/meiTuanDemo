
import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet
} from 'react-native'
import Color from '../config/Color'

export default class SpaceView extends PureComponent {

    render() {
        return (
            <View style={styles.container}/>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        height: 15,
        backgroundColor: Color.background,
    }
});