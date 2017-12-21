
import React, { PureComponent } from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import HomeMenuView from './HomeMenuView'
import HomeGridView from './HomeGridView'
import SpaceView from '../../components/SpaceView'
import Color from "../../config/Color";

class HomeHeaderView extends PureComponent {

    render() {
        return (
            <View>
                <HomeMenuView
                    menuInfos = {this.props.menuInfos}
                    onMenuSelected = {this.props.onMenuSelected}
                />

                <SpaceView/>

                <HomeGridView
                    gridInfos = {this.props.gridInfos}
                    onGridSelcted = {this.props.onGridSelcted}
                />

                <SpaceView/>

                <View style={styles.headerViewStyle}>
                    <Text style={styles.headerTitleStyle}>{'- 猜你喜欢 -'}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerViewStyle: {
        height: 35,
        alignItems: 'center', // 水平内容居中
        justifyContent: 'center', // 竖直居中
        borderColor: Color.border,
        borderWidth: 1,
        backgroundColor: 'white',
    },
    headerTitleStyle: {
        color: '#222222',
        fontSize: 14,
    }
})
export default HomeHeaderView