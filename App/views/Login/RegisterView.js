
import React, { PureComponent } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native'

class RegisterView extends PureComponent {

    static navigationOptions = {
        headerTitle: '注册',
        // headerStyle: {backgroundColor: '#06C1AE'}
    };
    phoneTextInput=null;
    passwordTextInput=null;
    rePasswordTextInput=null;
    codeTextInput=null;

    constructor(props) {
        super(props);
        this.state = {

        };
        /*绑定this*/
        this.onPhoneChangeText = this.onPhoneChangeText.bind(this);
        this.onPasswordChangeText = this.onPasswordChangeText.bind(this);
        this.onRePasswordChangeText = this.onRePasswordChangeText.bind(this);
        this.onCodeChangeText = this.onCodeChangeText.bind(this);
        this.getCode = this.getCode.bind(this);
        this.register = this.register.bind(this);
    }

    render() {
        return(
            <View style={{backgroundColor: 'white', flex: 1}}>
                <View style={styles.container}>
                    <TextInput
                        ref = {(phoneTextInput) => {this.phoneTextInput = phoneTextInput}}
                        style={styles.textInputStyle}
                        placeholder = '手机号'
                        keyboardType = 'numeric'
                        clearButtonMode = 'always'
                        underlineColorAndroid = 'transparent'
                        onChangeText={(text) => this.onPhoneChangeText(text)}
                    />
                    <View style={{height: 2, backgroundColor: '#f3f3f3'}}/>
                    <TextInput
                        ref = {(passwordTextInput) => {this.passwordTextInput = passwordTextInput}}
                        style={styles.textInputStyle}
                        placeholder = '密码'
                        clearButtonMode = 'always'
                        secureTextEntry = {true}
                        underlineColorAndroid = 'transparent'
                        onChangeText={(text) => this.onPasswordChangeText(text)}
                    />
                    <View style={{height: 2, backgroundColor: '#f3f3f3'}}/>
                    <TextInput
                        ref = {(rePasswordTextInput) => {this.rePasswordTextInput = rePasswordTextInput}}
                        style={styles.textInputStyle}
                        placeholder = '确认密码'
                        clearButtonMode = 'always'
                        secureTextEntry = {true}
                        underlineColorAndroid = 'transparent'
                        onChangeText={(text) => this.onRePasswordChangeText(text)}
                    />
                    <View style={{height: 2, backgroundColor: '#f3f3f3'}}/>

                    <View style={{flexDirection: 'row'}}>
                        <TextInput
                            ref = {(codeTextInput) => {this.codeTextInput = codeTextInput}}
                            style={[styles.textInputStyle, {flex: 1}]}
                            placeholder = '短信验证码'
                            keyboardType = 'numeric'
                            clearButtonMode = 'always'
                            underlineColorAndroid = 'transparent'
                            onChangeText={(text) => this.onCodeChangeText(text)}
                        />
                        <TouchableOpacity style={styles.codeBtnStyle} onPress={this.getCode}>
                            <Text style={{fontSize: 15, color: 'white'}}>获取验证码</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 2, backgroundColor: '#f3f3f3'}}/>

                    <TouchableOpacity style={styles.registerBtnStyle} onPress={this.register}>
                        <Text style={{fontSize: 15, color: '#06C1AE'}}>注册</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    /*手机号输入*/
    onPhoneChangeText(text) {
        console.log(text);
    }
    /*密码输入*/
    onPasswordChangeText(text) {
        console.log(text);
    }
    /*确认密码输入*/
    onRePasswordChangeText(text) {

    }
    /*验证吗输入*/
    onCodeChangeText(text) {

    }
    /*获取验证码*/
    getCode() {
        alert('获取验证码')
    }
    /*注册*/
    register() {
        alert('注册')
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
    codeBtnStyle: {
        height: 45,
        width: 90,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#06C1AE',
        marginTop: 15,
        borderRadius: 5,
    },
    registerBtnStyle: {
        height: 44,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#06C1AE',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
    },
});

export default RegisterView