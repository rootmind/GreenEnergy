/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
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
import { serverIP } from '../../app.json';
import { Picker } from '@react-native-community/picker';

const Utilization = props => {
  let [personId, setPersonId] = useState('');
  let [personMonth, setPersonMonth] = useState('0');
  let [personYear, setPersonYear] = useState('0');
  let [waterUtilized, setWaterUtilized] = useState('');
  let [electricityUtilized, setElectricityUtilized] = useState('');
  let [updateDate, setUpdateDate] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  let [animating, setAnimating] = useState(true);

  const personMonthOptions = {
    0: "Select Month",
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
  }

  const personYearOptions = {
    0: "Select Year",
    2020: "2020",
    2021: "2021",
    2022: "2022",
    2023: "2023",
    2024: "2024",
    2025: "2025"
  }

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('person_id').then((value) => {
        // alert('value  '+ value);
        setPersonId(value);
        //personId = value;
        // fetchPersonInfo(value);
      }

      );
    }, 1);
  }, []);

  const onPickerMonthChange=(value, index)=>{
    console.log('monthind2 ' + value);
    setPersonMonth(value);
    
  }

  useEffect(() => {
    console.log('Do something after counter has changed', personMonth);
    findByMonthYear();
 }, [personMonth]);


 const onPickerYearChange=(value, index)=>{
   console.log('year ' + value);
    setPersonYear(value);
  }

  useEffect(() => {
    console.log('Do something after counter has changed', personYear);
    findByMonthYear();
 }, [personYear]);

  const findByMonthYear = () => {
    console.log('findByMonthYear');
    setErrortext('');

    //Show Loader
    if(!personMonth || personMonth == 0){
      return;
    }
    if(!personYear || personYear == 0){
      return;
    }
    setLoading(true);

    //alert('personId'+ props);
    var apiBaseUrl = serverIP + "/utilization/findByMonthYear";
    //var apiBaseUrl = "http://192.168.1.3:9093/utilization/get";
    // var apiBaseUrl = "http://192.168.43.235:9093/utilization/get";
    var payload =
    {
      "personId": personId,
      "personMonth": personMonth,
      "personYear": personYear
    }
    console.log('Utilization findByMonthYear ' + JSON.stringify(payload));
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
        console.log('Utilization findByMonthYear ' + JSON.stringify(response));
        if (response.status == 200) {
          console.log(response.data.personMonth);
          //  console.log(response.data.personName);
          // setPersonId(response.data.personId);
          // setPersonMonth(response.data.personMonth);
          // setPersonYear(response.data.personYear);
           setWaterUtilized(response.data.waterUtilized);
           console.log(response.data.waterUtilized);
           setElectricityUtilized(response.data.electricityUtilized);
           console.log(response.data.electricityUtilized);
          // setUpdateDate(response.data.updateDate);
        }

        else {
          //console.log("Username does not exists");
          alert("Query Not Successful");
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
        //alert("Unable To Reach Server");
      });



  };

  const handleSubmitButton = () => {
    setErrortext('');
    // if (!personId) {
    //   alert('Please fill Id');
    //   return;
    // }
    if (!personMonth || personMonth == 0) {
      alert('Please fill Month');
      return;
    }
    if (!personYear || personYear == 0) {
      alert('Please fill Year');
      return;
    }
    if (!waterUtilized) {
      alert('Please fill WaterUtilized');
      return;
    }
    if (!electricityUtilized) {
      alert('Please fill ElectricityUtilized');
      return;
    }
    // if (!updateDate) {
    //   alert('Please fill UpdateDate');
    //   return;
    // }
    //Show Loader
    setLoading(true);
    //---------------------------------------------------------------------------------------------------------------------

    //var apiBaseUrl = "http://192.168.1.3:9093/utilization/insert";
    var apiBaseUrl = serverIP + "/utilization/insert";
    //var apiBaseUrl = "http://192.168.43.235:9093/utilization/insert";

    var payload =
    {
      "personId": personId,
      "personMonth": personMonth,
      "personYear": personYear,
      "waterUtilized": waterUtilized,
      "electricityUtilized": electricityUtilized
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
        console.log(JSON.stringify(response));
        setLoading(false);
        if (response.status == 200) {
          console.log(response.data.status);
          if (response.data.status == 'STS005') {
            alert(response.data.message);
            setPersonMonth('0');
            setPersonYear('0');
            setWaterUtilized('');
            setElectricityUtilized('');
            // setPersonMonth(0);
            // setPersonYear(0);
            // setWaterUtilized(0);
            // setElectricityUtilized(0);
            props.navigation.navigate('HomeScreen');
          }
          else if (response.data.status == "STS006") {
            alert(response.data.message);
          }
          else {
            alert(response.data.message);
          }
          // props.navigation.navigate('Utilization');
          // var uploadScreen = [];
          // uploadScreen.push(<UploadScreen appContext={self.props.appContext} />)
          // self.props.appContext.setState({ loginPage: [], uploadScreen: uploadScreen })
        }

        else {
          console.log("HTTP Response Failed");
          alert("HTTP Response Failed");
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
        alert("Unable To Reach Server");
      });

    //-------------------------------------------------------------------------------------------------------------------------
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.textInput}>
          <TextInput
            style={styles.inputStyle}
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

          <View style={styles.pickerInput}>
            <Picker
              selectedValue={personMonth}
              style={styles.pickerStyle}
              // style={{ height: 50, width: 150 }}
              // onValueChange={(itemValue, itemIndex) =>
              //   setPersonMonth(itemValue),() =>{findByMonthYear()}
              onValueChange={onPickerMonthChange }>
              {Object.keys(personMonthOptions).map((key) => {
                return (<Picker.Item label={personMonthOptions[key]} value={key} key={key} />)
              })}
            </Picker>
          </View>

          <View style>
            <Picker
              selectedValue={personYear}
              style={styles.pickerStyle}
              // style={{ height: 50, width: 125 }}
              // onValueChange={(itemValue, itemIndex) =>
              //   setPersonYear(itemValue),() =>{findByMonthYear()}
              onValueChange = {onPickerYearChange }>
              {Object.keys(personYearOptions).map((key) => {
                return (<Picker.Item label={personYearOptions[key]} value={key} key={key} />)
              })}
            </Picker>
          </View>
{/* 
          <View>
            <Picker
              selectedValue={personYear}
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
          </View> */}
     <View style={styles.textInput}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={electricityUtilized => setElectricityUtilized(electricityUtilized)}
              placeholder="Enter Electricity Utilized"
              maxLength={5}
              multiline={false}
              placeholderTextColor="black"
              selectionColor='#808B96'
              value={'' + electricityUtilized}
              returnKeyType="next"
              keyboardType="numeric"
              blurOnSubmit={false}
              onSubmitEditing={()=>{this.waterUtilizedTI.focus();}}
            />
          </View>

          <View style={styles.textInput}>
            <TextInput
             ref={(input)=>{this.waterUtilizedTI=input;}}
              style={styles.inputStyle}
              onChangeText={waterUtilized => setWaterUtilized(waterUtilized)}
              placeholder="Enter Water Utilized"
              maxLength={5}
              multiline={false}
              placeholderTextColor="black"
              selectionColor='#808B96'
              value={'' + waterUtilized}
              returnKeyType="next"
              keyboardType="numeric"
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
            <Text style={styles.buttonTextStyle}>Record</Text>
          </TouchableOpacity>

        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default Utilization;

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
    marginTop: 10,
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