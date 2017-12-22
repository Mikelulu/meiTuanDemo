
import React, {PureComponent} from 'react'
import {
    View,
    StyleSheet,
    FlatList,
} from 'react-native'
import Color from "../../config/Color";
import Api from "../../config/Api";
import GroupPurchaseCell from '../Home/GroupPurchaseCell'
import NearbyHeaderView from './NearbyHeaderView'

class NearbyFlatListView extends PureComponent {

    flatListView = null;

    constructor(props) {

        super(props);

        this.state = ({
            dataSoure: [],
            refreshing: false,
            typeSelectedIndex: 0,
        });

        this.requestData = this.requestData.bind(this);
        this._onCellSelected = this._onCellSelected.bind(this);
        this._listHeaderComponent = this._listHeaderComponent.bind(this);
    }

    componentDidMount() {

        this.requestData();
    }

    async requestData() {
        this.setState({
            refreshing: true,
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
                    price: info.price,
                }
            });
            this.setState({
                dataSoure: dataList.sort(() => 0.5 - Math.random()),
                refreshing: false
            })
        } catch (error) {
            console.log(error);
            alert(error);
            this.setState({
                refreshing: false,
            });
        }
    }
    _listHeaderComponent() {

        return(
            <NearbyHeaderView
                titles={this.props.types}
                typeSelectedIndex={this.state.typeSelectedIndex}
                onTypeSelected = {(index) => {
                    if (index != this.state.typeSelectedIndex) {
                        this.setState({typeSelectedIndex:index})
                        this.requestData();
                        // this.flatListView.onRefresh();
                    }
                }}
            />
        );
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => {
        return(
            <GroupPurchaseCell
                info = {item}
                onPress = {this._onCellSelected}
            />
        );
    }

    // 点击cell
    _onCellSelected(item) {
        /// 跳转到详情页面
        this.props.navigation.navigate('GroupPurchaseDetail', {info: item});
    };
    render() {

        return(
            <View style={styles.container}>
                <FlatList
                    ref={(flatListView) => {this.flatListView = flatListView}}
                    data = {this.state.dataSoure}
                    extraData = {this.state}
                    keyExtractor = {this._keyExtractor}
                    renderItem = {this._renderItem}
                    onRefresh={this.requestData}
                    refreshing={this.state.refreshing}
                    ListHeaderComponent={this._listHeaderComponent}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.background,
    }
});
export default NearbyFlatListView