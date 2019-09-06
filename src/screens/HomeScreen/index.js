import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import InputScreen from '../InputScreen';

class HeaderBar extends Component {
    render() {
        return (
            <View style={{alignItems: "center", flex: 1}}>
                <Text style={{fontSize: 20}}>
                    My Diary Calender
                </Text>
            </View>
        )
    }
}


export default class HomeScreen extends Component{
    state = {
        memoItems: {}
    }

    static navigationOptions = ({ navigation }) => {
        //return header with Custom View which will replace the original header
        return {
            headerTitle: <HeaderBar />,
            //Heading style
            headerStyle: {
                backgroundColor: navigation.getParam('BackgroundColor', 'skyblue'),
            },
            //Heading text color
            headerTintColor: navigation.getParam('HeaderTintColor', '#fff'),
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('InputScreen')}>
                    <Text
                        style={{
                            color: 'white',
                            padding: 10
                        }}>
                        Add
                    </Text>
                </TouchableOpacity>
            ),
            headerLeft: (
                <Text>
                    &nbsp;&nbsp;
                </Text>
            )

        };
    };

    componentDidMount() {
        const { navigation } = this.props;

        // 스토리지 내용 비울려면 이 주석 제거
       // AsyncStorage.clear();
        this.loadItems();
        this.focusListener = navigation.addListener('didFocus', () => {
            this.loadItems();
        });
    }

    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
    }

    loadItems() {
        AsyncStorage.getItem("MemoItems", (err, value) => {
            if(value == null || err != null){
                AsyncStorage.setItem("MemoItems", JSON.stringify({}), () => {});
                return;
            }

            this.setState({
                memoItems: JSON.parse(value)
            })
        })
    }


    render(){
        const { memoItems } = this.state;
        const { navigation } = this.props;
        if(memoItems == null)
            return null;

        return (
            <ScrollView style={styles.container}>
                {
                    Object.keys(memoItems).map(
                        function(key) {
                            const memoPreview = (memoItems[key].memoText.length > 10)?
                                memoItems[key].memoText.replace(/\n/g, " ").substr(0, 10) + "..." : memoItems[key].memoText

                            const date = new Date(Number(key));

                            const dateString = date.toString().substr(0, 21);
                            const tagColor = (memoItems[key].tags == null)? "#F0F0F0" : (memoItems[key].tags === "good")? "#46c3ad": "#FACCCC";

                            return (
                                <View style={styles.wrapContent} key={key}>
                                    <TouchableOpacity
                                        style={{...styles.content, backgroundColor: tagColor}}
                                        onPress={() => navigation.navigate('InputScreen', { itemId: key })}>
                                        <View>
                                            <Text>{memoPreview}</Text>
                                        </View>
                                        <View>
                                            <Text style={{textAlign: "right"}}>{dateString}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    )
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        backgroundColor: 'white',
    },
    wrapContent: {
        width: wp('90%'),
        height: wp('20%'),
        paddingBottom: wp('5%'),

    },
    content: {
        width: "100%",
        height: "100%",
        backgroundColor: "#46c3ad",
        padding: wp('2%')
    }
})
