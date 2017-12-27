
import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    Button,
} from 'react-native'

import LoginItem from './LoginItem'


class LoginView extends PureComponent {

    static navigationOptions = {
        headerTitle: '登录'
    };

    userTextInput = null;
    passwordTextInput = null;

    constructor(props) {
        super(props);

        this.state = {

        };

        this.onUserChangeText = this.onUserChangeText.bind(this);
        this.onPasswordChangeText = this.onPasswordChangeText.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.forgetPassword = this.forgetPassword.bind(this);
        this.onItemSected = this.onItemSected.bind(this);
    }
    componentDidMount() {

    }
    render() {

        let otherLoginTitleArr = ['QQ', '微博',];
        let otherLoginImageArr = [
            require('../../images/Public/QQ.png'),
            require('../../images/Public/微博.png'),
        ];
        return (
            <View style={{backgroundColor: 'white', flex:1}}>
                <View style={styles.container}>
                    <TextInput
                        ref = {(userTextInput) => {this.userTextInput = userTextInput}}
                        placeholder='用户名/手机号/邮箱'
                        style={styles.textInputStyle}
                        clearButtonMode={'always'}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.onUserChangeText(text)}
                    />
                    <View style={{height: 2, backgroundColor: '#f3f3f3'}}/>
                    <TextInput
                        ref = {(passwordTextInput) => {this.passwordTextInput = passwordTextInput}}
                        placeholder='密码'
                        style={styles.textInputStyle}
                        clearButtonMode={'always'}
                        underlineColorAndroid={'transparent'}
                        secureTextEntry={true}
                        onChangeText={(text) => this.onPasswordChangeText(text)}
                    />
                    <View style={{height: 2, backgroundColor: '#f3f3f3'}}/>

                    <TouchableOpacity style={styles.loginBtnStyle} onPress={this.login}>
                        <Text style={styles.loginTextStyle}>登录</Text>
                    </TouchableOpacity>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, padding: 5}}>
                        <TouchableOpacity onPress={this.register}>
                            <Text style={{ fontSize: 14}}>快速注册</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.forgetPassword}>
                            <Text style={{ fontSize: 14}}>忘记密码</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{padding: 40,  flexDirection: 'row', justifyContent: 'space-between'}}>
                        {otherLoginTitleArr.map((title, i) => (
                            <LoginItem
                                imageRoute = {otherLoginImageArr[i]}
                                title = {title}
                                onPress = {() => this.onItemSected(i)}
                                key = {i}
                            />
                        ))}
                    </View>

                </View>
            </View>
        )
    }

    onUserChangeText(text) {

    }
    onPasswordChangeText(text) {

    }
    login() {
        alert('登录')
    }
    register() {
        this.props.navigation.navigate('registerView');
    }
    forgetPassword() {
        this.props.navigation.navigate('forgetPasswordView');
    }
    onItemSected(i) {
        alert(i);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        marginTop: 40,
    },
    textInputStyle: {
        fontSize: 17,
        height: 60,
    },
    loginBtnStyle: {
        height: 44,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#06C1AE',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
    loginTextStyle: {
        fontSize: 15,
        color: '#06C1AE'
    },
});

export default LoginView