
import React, { PureComponent } from 'react'
import {
    StyleSheet,
    Image,
    View,
    FlatList,
    StatusBar,
    TextInput,
    Alert
} from 'react-native'

import {screenW} from '../../utils/ScreenUtil'

import Api from '../../config/Api'
import Color from '../../config/Color'
import NavigationItem from '../../components/NavigationItem'
import GroupPurchaseCell from './GroupPurchaseCell'
import HomeHeaderView from './HomeHeaderView'


class HomeView extends PureComponent {

    // 设置navigation选项
    static navigationOptions = ({navigation}) => ({
        headerStyle: {
            backgroundColor: Color.theme
        },
        headerTitle: (
            <View style={styles.navigationBarTitleStyle}>
                <Image source={ require('../../images/Home/search_icon.png') } style={styles.searchIcon}/>
                <TextInput
                    style={styles.searchBar}
                    placeholder='蜀都冒菜'
                    onChangeText={(text) => navigation.state.params.textDidChange(text)}
                />
            </View>

        ),
        headerLeft: (
            <NavigationItem
                titleName = '上海'
                titleStyle = {{color: 'white'}}
                onPress = {() => {
                    Alert.alert(
                        '选择城市',
                        '点击了上海',
                        [ {text: '确定', onPress: () => console.log('点击了确定按钮')},
                            {text: '取消', onPress: () => console.log('点击了取消按钮')}
                        ],
                        {cancelable: true}
                    )
                }}
            />
        ),
        headerRight: (
            <NavigationItem
                iconName = {require('../../images/Home/icon_navigationItem_message_white.png')}
                onPress={() => {
                    console.log('测试');
                    alert('点击了铃铛');
                }}
            />
        )
    });

    // 构造函数
    constructor(props) {
        super(props);
        // 初始化状态
        this.state = {
            text: '', // textInput 的内容
            discounts: [],
            dataList: [],
            refreshing: false,
        };
        // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向会变为空
        // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
        this.requestData = this.requestData.bind(this);
        // this._renderItem = this._renderItem.bind(this);
        this._onCellSelected = this._onCellSelected.bind(this);
        this._onMenuSelected = this._onMenuSelected.bind(this);
        this._onGridSelcted = this._onGridSelcted.bind(this);
        this._headerView = this._headerView.bind(this);
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <GroupPurchaseCell
            info = {item}
            onPress = {this._onCellSelected}
        />
    );

    _headerView() {
        return (
            <HomeHeaderView
                menuInfos = {Api.menuInfo}
                onMenuSelected = {this._onMenuSelected}

                gridInfos = {this.state.discounts}
                onGridSelcted = {this._onGridSelcted}
            />
        )
    };

    // 点击cell
    _onCellSelected(item) {
        StatusBar.setBarStyle('default', false);
        /// 跳转到详情页面
        this.props.navigation.navigate('GroupPurchaseDetail', {info: item});
    };

    /// 点击menu的item
    _onMenuSelected(index) {
        alert(index)
    }
    /// 点击了打折的item
    _onGridSelcted(index) {
        let item = this.state.discounts[index];

        if (item.type == 1) {
            StatusBar.setBarStyle('default', true);

            let location = item.tplurl.indexOf('http'); // 返回第一次出现的指定子字符串在此字符串中的索引
            let url = item.tplurl.slice(location); // 从location位置截取到最后
            /// 跳转到webView
            this.props.navigation.navigate('webView', {url: url});
        }

    }
    // 生命周期

    // 执行一次，在初始化render之前执行，
    // 如果在这个方法内调用setState，render()知道state发生变化，并且只执行一次
    // componentWillMount() {
    //
    // }

