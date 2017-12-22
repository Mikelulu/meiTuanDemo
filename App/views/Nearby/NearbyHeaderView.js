
import React, {PureComponent} from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native'
import {screenW} from "../../utils/ScreenUtil";
import Color from "../../config/Color";

class NearbyHeaderView extends PureComponent {

    render() {
        return(
            <View style={styles.container}>
                {this.props.titles.map((title, i) => (
                    <TouchableOpacity
                        style={[{ backgroundColor: this.props.typeSelectedIndex == i ? '#FE566D' : 'white' }, styles.itemStyle]}
                        key={i}
                        onPress={() => this.props.onTypeSelected(i)}>
                        <Text
                            style={{color: this.props.typeSelectedIndex == i ? 'white' : '#555555'}}
                        >{title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        width: screenW / 4 -10,
        height: 30,
        borderWidth: 1,
        borderColor: Color.border,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 8,
    },
    typeStyle: {
        fontSize: 13,
        color: '#777777',
    },

});

export default NearbyHeaderView