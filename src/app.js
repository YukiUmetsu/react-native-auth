import React, { Component } from 'react';
import firebase from 'firebase';
import { View } from 'react-native';
import {Button, CardSection, Header} from "./components/common";
import LoginForm from "./components/LoginForm";
import {Spinner} from "./components/common/Spinner";


export default class App extends Component {
    state = { loggedIn: null };


    componentWillMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyAD-j62gdZoS2V7l_Aq02EK0F34s_EnXlo",
            authDomain: "react-native-auth-47b60.firebaseapp.com",
            databaseURL: "https://react-native-auth-47b60.firebaseio.com",
            projectId: "react-native-auth-47b60",
            storageBucket: "react-native-auth-47b60.appspot.com",
            messagingSenderId: "3412495172"
        });

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.setState({ loggedIn: true })
            } else {
                this.setState({ loggedIn: false })
            }
        });
    }

    renderContent() {
        switch(this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => {
                            firebase.auth().signOut();
                            this.setState({ loggedIn: false })
                        }
                        }>
                            Log Out
                        </Button>
                    </CardSection>
                );
            case false:
                return <LoginForm/>;
            default:
                return <Spinner />;
        }
    }

    render(){
        return (
            <View>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        marginTop: 10,
        flexDirection: 'row',
    }
};
