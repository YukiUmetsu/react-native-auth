import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import {Button, Card, CardSection} from "./common";
import {Input} from "./common/Input";
import {Spinner} from "./common/Spinner";

export default class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false,
    };

    onButtonPress(){
        this.setState({error: '', loading: true});
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(()=>{
                firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }

    onLoginSuccess(){
        this.setState({
            error: '',
            loading: false,
            email: '',
            password: '',
        });
    }

    onLoginFail(){
        this.setState({ error: 'Authentication Failed', loading: false });
    }

    renderButton(){
        if(this.state.loading){
            return <Spinner size="small" />
        }
        return <Button
            onPress={this.onButtonPress.bind(this)}
        >Log in</Button>
    }

    render(){
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        value={this.state.email}
                        placeHolder="user@gmail.com"
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        secureTextEntry={true}
                        label="Password"
                        value={this.state.password}
                        placeHolder="password"
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}


const styles = {
  errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red',
  }
};