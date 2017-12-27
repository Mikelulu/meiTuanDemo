
import React, { PureComponent } from 'react'
import {
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
} from 'react-native'

class LoginItem extends PureComponent {

    render() {

        let imageRoute = this.props.imageRoute;
        let title = this.props.title;

        return(
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Image source={imageRoute} style={styles.imageStyle}/>
                <Text style={styles.titleStyle}>{title}</Text>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
   container: {
       backgroundColor: 'white',
       padding: 5,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center',
   },
    imageStyle: {
        width: 30,
        height: 30,
    },
    titleStyle: {
        fontSize: 15,
        color: '#777777',
        marginLeft: 5,
    }
});
export default LoginItem