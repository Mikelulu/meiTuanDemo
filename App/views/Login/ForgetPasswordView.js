
import React, { PureComponent} from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native'

class ForgetPasswordView extends PureComponent {
    static navigationOptions = {
        headerTitle: '忘记密码',
        // headerStyle: {backgroundColor: '#06C1AE'}
    };
    phoneTextInput=null;
    codeTextInput=null;

    constructor(props) {
        super(props);
        this.state = {

        };
        /*绑定this*/
        this.onPhoneChangeText = this.onPhoneChangeText.bind(this);
        this.onCodeChangeText = this.onCodeChangeText.bind(this);
        this.backLogin = this.backLogin.bind(this);
        this.nextStep = this.nextStep.bind(this);
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

                    <TouchableOpacity style={styles.registerBtnStyle} onPress={this.nextStep}>
                        <Text style={{fontSize: 15, color: '#06C1AE'}}>下一步</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop: 10, padding:5}} onPress={this.backLogin}>
                        <Text style={{fontSize: 15}}>返回登录</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    /*手机号输入*/
    onPhoneChangeText(text) {
        console.log(text);
    }
    /*验证吗输入*/
    onCodeChangeText(text) {

    }
    /*获取验证码*/
    getCode() {
        alert('获取验证码')
    }
    /*下一步*/
    nextStep() {
        alert('下一步');
    }
    backLogin() {
        this.props.navigation.goBack();
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

export default ForgetPasswordView