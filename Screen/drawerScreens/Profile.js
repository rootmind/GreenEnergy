/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
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
import Loader from '../Components/Loader';
import { set } from 'react-native-reanimated';
import { serverIP } from '../../app.json';
import { Picker } from '@react-native-community/picker';

const Profile = props => {
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

  let [animating, setAnimating] = useState(true);

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
  const personSectionOptions = {
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


  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('person_id').then((value) => {
        // alert('value'+ value);
        // setPersonId(value);
        fetchPersonInfo(value);
      }

      );
    }, 1);
  }, []);


  const fetchPersonInfo = (props) => {
    setErrortext('');

    //Show Loader
    setLoading(true);

    //alert('personId'+ props);
    var apiBaseUrl = serverIP + "/person/find";
    //var apiBaseUrl = "http://192.168.1.3:9093/person/find";
    // var apiBaseUrl = "http://192.168.43.235:9093/person/find";

    var payload =
    {
      "personId": props
    }
    console.log('Profile Find ' + JSON.stringify(payload));
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
        console.log('Profile Find Response ' + JSON.stringify(response));
        if (response.status == 200) {
          console.log(response.data.status);
          console.log(response.data.personName);
          setPersonId(response.data.personId);
          setPersonName(response.data.personName);
          setPersonEmail(response.data.personEmail);
          setPersonPassword(response.data.personPassword);
          setGrade(response.data.grade);
          setPersonSection(response.data.personSection);
          setGender(response.data.gender);
          // setPersonStatus(response.data.personStatus);
          setJobType(response.data.jobType);
        }

        else {
          //console.log("Username does not exists");
          alert("Query Not Successful");
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });



  };



  const handleSubmitButton = (props) => {
    setErrortext('');

    //Show Loader
    setLoading(true);

    //alert('personId'+ props);
    var apiBaseUrl = serverIP + "/person/update";
    //var apiBaseUrl = "http://192.168.1.3:9093/person/update";
    // var apiBaseUrl = "http://192.168.43.235:9093/person/update";
    var payload =
    {
      "personId": personId,
      "personName": personName,
      "personEmail": personEmail,
      "personPassword": personPassword,
      "grade": grade,
      "personSection": personSection,
      "gender": gender,
      "jobType": jobType
    }
    console.log(' Payload ' + JSON.stringify(payload));
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
          console.log(response.data.status);
          if (response.data.status == 'STS005') {

            alert("Update Successful");

          }
          else {
            alert("Update Not Successful");

          }
          //  setPersonId(response.data.personId);
          //  setPersonName(response.data.personName);
          //  setPersonEmail(response.data.personEmail);
          //  setPersonPassword(response.data.personPassword);
          //  setGrade(response.data.grade);
          //  setPersonSection(response.data.personSection);
          //  setGender(response.data.gender);
          //  setPersonStatus(response.data.personStatus);
          //  setJobType(response.data.jobType);




        }

        else {
          //console.log("Username does not exists");
          alert("HTTP Response Failed");
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
        alert("Unable To Reach Server");
      });

  };


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.textInput}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={personId => setPersonId(personId)}
            value={personId}
            placeholder="Enter Id"
            placeholderTextColor="black"
            selectionColor='#808B96'
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false} selectTextOnFocus={false}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={PersonName => setPersonName(PersonName)}
              value={personName}
              placeholder="Enter Name"
              placeholderTextColor="black"
              selectionColor='#808B96'
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personEmail => setPersonEmail(personEmail)}
              value={personEmail}
              placeholder="Enter Email"
              placeholderTextColor="black"
              selectionColor='#808B96'
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personPassword => setPersonPassword(personPassword)}
              value={personPassword}
              placeholder="Enter Password"
              placeholderTextColor="black"
              selectionColor='#808B96'
              returnKeyType="next"
              blurOnSubmit={false}
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

          <View>
            <Picker
              selectedValue={personSection}
              style={styles.pickerStyle}
              itemStyle={styles.pickerItemStyle}
              onValueChange={(itemValue, itemIndex) =>
                setPersonSection(itemValue)
              }>
              {Object.keys(personSectionOptions).map((key) => {
                return (<Picker.Item label={personSectionOptions[key]} value={key} key={key} />) //if you have a bunch of keys value pair
              })}
            </Picker>
          </View>

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
            <Text style={styles.buttonTextStyle}>UPDATE</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default Profile;

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



