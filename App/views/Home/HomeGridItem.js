
import React, { PureComponent } from 'react'
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Image,
} from 'react-native'
import {screenW} from "../../utils/ScreenUtil";
import Color from "../../config/Color";

class HomeGridItem extends PureComponent {

    render() {
        let info = this.props.info;

        let title = info.maintitle;
        let color = info.typeface_color;
        let subtitle = info.deputytitle;
        let imageUrl = info.imageurl.replace('w.h', '120.0');

        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <View>
                    <Text style={{color: color, fontSize: 15, fontWeight: 'bold', marginBottom: 10}}>{title}</Text>
                    <Text style={{color: '#222222', fontSize: 14}}>{subtitle}</Text>
                </View>
                <Image style={{height: screenW/5, width: screenW/5}} source={{uri: imageUrl}}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenW / 2 - 1,
        height: screenW / 4,
        borderBottomWidth: 1, // 设置底部和右边
        borderRightWidth: 1,
        borderColor: Color.border,
    },
    imageStyle: {
        width: screenW / 5,
        height: screenW / 5,
    }
});
export default HomeGridItem