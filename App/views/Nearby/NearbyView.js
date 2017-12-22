
import React, { PureComponent } from 'react'
import {
    Text,
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view'

import  {screenW} from "../../utils/ScreenUtil";
import Color from "../../config/Color";
import NearbyFlatListView from './NearbyFlatListView'

class NearbyView extends PureComponent {

    static navigationOptions = ({navigation}) => ({
        headerStyle: {backgroundColor: 'white'},
        headerLeft: (
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}
                              onPress={() => alert('选择位置')}>
                <Image source={require('../../images/Public/icon_food_merchant_address.png')} style={{ width: 13, height: 16 }}/>
                <Text style={{fontSize: 14, color: '#222222', marginLeft: 3}}>上海 浦东</Text>
            </TouchableOpacity>
        ),
        headerRight: (
            <TouchableOpacity style={styles.searchContain}
                              onPress={() => alert('搜索')}>
                <Image source={require('../../images/Home/search_icon.png')} style={styles.searchIcon} />
                <Text style={{fontSize: 13, color: '#777777'}}>找附近的吃喝玩乐</Text>
            </TouchableOpacity>
        ),
    });
    render() {
        let titles = ['享美食', '住酒店', '爱玩乐', '全部'];
        let types = [
            ['热门', '面包甜点', '小吃快餐', '川菜', '日本料理', '韩国料理', '台湾菜', '东北菜'],
            ['热门', '商务出行', '公寓民宿', '情侣专享', '高星特惠', '成人情趣'],
            ['热门', 'KTV', '足疗按摩', '洗浴汗蒸', '大宝剑', '电影院', '美发', '美甲'],
            []
        ];
        return(
            <ScrollableTabView style={styles.container}
                               renderTabBar={() => <DefaultTabBar/>} //Tab平分 不会滚动， ScrollableTabBar：Tab可以超过屏幕范围，滚动可以显示。
                               tabBarPosition={'top'} // 默认就是顶部
                               tabBarBackgroundColor={'white'}
                               tabBarTextStyle={{fontSize: 15, marginTop: 13}}
                               tabBarInactiveTextColor={'#555555'} // 正常状态的颜色
                               tabBarActiveTextColor={'#FE566D'}
                               tabBarUnderlineStyle={{backgroundColor: '#FE566D'}}
            >
                {titles.map((title, index) => (
                    <NearbyFlatListView
                        tabLabel={title} // 必须为tabLabel  是ScrollableTabView的子控件的一个属性
                        key={index}
                        types={types[index]}
                        navigation={this.props.navigation}
                    />
                ))}
            </ScrollableTabView>
        )
    }
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        backgroundColor: Color.background,
    },
    searchContain: {
        height: 30,
        width: screenW * 0.65,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        borderRadius: 19,
        marginRight: 20,
    },
    searchIcon: {
        height:20,
        width: 20,
        margin:5
    },

})
export default NearbyView