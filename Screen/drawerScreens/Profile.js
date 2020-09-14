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
  let [schoolId, setSchoolId] = useState('');
  let [grade, setGrade] = useState('');
  let [personSection, setPersonSection] = useState('');
  let [gender, setGender] = useState('');
  let [jobType, setJobType] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  let [animating, setAnimating] = useState(true);
  let [schoolOptions, setSchoolOptions] = useState([{"schoolId": "0", "schoolName": "Select School"}]);
  let [gradeOptions, setGradeOptions] = useState([{"gradeKey": "0", "gradeName": "Select Grade"}]);
 let [sectionOptions, setSectionOptions] = useState([{"sectionKey": "0", "sectionName": "Select Section"}]);
 let [jobOptions, setJobOptions] = useState([{"jobKey": "0", "jobName": "Select JobType"}]);

  // const gradeOptions = {
  //   "0": "Select Grade",
  //   "KG1": "KG1",
  //   "KG2": "KG2",
  //   "GR1": "GR1",
  //   "GR2": "GR2",
  //   "GR3": "GR3",
  //   "GR4": "GR4",
  //   "GR5": "GR5",
  //   "GR6": "GR6",
  //   "GR7": "GR7",
  //   "GR8": "GR8",
  //   "GR9": "GR9",
  //   "GR10": "GR10",
  //   "GR11": "GR11",
  //   "GR12": "GR12"
  // };
  // const personSectionOptions = {
  //   "0": "Select Section",
  //   "A": "A",
  //   "B": "B",
  //   "C": "C",
  //   "D": "D"

  // };
  const genderOptions = {
    "0": "Select Gender",
    "Male": "Male",
    "Female": "Female"
  };
  // const jobTypeOptions = {
  //   "0": "Select JobType",
  //   "Student": "Student",
  //   "Teacher": "Teacher",
  //   "Staff": "Staff"
  // };


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
        fetchPersonSection();
        fetchGrade();
        fetchJob();
        fetchSchool();

        
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
          setSchoolId(response.data.schoolId);
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
    if (!validateEmail(personEmail)) {
      alert('Invalid Email Format');
      return;
    }

    if (!personPassword) {
      alert('Please fill Password');
      return;
    }

    if (!schoolId || schoolId.trim() == '0') {
      alert('Please select School');
      return;
    }
    if (!grade || grade.trim() == '0') {
      alert('Please select Grade');
      return;
    }
    if (!personSection || personSection.trim() == '0') {
      alert('Please Select Section');
      return;
    }
    console.log('gender ' + gender);
    if (!gender || gender.trim() == '0') {
      console.log('gender ' + gender);
      alert('Please select Gender');
      return;
    }
    if (!jobType || jobType.trim() == '0') {
      alert('Please select JobType');
      return;
    }
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
            AsyncStorage.setItem('person_id', personId);
            AsyncStorage.setItem('person_password', personPassword);
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
  //----------------------------------------------



  const fetchPersonSection = () => {
    setErrortext('');

    //Show Loader
    setLoading(true);

    var apiBaseUrl = serverIP + "/master/getSection";

    var self = this;
    var payload =
    {

    }

    // console.log('School Find ' + JSON.stringify(payload));
    axios.get(apiBaseUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    })
      //axios.post(apiBaseUrl, payload)
      .then(function (response) {
        setLoading(false);
        console.log('PersonSection Find Response ' + JSON.stringify(response));
        if (response.status == 200) {
          // console.log(response.data.status);
          console.log(JSON.stringify(response.data));
          // setPersonId(response.data.personId);
         // schoolOptions= [];
          setSectionOptions(response.data);
          console.log('PersonSection array' + JSON.stringify(sectionOptions));

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






  const fetchGrade = () => {
    setErrortext('');

    //Show Loader
    setLoading(true);

    var apiBaseUrl = serverIP + "/master/getGrade";

    var self = this;
    var payload =
    {

    }

    // console.log('School Find ' + JSON.stringify(payload));
    axios.get(apiBaseUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    })
      //axios.post(apiBaseUrl, payload)
      .then(function (response) {
        setLoading(false);
        console.log('Grade Find Response ' + JSON.stringify(response));
        if (response.status == 200) {
          // console.log(response.data.status);
          console.log(JSON.stringify(response.data));
          // setPersonId(response.data.personId);
         // schoolOptions= [];
          setGradeOptions(response.data);
          console.log('Grade array' + JSON.stringify(gradeOptions));

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





  const fetchJob = () => {
    setErrortext('');

    //Show Loader
    setLoading(true);

    var apiBaseUrl = serverIP + "/master/getJob";

    var self = this;
    var payload =
    {

    }

    // console.log('School Find ' + JSON.stringify(payload));
    axios.get(apiBaseUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    })
      //axios.post(apiBaseUrl, payload)
      .then(function (response) {
        setLoading(false);
        console.log('Job Find Response ' + JSON.stringify(response));
        if (response.status == 200) {
          // console.log(response.data.status);
          console.log(JSON.stringify(response.data));
          // setPersonId(response.data.personId);
         // schoolOptions= [];
          setJobOptions(response.data);
          console.log('Job array' + JSON.stringify(jobOptions));

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






  const fetchSchool = () => {
    setErrortext('');

    //Show Loader
    setLoading(true);

    var apiBaseUrl = serverIP + "/master/getSchool";

    var self = this;
    var payload =
    {

    }

    // console.log('School Find ' + JSON.stringify(payload));
    axios.get(apiBaseUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      }
    })
      //axios.post(apiBaseUrl, payload)
      .then(function (response) {
        setLoading(false);
        console.log('School Find Response ' + JSON.stringify(response));
        if (response.status == 200) {
          // console.log(response.data.status);
          console.log(JSON.stringify(response.data));
          // setPersonId(response.data.personId);
         // schoolOptions= [];
          setSchoolOptions(response.data);
          console.log('school array' + JSON.stringify(schoolOptions));

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
  //---------------------------------------------
  const validateEmail = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      // this.setState({ email: text })
      setPersonEmail(text)
      return false;
    }
    else {
      // this.setState({ email: text })
      setPersonEmail(text)
      console.log("Email is Correct");
      return true;
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.textInput}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={personId => setPersonId(personId.replace(/\s/g, ''))}
            value={personId}
            placeholder="Enter Id"
            maxLength={20}
            multiline={false}
            placeholderTextColor="black"
            selectionColor='#808B96'
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false} 
            selectTextOnFocus={false}

          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={PersonName => setPersonName(PersonName)}
              value={personName}
              placeholder="Enter Name"
              maxLength={100}
              multiline={false}
              placeholderTextColor="black"
              selectionColor='#808B96'
              autoCapitalize="sentences"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={()=>{this.personEmailTI.focus();}}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
             ref={(input)=>{this.personEmailTI=input;}}
              style={styles.inputStyle}
              onChangeText={personEmail => validateEmail(personEmail)}
              value={personEmail}
              placeholder="Enter Email"
              maxLength={100}
              multiline={false}
              placeholderTextColor="black"
              selectionColor='#808B96'
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
              onSubmitEditing={()=>{this.personPasswordTI.focus();}}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
            ref={(input)=>{this.personPasswordTI=input;}}
              style={styles.inputStyle}
              onChangeText={personPassword => setPersonPassword(personPassword.replace(/\s/g, ''))}
              value={personPassword}
              placeholder="Enter Password"
              maxLength={15}
              multiline={false}
              placeholderTextColor="black"
              selectionColor='#808B96'
              returnKeyType="next"
              blurOnSubmit={false}
              secureTextEntry={true}
              onSubmitEditing={Keyboard.dismiss}
            />
  
          </View>
      
          <View>
            <Picker
              selectedValue={schoolId}
              style={styles.pickerStyle}
              itemStyle={styles.pickerItemStyle}
              enabled={false}
              onValueChange={(itemValue, itemIndex) =>
                setSchoolId(itemValue)
              }>
              {schoolOptions.map((item,key) => {
                return (<Picker.Item label={item.schoolName} value={item.schoolId} key={key} />) //if you have a bunch of keys value pair
              })}
            </Picker>
          </View>
          <View>
            <Picker
              selectedValue={grade}
              style={styles.pickerStyle}
              itemStyle={styles.pickerItemStyle}
              onValueChange={(itemValue, itemIndex) =>
                setGrade(itemValue)
              }>
              {gradeOptions.map((item,key) => {
                return (<Picker.Item label={item.gradeName} value={item.gradeKey} key={key} />) //if you have a bunch of keys value pair
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
              {sectionOptions.map((item,key) => {
                return (<Picker.Item label={item.sectionName} value={item.sectionKey} key={key} />) //if you have a bunch of keys value pair
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
              {jobOptions.map((item,key) => {
                return (<Picker.Item label={item.jobName} value={item.jobKey} key={key} />) //if you have a bunch of keys value pair
              })}
            </Picker>
          </View>
          {/* <View>
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

          {/* <View>
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
          </View> */}

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



