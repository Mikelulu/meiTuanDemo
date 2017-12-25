
import React, {PureComponent} from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
} from 'react-native'
import {screenW} from "../../utils/ScreenUtil";

class OrderMenuItem extends PureComponent {

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Image source={this.props.iconRoute} style={styles.imageStyle}/>
                <Text style={styles.titleStyle}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: screenW / 4,
        height: screenW / 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
   imageStyle: {
       width: 30,
       height: 30,
       margin: 5,
   },
   titleStyle: {
       fontSize: 14,
       color: '#777777'
   }
});
export default OrderMenuItem