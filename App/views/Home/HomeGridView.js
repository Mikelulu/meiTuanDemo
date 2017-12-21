
import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

import  HomeGridItem from './HomeGridItem'
import Color from "../../config/Color";
import {screenW} from "../../utils/ScreenUtil";

class HomeGridView extends PureComponent {

    render() {
        let {gridInfos, onGridSelcted} =  this.props;
        console.log(gridInfos);
        return (
            <View style={styles.container}>
                {gridInfos.map((info, index) => (
                    <HomeGridItem
                        key = {index}
                        info = {info}
                        onPress = {() => {
                            onGridSelcted && onGridSelcted(index)
                        }}
                    />
                ))}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // 水平排布
        flexWrap: 'wrap', // 换行
        justifyContent: 'space-between', /* 均匀排列每个元素
                               首个元素放置于起点，末尾元素放置于终点 */
        borderTopWidth: 1, // 容器设置顶部和左边  子组件设置 底部和右边
        borderLeftWidth: 1,
        borderColor: Color.border,
        backgroundColor: 'white',
    }
});

export default HomeGridView