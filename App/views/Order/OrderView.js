
import React, { PureComponent } from 'react'
import {
    Text,
    FlatList,
    StyleSheet,
    View,
    Image,
} from 'react-native'
import Color from "../../config/Color";
import Api from "../../config/Api";
import GroupPurchaseCell from '../Home/GroupPurchaseCell'
import OrderMenuItem from './OrderMenuItem'
import {screenW} from "../../utils/ScreenUtil";

class OrderView extends PureComponent {

    static navigationOptions = {
        headerTitle: '订单'
    };

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            dataSoure: []
        };

        this.requestData = this.requestData.bind(this);
        this._onCellSelected = this._onCellSelected.bind(this);
        this._listHeaderComponent = this._listHeaderComponent.bind(this);
        this._onItemSelected = this._onItemSelected.bind(this);
    }

    componentDidMount() {

        this.requestData();
    }

    async requestData() {
        this.setState({
            refreshing: true
        });

        try {
            let responsData = await fetch(Api.recommend);
            let responsJson = await responsData.json();
            console.log(JSON.stringify(responsJson));
            let dataList = responsJson.data.map((info, i) => {
                return {
                    id: info.id,
                    imageUrl: info.squareimgurl,
                    title: info.mname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price
                }
            });
            dataList.sort(() => {return 0.5 - Math.random()})
            this.setState({
                refreshing: false,
                dataSoure: dataList
            })
        } catch (error) {
            alert(error);
            console.log(error);
            this.setState({
                refreshing: false
            })
        }
    }

    _keyExtractor = (item, i) => item.id;

    _renderItem = ({item}) => {
        return (
            <GroupPurchaseCell
                info = {item}
                onPress = {this._onCellSelected}
            />
        )
    };
    _onCellSelected(item) {
        /// 跳转到详情页面
        this.props.navigation.navigate('GroupPurchaseDetail', {info: item});
    }

    _listHeaderComponent() {
        let titleArr = ['待付款', '待使用', '待评价', '退款/售后'];
        let imageArr = [
            require('../../images/Order/order_tab_need_pay.png'),
            require('../../images/Order/order_tab_need_use.png'),
            require('../../images/Order/order_tab_need_review.png'),
            require('../../images/Order/order_tab_needoffer_aftersale.png')
        ];
        let itemViews = titleArr.map((title, i) => (
            <OrderMenuItem
                title = {title}
                iconRoute = {imageArr[i]}
                key = {i}
                onPress={() => {this._onItemSelected(i)}}
            />
        ));
        return (
            <View style={{backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
                    <Text style={{fontSize: 14,}}>我的订单</Text>
                    <View style={{flex: 1}}/>
                    <Text style={{fontSize: 13, color: '#777777'}}>全部订单</Text>
                    <Image source={require('../../images/Public/cell_arrow.png')} style={{height: 15, width: 15}}/>
                </View>
                <View style={{height: 2, backgroundColor: Color.background, width: screenW}}/>
                <View style={{backgroundColor: 'white', flexDirection:'row'}}>
                    {itemViews}
                </View>
                <View style={{backgroundColor: Color.background, height: 15}}/>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 15}}>
                    <Text style={{fontSize: 14,}}>我的收藏</Text>
                    <View style={{flex: 1}}/>
                    <Text style={{fontSize: 13, color: '#777777'}}>查看全部</Text>
                    <Image source={require('../../images/Public/cell_arrow.png')} style={{height: 15, width: 15}}/>
                </View>
                <View style={{height: 2, backgroundColor: Color.background, width: screenW}}/>
            </View>

        )
    }
    _onItemSelected(index) {
        alert(index)
    }
    render() {
        return(
            <View style={styles.container}>
                <FlatList
                    data = {this.state.dataSoure}
                    extraData = {this.state}
                    keyExtractor = {this._keyExtractor}
                    renderItem = {this._renderItem}
                    refreshing={this.state.refreshing}
                    onRefresh={this.requestData}
                    ListHeaderComponent = {this._listHeaderComponent}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.background,
        flex: 1,
    },

});
export default OrderView