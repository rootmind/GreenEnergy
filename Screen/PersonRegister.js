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
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Loader from './Components/Loader';

const PersonRegister = props => {
  let [personId, setPersonId] = useState('');
  let [personName, setPersonName] = useState('');
  let [personEmail, setPersonEmail] = useState('');
  let [personPassword, setPersonPassword] = useState('');
  let [grade, setGrade] = useState('');
  let [personSection, setPersonSection] = useState('');
  let [gender, setGender] = useState('');
  let [personStatus, setPersonStatus] = useState('');
  let [jobType, setJobType] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const handleSubmitButton = () => {
    setErrortext('');
    if (!personId) {
      alert('Please fill Id');
      return;
    }
    if (!personName) {
      alert('Please fill Name');
      return;
    }
    if (!personEmail) {
      alert('Please fill Email');
      return;
    }
    if (!personPassword) {
      alert('Please fill Password');
      return;
    }
    if (!grade) {
      alert('Please fill Grade');
      return;
    }
    if (!personSection) {
      alert('Please fill Section');
      return;
    }
    if (!gender) {
      alert('Please fill Gender');
      return;
    }
    if (!personStatus) {
      alert('Please fill personStatus');
      return;
    }
    if (!jobType) {
      alert('Please fill JobType');
      return;
    }
        //Show Loader
    setLoading(true);
    //---------------------------------------------------------------------------------------------------------------------
   //"http://localhost:9094/utilization/get";
   //var apiBaseUrl = "http://localhost:8080/Person-0.0.1-SNAPSHOT/person/insert";
   var apiBaseUrl = "http://192.168.0.200:9093/person/insert";
   // var apiBaseUrl = "http://localhost:9093/utilization/find";
    var self = this;
    var payload =
    {
      "personId": personId,
      "personName": personName,
      "personEmail": personEmail,
      "personPassword": personPassword,
      "grade": grade,
      "personSection": personSection,
      "gender": gender,
      "personStatus": personStatus,
      "jobType": jobType
  
      // "email": this.state.username,
      // "password": this.state.password
    }
    axios.post(apiBaseUrl, payload, {headers :{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
  }})
    //axios.post(apiBaseUrl, payload)
      .then(function (response) {
        console.log(JSON.stringify(response));
        if (response.status == 200) {
          console.log(response.data.status);
         // self.setState(response.data);
          props.navigation.navigate('DrawerNavigationRoutes');
          // var uploadScreen = [];
          // uploadScreen.push(<UploadScreen appContext={self.props.appContext} />)
          // self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
        }
        else if (response.status == 204) {
          console.log("Username password do not match");
          //alert("username password do not match")
        }
        else {
          console.log("Username does not exists");
          //alert("Username does not exist");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      //-------------------------------------------------------------------------------------------------------------------------
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/success.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../Image/aboutreact.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          />
             </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personId => setPersonId(personId)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Id"
              placeholderTextColor="#F6F6F7"
              keyboardType="email-address"
              ref={ref => {
                this._emailinput = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={PersonName => setPersonName(PersonName)}
              underlineColorAndroid="#FFFFFF"
              placeholder="Enter Name"
              placeholderTextColor="#F6F6F7"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._emailinput && this._emailinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personEmail => setPersonEmail(personEmail)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Email"
              placeholderTextColor="#F6F6F7"
              keyboardType="email-address"
              ref={ref => {
                this._emailinput = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
               </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personPassword => setPersonPassword(personPassword)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Password"
              placeholderTextColor="#F6F6F7"
              keyboardType="email-address"
              ref={ref => {
                this._emailinput = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
               </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={grade => setGrade(grade)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Grade"
              placeholderTextColor="#F6F6F7"
              keyboardType="email-address"
              ref={ref => {
                this._emailinput = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
               </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personSection => setPersonSection(personSection)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Section"
              placeholderTextColor="#F6F6F7"
              keyboardType="email-address"
              ref={ref => {
                this._emailinput = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
               </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={gender => setGender(gender)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Email"
              placeholderTextColor="#F6F6F7"
              keyboardType="email-address"
              ref={ref => {
                this._emailinput = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
            
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personStatus => setPersonStatus(personStatus)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Status"
              placeholderTextColor="#F6F6F7"
              keyboardType="email-address"
              ref={ref => {
                this._ageinput = ref;
              }}
              onSubmitEditing={() =>
                this._addressinput && this._addressinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={jobType => setJobType(jobType)}
              underlineColorAndroid="#FFFFFF"
              placeholder="Enter JobType"
              placeholderTextColor="#F6F6F7"
              autoCapitalize="sentences"
              ref={ref => {
                this._addressinput = ref;
              }}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default PersonRegister;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});