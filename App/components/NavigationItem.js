

import React, { PureComponent } from 'react'
import {Text, Image, TouchableOpacity, StyleSheet} from 'react-native'

class NavigationItem extends PureComponent {
    render() {
        let image = this.props.iconName &&
            <Image style={styles.iconStyle} source={this.props.iconName}/>
        let title = this.props.titleName &&
            <Text style={[styles.titleStyle, this.props.titleStyle]}>{this.props.titleName}</Text>
        return(
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                {image}
                {title}
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: 15,
        color: '#333333',
        margin: 8
    },
    iconStyle: {
        height: 27,
        width: 27,
        margin: 8
    },
});
export default NavigationItem