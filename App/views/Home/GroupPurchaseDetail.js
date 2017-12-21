
import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    Image,
    Text,
    Button,
    Platform
} from 'react-native'
import Color from "../../config/Color"
import NavigationItem from '../../components/NavigationItem'
import Api from "../../config/Api";
import GroupPurchaseCell from './GroupPurchaseCell'
import {screenW} from "../../utils/ScreenUtil";

class GroupPurchaseDetail extends PureComponent {

    // 配置导航
    static navigationOptions = ({navigation}) => ({
        headerTitle: '团购详情',
        headerStyle: {backgroundColor: 'white'},
        headerRight: (
            <NavigationItem
                iconName = {require('../../images/Public/icon_navigationItem_share.png')}
                onPress={ () => {
                    alert('分享')
                }}
            />
        ),

    });
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            info: {},
            dataSource: [],
            refreshing: false,
        };

        // bind  this
        this.requsetData = this.requsetData.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
    }

    componentDidMount() {

        this.requsetData();
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <GroupPurchaseCell
            info = {item}
            onPress = {this._onCellSelected}
        />
    );

    // 点击cell
    _onCellSelected = (item) => {
        /// 跳转到详情页面
        this.props.navigation.navigate('GroupPurchaseDetail', {info: item});
    };

    _renderHeader() {
        let info = this.props.navigation.state.params.info;

        return (
            <View>
                <View>
                    <Image source={{uri: info.imageUrl.replace('w.h', '480.0')}} style={{width: screenW, height: screenW / 2}}/>
                </View>
                <View style={{backgroundColor: 'white', padding: 10, flexDirection: 'row', alignItems: 'flex-end'}} >
                    <Text style={{color: Color.theme, fontSize: 15, marginBottom: 10}}>{'￥'}</Text>
                    <Text style={{color: Color.theme, fontSize: 40}}>{info.price}</Text>
                    {/*// toFixed() 方法可把 Number 四舍五入为指定小数位数的数字*/}
                    <Text style={{color: '#777777', marginLeft: 10, fontSize: 13}}>门市价：￥{(info.price * 1.1).toFixed(0)}</Text>
                    <View style={{backgroundColor: 'white', flex: 1}}/>
                    <View style={styles.buttonStyle}>
                        <Button title='立即抢购'
                                color= {Platform.OS === 'ios' ? 'white' : Color.theme}
                                onPress={() => {
                                    alert('抢购')
                                }}
                        />
                    </View>
                </View>
                {/*// 分割线*/}
                <View style={{backgroundColor: Color.background, height: 2,}}/>
            </View>
        )
    }
    async requsetData() {

        this.setState({
           refreshing: true,
        });
        try {
            let info = this.props.navigation.state.params.info;
            let responsData = await fetch(Api.recommendUrlWithId(info.id));
            let json = await responsData.json();
            console.log(json);
            console.log(JSON.stringify(json));

            let dataList = json.data.deals.map((info, i) => {
                return {
                    id: info.id,
                    imageUrl: info.imgurl,
                    title: info.brandname,
                    subtitle: `[${info.range}]${info.title}`,
                    price: info.price,
                }
            });
            this.setState({
                refreshing: false,
                dataSource: dataList,
            })
        } catch (error) {
            this.setState({
                refreshing: false,
            });
            alert(error);
            console.log(error);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data = {this.state.dataSource}
                    extraData = {this.state}
                    keyExtractor = {this._keyExtractor}
                    renderItem = {this._renderItem}
                    onRefresh={this.requsetData}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={this._renderHeader}
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

    buttonStyle: {
        backgroundColor: Color.theme,
        // borderWidth: 1,
        // marginRight: -10,
        // borderColor: Color.theme,
        // borderRadius: 8,
    }
});

export default GroupPurchaseDetail