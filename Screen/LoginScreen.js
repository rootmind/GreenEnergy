/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';
import axios from 'axios';
//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/Loader';
import {serverIP} from '../app.json';


const LoginScreen = props => {
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
   // var dataToSend = { user_email: userEmail, user_password: userPassword };

    // var apiBaseUrl = "http://localhost:8080/Person-0.0.1-SNAPSHOT/person/login";
    var apiBaseUrl = serverIP + ":9093/person/login";
    //var apiBaseUrl = "http://192.168.43.235:9093/person/login";
   
    console.log('apiBaseUrl ' + apiBaseUrl);
    var payload =
    {

      "personId": userEmail,
      "personPassword": userPassword
    }
    axios.post(apiBaseUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    })
    axios.post(apiBaseUrl, payload)
      .then(function (response) {
      console.log(JSON.stringify(response));
  
        setLoading(false);
        if (response.status == 200) {
         // alert(response.status);
         // alert(response.data.status);
          if (response.data.status == 'STS001') {
           // alert(response.data.status);
            console.log(response.data.message);
            alert(response.data.message);


          }
          else if (response.data.status == 'STS002') {
            console.log(response.data.message);
            alert(response.data.message);
          }
          else if (response.data.status == 'STS003') {

            console.log(response.data.message);

            AsyncStorage.setItem('person_id', response.data.personId);
            props.navigation.navigate('DrawerNavigationRoutes');

          }
          else{
            console.log(response.data.message);
            alert(response.data.message);
          }
        }
        else

        alert('Invalid HTTP Response')
      })
      .catch(function (error) {
        console.log(error);
        alert('Unable TO Reach Server');
      });
    // var formBody = [];
    // for (var key in dataToSend) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    // fetch('https://aboutreact.herokuapp.com/login.php', {
    //   method: 'POST',
    //   body: formBody,
    //   headers: {
    //     //Header Defination
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //   },
    // }).then(response => response.json())
    //   .then(responseJson => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.log(responseJson);
    //     // If server response message same as Data Matched
    //     if (responseJson.status == 1) {
    //       AsyncStorage.setItem('user_id', responseJson.data[0].user_id);
    //       console.log(responseJson.data[0].user_id);
    //       props.navigation.navigate('DrawerNavigationRoutes');
    //     } else {
    //       setErrortext('Please check your email id or password');
    //       console.log('Please check your email id or password');
    //       props.navigation.navigate('DrawerNavigationRoutes');
    //     }
    //   })
    //   .catch(error => {
    //     //Hide Loader
    //     setLoading(false);
    //     console.error(error);
    //   });
  };

  return (
    // <View style={styles.container}>
    //   <View style={styles.backgroundContainer}>
    //     <Image style={styles.bakcgroundImage} source={require('./Image/1.jpg')} />
    //   </View>
    // </View>


    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 65 }}>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={require('../Image/2.jpg')}
                style={{
                  width: '200%',
                  height: 252,
                  resizeMode: 'contain',
                  margin: -20
                }}
              />
            </View>


            <View style={styles.textInput}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserId => setUserEmail(userEmail)}
                //underlineColorAndroid="#FFFFFF"
                placeholder=" User ID" //dummy@abc.com
                //placeholderFontSize="20px"
                placeholderTextColor="#F6F6F7"
                selectionColor='red'
                autoCapitalize="none"
                // keyboardType="email-address"
                // ref={ref => {
                //   this._emailinput = ref;
                // }}
                returnKeyType="next"
                // onSubmitEditing={() =>
                //   this._passwordinput && this._passwordinput.focus()
                // }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.textInput}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                //underlineColorAndroid="#FFFFFF"
                //style={styles.placeholder}
                placeholder=" Password" //12345
                placeholderTextColor="#F6F6F7"
                selectionColor='red'
                // keyboardType="default"
                // ref={ref => {
                //   this._passwordinput = ref;
                // }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              {/* <ImageBackground source={image} style={styles.image}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </ImageBackground> */}
              <Text style={styles.buttonTextStyle}>LOGIN</Text>

            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('PersonRegister')}>
              New Here?  Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    backgroundColor: 'white',
    paddingVertical: 20
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 59,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 28,
    marginRight: 24,
    marginTop: 25,
    marginBottom: 12
  },
  buttonTextStyle: {
    color: 'black',
    paddingVertical: 15,
    fontSize: 22,
    fontWeight: 'bold'
    
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 3,
    borderRadius: 30,
    paddingVertical: 15,
    borderColor: 'blue',
    fontSize: 20

  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  textInput: {
    flex: 1,
    margin: 23,
    paddingLeft: 6,
    color: 'white',
    fontSize: 20,

  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  bakcgroundImage: {
    flex: 1,
    width: null,
    height: null
  },
  loginButton: {
    marginBottom: 40
  }

});