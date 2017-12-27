
import React, { PureComponent } from 'react'
import  {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

class MineCell extends PureComponent {

    render() {
        let item = this.props.item;
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onCellSelected(item)}>
                <Image source={item.image} style={{height: 25, width: 25}}/>
                <Text style={{fontSize: 16, color: '#222222', marginLeft: 8}}>{item.title}</Text>
                <View style={{flex:1}}/>
                <Text style={{fontSize: 14, color: '#777777', marginRight: 8}}>{item.subtitle}</Text>
                <Image source={require('../../images/Public/cell_arrow.png')} style={{height: 15, width: 15}}/>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
    }
});
export default MineCell