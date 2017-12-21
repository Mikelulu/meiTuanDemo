/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

/**
 * PureComponent非常适合于不变的组件，尤其是和数据、业务无关的纯展示组件，因为它的节省了大量比较的工作。
 * 可以减少不必要的 render操作的次数，从而提高性能。
 * 但是对于大部分的业务来说，界面很少会有不变的组件，所以使用的场景会比较少，但是如果遇到，请尽情使用！
 *
 */

import React, { PureComponent } from 'react';
import {
    StatusBar
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom
} from 'react-navigation'

import HomeView from '../views/Home/HomeView'
import NearbyView from '../views/Nearby/NearbyView'
import OrderView from '../views/Order/OrderView'
import MineView from '../views/Mine/MineView'
import GroupPurchaseDetail from '../views/Home/GroupPurchaseDetail'
import MyWebView from '../components/MyWebView'

import TabBarItem from '../components/TabBarItem'
import Color from '../config/Color'


// const声明一个只读的常量。一旦声明，常量的值就不能改变。
const TabBar = TabNavigator(
    {
        Home: {
            screen: HomeView,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '团购',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../images/tabbar/pfb_tabbar_homepage.png')}
                        selectedImage={require('../images/tabbar/pfb_tabbar_homepage_selected.png')}
                    />
                )
            }),
        },
        Nearby: {
            screen: NearbyView,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '附近',
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused = {focused}
                        tintColor = {tintColor}
                        selectedImage = {require('../images/tabbar/pfb_tabbar_merchant_selected.png')}
                        normalImage = {require('../images/tabbar/pfb_tabbar_merchant.png')}
                    />
                )
            })
        },
        Order: {
            screen: OrderView,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "订单",
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused = {focused}
                        tintColor = {tintColor}
                        selectedImage = {require('../images/tabbar/pfb_tabbar_order_selected.png')}
                        normalImage = {require('../images/tabbar/pfb_tabbar_order.png')}
                    />
                )
            })
        },
        Mine: {
            screen: MineView,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: "我的",
                tabBarIcon: ({focused, tintColor}) => (
                    <TabBarItem
                        focused = {focused}
                        tintColor = {tintColor}
                        selectedImage = {require('../images/tabbar/pfb_tabbar_mine_selected.png')}
                        normalImage = {require('../images/tabbar/pfb_tabbar_mine.png')}
                    />
                )
            })
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: true, // 是否允许在标签之间进行滑动
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            activeTintColor: Color.theme,
            inactiveTintColor: '#979797',
            style: { backgroundColor: '#ffffff' },
        },
    }
);
const Navigator = StackNavigator(
    {
        TabBar: {screen: TabBar},
        GroupPurchaseDetail: {screen: GroupPurchaseDetail},
        webView: {screen: MyWebView},
    },
    {
        navigationOptions: {
            headerBackTitle: null,
            headerTintColor: Color.theme,
            headerTitleStyle: {color: '#333333'}
        },
    }
);

// 定义一个数组  （首页和我的界面需要显示白色的状态栏）
const lightContentView = ['Home', 'Mine'];

// 创建一个组件
class RootView extends PureComponent {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};

        StatusBar.setBarStyle('light-content');
    }

    render() {
        return(
            <Navigator
                onNavigationStateChange={
                    (previousState, currentState) => {
                        const previousView = getCurrentRouteName(previousState);
                        const currentView = getCurrentRouteName(currentState);
                        if (previousView !== currentView) {
                            if (lightContentView.indexOf(currentView) >= 0) {
                                StatusBar.setBarStyle('light-content', true)
                            } else {
                                StatusBar.setBarStyle('dark-content', true)
                            }
                        }
                    }
                }
            />
        );
    }
}

// 获取当前的route
function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getCurrentRouteName(route)
    }
    return route.routeName;
}

export default RootView