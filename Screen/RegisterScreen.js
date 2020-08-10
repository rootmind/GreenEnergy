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
import AsyncStorage from '@react-native-community/async-storage';
import { serverIP } from '../app.json';
import { Picker } from '@react-native-community/picker';

const RegisterScreen = props => {
  let [personId, setPersonId] = useState('');
  let [personName, setPersonName] = useState('');
  let [personEmail, setPersonEmail] = useState('');
  let [personPassword, setPersonPassword] = useState('');
  let [grade, setGrade] = useState('');
  let [personSection, setPersonSection] = useState('');
  let [gender, setGender] = useState('');
  let [jobType, setJobType] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const gradeOptions = {
    "0": "Select Grade",
    "KG1": "KG1",
    "KG2": "KG2",
    "GR1": "GR1",
    "GR2": "GR2",
    "GR3": "GR3",
    "GR4": "GR4",
    "GR5": "GR5",
    "GR6": "GR6",
    "GR7": "GR7",
    "GR8": "GR8",
    "GR9": "GR9",
    "GR10": "GR10",
    "GR11": "GR11",
    "GR12": "GR12"
  };
  const sectionOptions = {
    "0": "Select Section",
    "A": "A",
    "B": "B",
    "C": "C",
    "D": "D"

  };
  const genderOptions = {
    "0": "Select Gender",
    "Male": "Male",
    "Female": "Female"
  };
  const jobTypeOptions = {
    "0": "Select JobType",
    "Student": "Student",
    "Teacher": "Teacher",
    "Staff": "Staff"
  };
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
    if (!grade && grade == '0') {
      alert('Please select Grade');
      return;
    }
    if (!personSection && personSection == '0') {
      alert('Please Select Section');
      return;
    }
    console.log('gender ' + gender);
    if (!gender || gender == '0') {
      console.log('gender ' + gender);
      alert('Please select Gender');
      return;
    }
    if (!jobType || jobType == '0') {
      alert('Please select JobType');
      return;
    }
    //Show Loader
    setLoading(true);
    //---------------------------------------------------------------------------------------------------------------------

    var apiBaseUrl = serverIP + ":9093/person/insert";
    //var apiBaseUrl = "http://192.168.43.235:9093/person/insert";
    // var apiBaseUrl = "http://localhost:9093/utilization/find";
    var self = this;
    var payload =
    {
      "personId": personId,
      "personName": personName,
      "personEmail": personEmail,
      "personPassword": personPassword,
      "grade": (grade == '0' ? '' : grade),
      "personSection": (personSection == '0' ? '' : personSection),
      "gender": gender,
      "jobType": jobType

      // "email": this.state.username,
      // "password": this.state.password
    }
    axios.post(apiBaseUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    })
      //axios.post(apiBaseUrl, payload)
      .then(function (response) {
        setLoading(false);
        console.log(JSON.stringify(response));
        if (response.status == 200) {
          if (response.data.status == 'STS008') {
            console.log(response.data.message);
            // self.setState(response.data);
            AsyncStorage.setItem('person_id', response.data.personId);
            props.navigation.navigate('DrawerNavigationRoutes');
            // var uploadScreen = [];
            // uploadScreen.push(<UploadScreen appContext={self.props.appContext} />)
            // self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
          }
          else if (response.data.status == 'STS007') {

            console.log(response.data.message);
            alert(response.data.message);
          }
          else {
            console.log(response.data.message);
            alert(response.data.message);
          }
        }
        else {
          alert('Invalid HTTP Response');
        }
      }
      )
      .catch(function (error) {
        setLoading(false);
        alert('Unable To Reach Server');
        console.log(error);
      });

    //-------------------------------------------------------------------------------------------------------------------------
  };

  // if (isRegistrationSuccess) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         backgroundColor: '#307ecc',
  //         justifyContent: 'center',
  //       }}>
  //       <Text style={styles.successTextStyle}>Registration Successful</Text>
  //       <TouchableOpacity
  //         style={styles.buttonStyle}
  //         activeOpacity={0.5}
  //         onPress={() => props.navigation.navigate('LoginScreen')}>
  //         <Text style={styles.buttonTextStyle}>Login Now</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.textInput}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={personId => setPersonId(personId)}
            placeholder="Enter ID"
            placeholderTextColor="black"
            selectionColor='#808B96'
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={PersonName => setPersonName(PersonName)}
              placeholder="Enter Name"
              placeholderTextColor="black"
              selectionColor='#808B96'
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personEmail => setPersonEmail(personEmail)}
              placeholder="Enter Email"
              placeholderTextColor="black"
              selectionColor='#808B96'
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personPassword => setPersonPassword(personPassword)}
              placeholder="Enter Password"
              placeholderTextColor="black"
              selectionColor='#808B96'
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={Keyboard.dismiss}
              secureTextEntry={true}
            />
          </View>

          <View>
            <Picker
              selectedValue={grade}
              style={styles.pickerStyle}
              itemStyle={styles.pickerItemStyle}
              onValueChange={(itemValue, itemIndex) =>
                setGrade(itemValue)
              }>
              {Object.keys(gradeOptions).map((key) => {
                return (<Picker.Item label={gradeOptions[key]} value={key} key={key} />) //if you have a bunch of keys value pair
              })}
            </Picker>
          </View>

          {/* <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personSection => setPersonSection(personSection)}
              
              placeholder="Enter Section (Optional)"
              placeholderTextColor="black"
              selectionColor='#808B96'
             
              returnKeyType="next"
     
              blurOnSubmit={false}
            />
          </View> */}
          <View>
            <Picker
              selectedValue={personSection}
              style={styles.pickerStyle}
              itemStyle={styles.pickerItemStyle}
              onValueChange={(itemValue, itemIndex) =>
                setPersonSection(itemValue)
              }>
              {Object.keys(sectionOptions).map((key) => {
                return (<Picker.Item label={sectionOptions[key]} value={key} key={key} />) //if you have a bunch of keys value pair
              })}
            </Picker>
          </View>
          {/* <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={gender => setGender(gender)}
  
              placeholder="Enter Gender"
              placeholderTextColor="black"
              selectionColor='#808B96'
            
              returnKeyType="next"
       
              blurOnSubmit={false}
            />

          </View> */}
          <View>
            <Picker
              selectedValue={gender}
              style={styles.pickerStyle}
              itemStyle={styles.pickerItemStyle}
              onValueChange={(itemValue, itemIndex) =>
                setGender(itemValue)
              }>
              {Object.keys(genderOptions).map((key) => {
                return (<Picker.Item label={genderOptions[key]} value={key} key={key} />) //if you have a bunch of keys value pair
              })}
            </Picker>
          </View>

          <View>
            <Picker
              selectedValue={jobType}

              style={styles.pickerStyle}
              itemStyle={styles.pickerItemStyle}
              onValueChange={(itemValue, itemIndex) =>
                setJobType(itemValue)
              }>
              {Object.keys(jobTypeOptions).map((key) => {
                return (<Picker.Item label={jobTypeOptions[key]} value={key} key={key} />) //if you have a bunch of keys value pair
              })}
            </Picker>
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
export default RegisterScreen;

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
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 65,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 28,
    marginRight: 28,
    marginTop: 45,
    marginBottom: 12
  },
  buttonTextStyle: {
    color: 'black',
    paddingVertical: 17.35,
    paddingRight: 10,
    fontSize: 22,
    fontWeight: 'bold'
  },
  inputStyle: {
    backgroundColor: 'white',
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 30,
    paddingVertical: 17,
    marginRight: 10,
    marginTop: 14,
    marginBottom: -30,
    marginVertical: -10,
    borderColor: 'black',
    fontSize: 22
  },
  textInput: {
    flex: 1,
    margin: 23,
    paddingLeft: 6,
    color: 'black',
    fontSize: 20,
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
  pickerStyle: {

    height: 44,
    width: 350,
    alignSelf: 'center'

  },
  pickerItemStyle: {
    height: 44
  }
});