    // 调用render()方法时，首先检查this.props和this.state返回一个子元素，
    // 子元素可以是DOM组件或者其他自定义复合控件的虚拟实现
    // render()方法是很纯净的，这就意味着不要在这个方法里初始化组件的state，
    // 每次执行时返回相同的值，不会读写DOM或者与服务器交互，如果必须如服务器交互，
    // 在componentDidMount()方法中实现或者其他生命周期的方法中实现，
    // 保持render()方法纯净使得服务器更准确，组件更简单
    render() {
        return(
            <View style={styles.container}>
                <FlatList
                    data = {this.state.dataList} // 数据
                    extraData = {this.state}//为了保证state.selected变化时，能够正确触发FlatList的更新。
                    // 如果不指定此属性，则FlatList不会触发更新，
                    // 因为它是一个PureComponent，其props在===比较中没有变化则不会触发更新。
                    renderItem = {this._renderItem} // 渲染的item
                    keyExtractor = {this._keyExtractor} // 唯一的key
                    onRefresh = {this.requestData} // 下拉刷新
                    refreshing = {this.state.refreshing} // 是否正在刷新
                    ListHeaderComponent = {this._headerView} // 头部组件

                />
            </View>
        );
    }

    _textDidChange = (text) => {
        this.setState({
            text: text,
        })
    }
    // 在初始化render之后只执行一次，在这个方法内，可以访问任何组件，
    // componentDidMount()方法中的子组件在父组件之前执行
    // 从这个函数开始，就可以和 JS 其他框架交互了，
    // 例如设置计时 setTimeout 或者 setInterval，或者发起网络请求
    componentDidMount() {
        // 请求网路
        this.requestData()

        // 给导航栏添加一个事件
        this.props.navigation.setParams({
            textDidChange: this._textDidChange,
        })
    }
    // 这个方法在初始化render时不会执行，当props或者state发生变化时执行，
    // 并且是在render之前，当新的props或者state不需要更新组件时，返回false
    // 当shouldComponentUpdate方法返回false时，
    // 将不会执行render()方法，componentWillUpdate和componentDidUpdate方法也不会被调用
    // 默认情况下，shouldComponentUpdate方法返回true防止state快速变化时的问题，
    // 但是如果·state不变，props只读，
    // 可以直接覆盖shouldComponentUpdate用于比较props和state的变化，
    // 决定UI是否更新，当组件比较多时，使用这个方法能有效提高应用性能
    // shouldComponentUpdate() {
    //     return true
    // }

    // componentWillUpdate() {
    //
    // }
    //
    // componentDidUpdate() {
    //
    // }
    // 当props发生变化时执行，初始化render时不执行，在这个回调函数里面，你可以根据属性的变化，
    // 通过调用this.setState()来更新你的组件状态，旧的属性还是可以通过this.props来获取,
    // 这里调用更新状态是安全的，并不会触发额外的render调用
    // componentWillReceiveProps() {
    //
    // }
    // 当组件要被从界面上移除的时候，就会调用componentWillUnmount(),在这个函数中，
    // 可以做一些组件相关的清理工作，例如取消计时器、网络请求等
    // componentWillUnmount() {
    //
    // }

    // 网路请求
    requestData() {
        // 改变state
        this.setState({refreshing: true});

        // 获取discount的数据
        this.requestDiscountData();
    }

    async requestDiscountData() {
        try {
            let responsData = await fetch(Api.discount);
            let responseJson = await responsData.json();
            this.setState({discounts: responseJson.data});
            console.log(responseJson);
            console.log(this.state.discounts);

            // 获取recommend的数据
            this.requestRecommendData();

        } catch(error) {
            alert(error)
        }
    }

    async requestRecommendData() {
        try {
            let responsData = await fetch(Api.recommend);
            let responsJson = await responsData.json();
            console.log(JSON.stringify(responsJson));
            let dataList = responsJson.data.map(
                (info, i) => {
                    return {
                        id: info.id,
                        imageUrl: info.squareimgurl,
                        title: info.mname,
                        subtitle: `[${info.range}]${info.title}`,
                        price: info.price,
                    }
                }
            )
            console.log(dataList);
            this.setState({
                dataList: dataList,
                refreshing: false
            });

        } catch(error) {
            alert(error);
            this.setState({
                refreshing: false
            })
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
    },
    navigationBarTitleStyle: {
        width: screenW * 0.7,
        height: 30,
        borderRadius: 19,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    searchIcon: {
        margin: 5,
        width: 20,
        height: 20,
    },
    searchBar: {
        flex: 1,
        borderRadius: 19,
        backgroundColor: 'white',
    },

    placeholder: {
        fontSize: 13,
        color: '#777777',
    },
    cellStyle: {
        height: 100,
        margin: 5,
        width: screenW,
        alignItems: 'center',
        alignSelf: 'center',
    },
});
export default HomeView