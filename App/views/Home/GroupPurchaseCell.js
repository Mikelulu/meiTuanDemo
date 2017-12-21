
import React, { PureComponent } from 'react'
import {TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native'

import Color from '../../config/Color'


class GroupPurchaseCell extends PureComponent {

    render() {
        let info = this.props.info;
        let imageUrl = info.imageUrl.replace('w.h', '160.0');

        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(info)}>
                <Image source={{uri: imageUrl}} style={styles.imageStyle}/>

                <View style={styles.rightContainer}>
                    <Text style={styles.headerStyle}>{ info.title }</Text>
                    <Text style={styles.contentStyle} numberOfLines={0}>{info.subtitle }</Text>
                    <View style={{flex: 1, justifyContent: 'flex-end'}}>
                        <Text style={styles.priceStyle}>{info.price}元</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',// 水平排布
        padding: 10, // 内边距
        backgroundColor: 'white',
        borderColor: Color.border
    },

    imageStyle: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },

    rightContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
    },

    headerStyle: {
        color: '#222222',
        fontSize: 15,
        fontWeight: 'bold', // 设置粗体
    },

    contentStyle: {
        color: '#777777',
        fontSize: 13,
        marginTop: 8, // 外边距
    },
    priceStyle: {
        color: Color.theme,
        fontSize: 15,
        fontWeight: 'bold', // 设置粗体
    }
})
export default GroupPurchaseCell