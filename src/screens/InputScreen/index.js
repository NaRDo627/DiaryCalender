import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class InputScreen extends Component{

    /*static navigationOptions = {
        header: null,
    };*/

    _saveMemo(){
        // do something
        // this.props.navigation.replace('TabNavigator')
        alert("메모가 저장되었습니다.");
        this.props.navigation.goBack(null);
    }

    render(){
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Memo 추가</Text>
                </View>
                <View style={styles.formArea}>
                    <TextInput
                        style={styles.textForm}
                        placeholder={"Input Memo"}/>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._saveMemo.bind(this)}>
                        <Text style={styles.buttonTitle}>저장</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        // justifyContent: 'center',
    },
    titleArea: {
        width: '100%',
        padding: wp('10%'),
        alignItems: 'center',
    },
    title: {
        fontSize: wp('10%'),
    },
    formArea: {
        width: '100%',
        paddingBottom: wp('10%'),
    },
    textForm: {
        borderWidth: 1,
        borderColor: '#888',
        width: '100%',
        height: hp('50%'),
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
    },
    buttonArea: {
        width: '100%',
        height: hp('5%'),
    },
    button: {
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
    },
})
