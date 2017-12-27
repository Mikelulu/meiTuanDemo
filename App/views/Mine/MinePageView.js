
import React, {PureComponent} from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    SectionList,
    TouchableOpacity,
} from 'react-native'

import MineCell from './MineCell'

class MinePageView extends PureComponent {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }

        this._onCellSelected = this._onCellSelected.bind(this);
        this.login = this.login.bind(this);
        this._listHeaderComponent = this._listHeaderComponent.bind(this);
    }

    componentDidMount() {
        this.getData();
    }
    getData() {
        this.setState({
            dataSource: [
                { data: [
                    { title: '预售订单', image: require('../../images/Mine/icon_mine_wallet.png') },
                    { title: '待付款',     image: require('../../images/Mine/icon_mine_balance.png') },
                    { title: '待发货',   image: require('../../images/Mine/icon_mine_voucher.png') },
                    { title: '已发货',   image: require('../../images/Mine/icon_mine_membercard.png') },
                    { title: '待评价', image: require('../../images/Mine/icon_mine_friends.png') },
                    { title: '退款/售后', image: require('../../images/Mine/icon_mine_comment.png') }
                ],
                    title: '我的订单',
                    subtitle: '更多'
                },

                { data: [
                    { title: '在线客服', image: require('../../images/Mine/icon_mine_customerService.png') },
                    { title: '优惠券', image: require('../../images/Mine/icon_mine_aboutmeituan.png') },
                    { title: '收藏夹', image: require('../../images/Mine/icon_mine_collection.png') },
                    { title: '地址管理', image: require('../../images/Mine/icon_mine_membercenter.png') },
                    { title: '账户安全', image: require('../../images/Mine/icon_mine_member.png') },
                    { title: '帮助中心', image: require('../../images/Mine/icon_mine_member.png') }
                ],
                    title: '我的服务'
                },
            ]
        })
    }

    _listHeaderComponent() {
        return (
            <View style={styles.headerContain}>
                <Image source={require('../../images/Mine/avatar.png')} style={styles.headerIconStyle}/>
                <TouchableOpacity style={{marginLeft: 15}} onPress={this.login}>
                    <Text style={{fontSize: 17, color: 'white'}}>登录/注册</Text>
                </TouchableOpacity>
            </View>
        )
    }
    _keyExtractor = (item, index) => item.title;

    _renderItem = ({item}) => {
        console.log(item);
        return (
            <MineCell
                item = {item}
                onCellSelected = {this._onCellSelected}
            />
        )
    };
    _onCellSelected = (item) => {
        alert('点击了' + item.title)
    };

    _renderSectionHeader = ({section}) => (
        <View style={styles.secondHeaderStyle}>
            <Text style={{fontSize: 16}}> {section.title}</Text>
            <View style={{flex: 1}}/>
            <Text style={{fontSize: 15}}> {section.subtitle}</Text>
        </View>
    );


    login() {
        alert('登录')
    };

    render() {
        return(
            <View style={{backgroundColor: '#f3f3f3', flex: 1}}>
                <SectionList
                    renderItem = {this._renderItem}
                    keyExtractor = {this._keyExtractor}
                    sections = {this.state.dataSource}
                    // SectionSeparatorComponent = {() => <View style={{height: 10, backgroundColor: '#f3f3f3'}}/>}
                    ItemSeparatorComponent = {() => <View style={{height: 1, backgroundColor: '#f3f3f3'}}/>}
                    ListHeaderComponent = {this._listHeaderComponent}
                    renderSectionHeader = {this._renderSectionHeader}
                />
            </View>
        )
    }
}

const  styles = StyleSheet.create({
    headerContain: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#06C1AE',
        flex: 1,
        padding: 20,
    },
    headerIconStyle: {
        height: 70,
        width: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#51D3C6'
    },
    secondHeaderStyle: {
        flex: 1,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f3f3',
    }
});

export default MinePageView