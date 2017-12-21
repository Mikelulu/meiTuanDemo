
import React, { PureComponent } from 'react'
import {
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
} from 'react-native'
import {screenW} from "../../utils/ScreenUtil";

class HomeMenuItem extends PureComponent {

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Image source={this.props.iconRoute} style={styles.iconStyle} resizeMode={'contain'}/>
                <Text style={styles.titleStyle}>{this.props.titleName}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',// 竖直居中
        alignItems: 'center', // 水平居中
        width: screenW / 5,
        height: screenW / 5,
    },
    iconStyle: {
        width: screenW / 9,
        height: screenW / 9,
        margin: 5,// 内边距
    },
    titleStyle: {
        color: '#222222',
        fontSize: 14,
    },
});

export default HomeMenuItem