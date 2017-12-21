
import React, { PureComponent } from 'react'
import {ScrollView, View, StyleSheet} from 'react-native'

import HomeMenuItem from './HomeMenuItem'
import {screenW} from "../../utils/ScreenUtil";
import PageControl from '../../components/PageControl'
import Color from "../../config/Color";

class HomeMenuView extends PureComponent {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            currentPage: 0,
        };
    }
    render() {

        let {menuInfos, onMenuSelected} = this.props;
        console.log(menuInfos);

        // 装有HomeMenuItem的数组
        let menuItems = menuInfos.map(
            (info, i) => (
                <HomeMenuItem
                    iconRoute = {info.icon}
                    titleName = {info.title}
                    onPress = {() => {
                        onMenuSelected && onMenuSelected(i)
                    }}
                    key = {i}// 唯一标示
                />
            )
        );
        // 定义一个页面数组  将menuItems的子元素10个一组
        let pageViews = [];

        // 页面数量  ceil() 方法执行的是向上取整计算，它返回的是大于或等于函数参数，并且与之最接近的整数
        let pageCount = Math.ceil(menuItems.length / 10);

        for (let i = 0; i < pageCount; i++) {
            // 从已有的数组中返回选定的元素 slice该方法并不会修改数组，而是返回一个子数组
            let items = menuItems.slice(i * 10, i * 10 + 10);

            let menuView = (
                <View style={styles.itemsView} key={i}>
                    {items}
                </View>
            );
            // 将menuView装进pageViews数组
            pageViews.push(menuView)
        }

        return (
            <View style={styles.container}>
                {/*contentContainerStyle会应用到一个内层的内容容器上，所有的子视图都会包裹在内容容器内*/}
                <ScrollView contentContainerStyle={styles.contentContainerStyle}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true}
                            scrollEventThrottle={200}
                            onScroll={(event) => this._onScroll(event)}>

                    {pageViews}
                    {/*<View style={styles.scrollerStyle}>*/}
                        {/*{pageViews}*/}
                    {/*</View>*/}

                </ScrollView>
                <PageControl
                    numberOfPages={pageCount}
                    style={styles.pageControlStyle}
                    hidesForSinglePage={true}
                    currentPage={this.state.currentPage}
                    pageIndicatorTintColor={'gray'}
                    currentPageIndicatorTintColor={Color.theme}
                    indicatorSize={{width: 8, height: 8}}
                />
            </View>
        )
    }

    _onScroll(event) {
        // scrollerView 水平偏移的值
        let x = event.nativeEvent.contentOffset.x;
        // 四舍五入计算出当前页面
        let currentPage = Math.round(x / screenW);

        console.log(x);
        console.log(currentPage);

        if (this.state.currentPage != currentPage) {
            this.setState({currentPage: currentPage})
        }
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    itemsView: {
        width: screenW,
        flexDirection: 'row', // 水平排列
        flexWrap: 'wrap', // flexWrap属性规定flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。。
    },
    scrollerStyle: {
        flexDirection: 'row',
    },
    contentContainerStyle: {
        // paddingVertical: 10;
    },
    pageControlStyle: {
        margin: 10,
    }

});
export default HomeMenuView