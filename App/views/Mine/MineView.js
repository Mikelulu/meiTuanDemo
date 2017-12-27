
import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    StyleSheet,
    SectionList,
} from 'react-native'
import Color from "../../config/Color";
import NavigationItem from '../../components/NavigationItem'
import MineCell from './MineCell'

class MineView extends Component {

    static navigationOptions = {
        // header: null,
        headerStyle: {backgroundColor: Color.theme},
        headerRight: (

            <View style={{flexDirection: 'row'}}>
                <NavigationItem
                    iconName = {require('../../images/Mine/icon_navigationItem_message_white.png')}
                    onPress={() => {
                        alert('消息');
                    }}
                />
                <NavigationItem
                    iconName = {require('../../images/Mine/icon_navigationItem_set_white.png')}
                    onPress={() => {
                        alert('设置');
                    }}
                />

            </View>
        ),

    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }

        this._onCellSelected = this._onCellSelected.bind(this);

    }

    componentDidMount() {
        this.getData();
    }
    getData() {
        this.setState({
            dataSource: [
                { data: [
                    { title: '我的钱包', subtitle: '办信用卡', image: require('../../images/Mine/icon_mine_wallet.png') },
                    { title: '余额', subtitle: '￥95872385', image: require('../../images/Mine/icon_mine_balance.png') },
                    { title: '抵用券', subtitle: '63', image: require('../../images/Mine/icon_mine_voucher.png') },
                    { title: '会员卡', subtitle: '2', image: require('../../images/Mine/icon_mine_membercard.png') }
                    ],
                    title: '第一组'
                },
                { data: [
                    { title: '好友去哪', image: require('../../images/Mine/icon_mine_friends.png') },
                    { title: '我的评价', image: require('../../images/Mine/icon_mine_comment.png') },
                    { title: '我的收藏', image: require('../../images/Mine/icon_mine_collection.png') },
                    { title: '会员中心', subtitle: 'v15', image: require('../../images/Mine/icon_mine_membercenter.png') },
                    { title: '积分商城', subtitle: '好礼已上线', image: require('../../images/Mine/icon_mine_member.png') }
                    ]
                },
                { data: [
                    { title: '客服中心', image: require('../../images/Mine/icon_mine_customerService.png') },
                    { title: '关于美团', subtitle: '我要合作', image: require('../../images/Mine/icon_mine_aboutmeituan.png') }
                    ]
                },
            ]
        })
    }
    _listHeaderComponent() {
        return (
            <View style={styles.headerContain}>
                <Image source={require('../../images/Mine/avatar.png')} style={styles.headerIconStyle}/>
                <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 16, color: 'white'}}>Michale</Text>
                    <Text style={{fontSize: 14, color: 'white', marginTop: 5}}>个人信息 ></Text>
                </View>
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
        // alert('点击了' + item.title)
        this.props.navigation.navigate('minePageView');
    };

    render() {
        return(
            <View style={{backgroundColor: Color.background, flex: 1}}>
                <SectionList
                    renderItem = {this._renderItem}
                    keyExtractor = {this._keyExtractor}
                    sections = {this.state.dataSource}
                    SectionSeparatorComponent = {() => <View style={{height: 10, backgroundColor: Color.background}}/>}
                    ItemSeparatorComponent = {() => <View style={{height: 1, backgroundColor: Color.background}}/>}
                    ListHeaderComponent = {this._listHeaderComponent}
                />
            </View>
        )
    }
}

const  styles = StyleSheet.create({
    headerContain: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.theme,
        flex: 1,
        padding: 15,
    },
    headerIconStyle: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51D3C6'
    }
});
export default MineView