import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    AsyncStorage,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ScrollView} from 'react-navigation';

/*********************************************************/
// 여기서 주소 바꾸기
const SERVER_URL = 'http://192.168.0.126:5000/';
/*********************************************************/

export default class InputScreen extends Component {
    state = {
        memo: '',
        itemId: this.props.navigation.getParam('itemId', null),
    };

    _saveMemo() {
        // itemId는 현재시간
        const itemId = (this.state.itemId == null) ? new Date().getTime() : this.state.itemId;

        AsyncStorage.getItem('MemoItems', (err, value) => {
            if (err != null) {
                alert('잠시후 다시 시도해주세요.');
                return;
            }

            let memoItem = {
                memoText: this.state.memo,
            };

            let newMemoItems = JSON.parse(value);
            // const newMemoItems = { [itemId]: memoItem, ...oldMemoItems }

            // api 사용해서 통신
            fetch(SERVER_URL + 'predict', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    diary: this.state.memo,
                }),
            }).then((response) => response.json())
                .then((responseJson) => {
                    memoItem["tags"] = responseJson.tags;
                }).catch((error) => {
                console.log(error);
                memoItem["tags"] = null;
            }).finally(() => {
                if (!newMemoItems[itemId]) {
                    const oldMemoItems = newMemoItems;
                    newMemoItems = {[itemId]: memoItem, ...oldMemoItems};
                } else {
                    Object.assign(newMemoItems[itemId], memoItem);
                }

                AsyncStorage.setItem('MemoItems', JSON.stringify(newMemoItems), () => {
                    alert('메모가 저장되었습니다.');
                    this.props.navigation.goBack(null);
                });
            })
        });
    }

    _deleteMemo() {
        if (this.state.itemId == null) {
            return;
        }

        const {itemId} = this.state;

        AsyncStorage.getItem('MemoItems', (err, value) => {
            if (err != null) {
                alert('잠시후 다시 시도해주세요.');
                return;
            }
            let memoItems = JSON.parse(value);
            // const newMemoItems = { [itemId]: memoItem, ...oldMemoItems }

            delete memoItems[itemId];

            AsyncStorage.setItem('MemoItems', JSON.stringify(memoItems), () => {
                alert('메모가 삭제되었습니다.');
                this.props.navigation.goBack(null);
            });
        });
    }

    _handleInput = text => {
        this.setState({memo: text});
    };

    componentDidMount(): void {
        if (this.state.itemId == null) {
            return;
        }

        const {itemId} = this.state;

        AsyncStorage.getItem('MemoItems', (err, value) => {
            if (err != null) {
                alert('잠시후 다시 시도해주세요.');
                return;
            }
            const memoItems = JSON.parse(value);

            this.setState({
                memo: memoItems[itemId].memoText,
            });
        });
    }

    render() {
        const {navigation} = this.props;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>Diary</Text>
                </View>
                <KeyboardAvoidingView style={styles.formArea}>
                    <TextInput
                        style={styles.textForm}
                        value={this.state.memo}
                        onChangeText={this._handleInput}
                        multiline={true}
                        numberOfLines={100}
                        placeholder={'여기에 일기를 쓰세요'}/>
                </KeyboardAvoidingView>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._saveMemo.bind(this)}>
                        <Text style={styles.buttonTitle}>저장</Text>
                    </TouchableOpacity>
                </View>
                {this.state.itemId &&
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        style={{...styles.button, backgroundColor: 'red'}}
                        onPress={this._deleteMemo.bind(this)}>
                        <Text style={styles.buttonTitle}>삭제</Text>
                    </TouchableOpacity>
                </View>
                }
            </ScrollView>
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
        padding: wp('2%'),
        alignItems: 'center',
    },
    title: {
        fontSize: wp('10%'),
    },
    formArea: {
        width: '100%',
        paddingBottom: wp('5%'),
    },
    textForm: {
        borderWidth: 1,
        borderColor: '#888',
        width: '100%',
        height: hp('50%'),
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
        textAlignVertical: 'top',
    },
    buttonArea: {
        width: '100%',
        height: hp('5%'),
        marginBottom: wp('5%'),
    },
    button: {
        backgroundColor: '#46c3ad',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
    },
})
