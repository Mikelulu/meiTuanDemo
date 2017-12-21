
import React, { PureComponent } from 'react'
import {
    WebView,
    TouchableOpacity,
    InteractionManager,
    StyleSheet,
    Image,
    Platform,
    BackHandler
} from 'react-native'


class MyWebView extends PureComponent {

    webView = null

    // 设置导航样式
    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.state.params.title, // 上个界面传过来的title
        headerStyle: {backgroundColor: 'white'},
        headerLeft: (
            <TouchableOpacity style={{height: 44, width: 44, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                navigation.state.params.goBackPage();
            }}>
                <Image style={{height: 44, width: 44}} source={require('.././images/back.png')}/>
            </TouchableOpacity>
        ),
    });
    /// 初始化
    constructor(props) {
        super(props);
        this.state={
            source: {},
        };
    }
    componentWillMount() {
        // 添加返回键监听(对Android原生返回键的处理)
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentDidMount() {

        this.props.navigation.setParams({ //给导航中增加监听事件
            goBackPage: this._goBackPage,
        })

        // Interactionmanager可以将一些耗时较长的工作安排到所有互动或动画完成之后再进行。这样可以保证JavaScript动画的流畅运行。
        InteractionManager.runAfterInteractions(() => {
            // ...耗时较长的同步的任务...
            this.props.navigation.setParams({title: '加载中'});
            this.setState({source: {uri: this.props.navigation.state.params.url}})
        });
    }
    render() {

        return(
            <WebView
                ref = { webView => {this.webView = webView;}}
                onNavigationStateChange={this._onNavigationStateChange}
                style={styles.webViewStyle}
                automaticallyAdjustContentInsets={false} // 禁止自动调节
                allowsInlineMediaPlayback={true} //允许播放视频
                source={this.state.source}
                scalesPageToFit={true} // 允许缩放
                onLoadStart={(evt) => this._onLoadStart(evt)} // 加载开始
                onLoad={(evt) => this._onLoad(evt)} // 加载成功
                onError={(evt) => this._onError(evt)} // 加载失败
                onLoadEnd={(evt) => this._onLoadEnd} // 加载完后
            />
        )
    }

    // 自定义返回事件
    _goBackPage = () => {
        // backButtonEnabled: false,表示webView中没有返回事件，为true则表示该webView有回退事件
        if (this.state.backButtonEnabled && this.webView) {
            this.webView.goBack();
        } else {
            this.props.navigation.goBack();
        }
    }
    /**
     * target: 809,
     canGoBack: false,
     loading: false,
     title: 'tab2',
     canGoForward: false,
     navigationType: 'click',
     url: 'a.html' }
     */
    _onNavigationStateChange = (navState) => {
        this.setState({
            backButtonEnabled: navState.canGoBack,
        })
    }

    onBackAndroid = () => {
        if (this.state.backButtonEnabled && this.webView) {
            this.webView.goBack();
            return true;
        } else {
            return false;
        }
    }
    // webView加载相关的
    _onLoadStart(evt) {
        console.log('加载开始');
    }
    _onLoad(evt) {
        console.log('加载成功');
    }
    _onError(evt) {
        console.log('加载失败');
    }
    _onLoadEnd(evt) {
        console.log('加载完成');

        if (evt.nativeEvent.title.length > 0) {
            this.props.navigation.setParams({title: evt.nativeEvent.title});
        }
    }
}
const styles = StyleSheet.create({
    webViewStyle: {
        flex: 1,
        backgroundColor: 'white',
    },
});
export default MyWebView