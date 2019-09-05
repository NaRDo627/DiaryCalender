import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity
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

 /*   static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <HeaderBar />,
            headerRight: (
                <Button
                    onPress={() => alert('This is a button!')}
                    title="Info"
                    color="#fff"
                />
            ),
            headerStyle: {
                backgroundColor: "#F0F0F0",
                height: "7%"
            }
        }
    }*/

    static navigationOptions = ({ navigation }) => {
        //return header with Custom View which will replace the original header
        return {/*
            headerTitle: (
                <View
                    style={{
                        height: 45,
                        backgroundColor: 'red',
                        justifyContent: 'center',
                        flex: 1,
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}>
                        This is Custom Header
                    </Text>
                </View>
            ),*/
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


    render(){
        return (
            <ScrollView style={styles.container}>
                <View style={styles.wrapContent}>
                    <View style={styles.content}><Text>List 1</Text></View>
                </View>
                <View style={styles.wrapContent}>
                    <View style={styles.content}><Text>List 2</Text></View>
                </View>
                <View style={styles.wrapContent}>
                    <View style={styles.content}><Text>List 3</Text></View>
                </View>
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
    }
})
