/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState,useEffect } from 'react';
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

const Utilization = props => {
  let [personId, setPersonId] = useState('');
  let [personMonth, setPersonMonth] = useState('');
  let [personYear, setPersonYear] = useState('');
  let [waterUtilized, setWaterUtilized] = useState('');
  let [electricityUtilized, setElectricityUtilized] = useState('');
  let [updateDate, setUpdateDate] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  let [animating, setAnimating] = useState(true);

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
    var apiBaseUrl = "http://192.168.0.200:9093/utilization/find";
    var payload =
    {
      "personId": props
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
          console.log(response.data.status);
          console.log(response.data.personName);
          setPersonId(response.data.personId);
          // setPersonMonth(response.data.personMonth);
          // setPersonYear(response.data.personYear);
          // setWaterUtilized(response.data.waterUtilized);
          // setElectricityUtilized(response.data.electricityUtilized);
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
        alert("Unable To Reach Server");
      });



  };

  const handleSubmitButton = () => {
    setErrortext('');
    // if (!personId) {
    //   alert('Please fill Id');
    //   return;
    // }
    if (!personMonth) {
      alert('Please fill Month');
      return;
    }
    if (!personYear) {
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
    if (!updateDate) {
      alert('Please fill UpdateDate');
      return;
    }
     //Show Loader
    setLoading(true);
    //---------------------------------------------------------------------------------------------------------------------
   
   
    var apiBaseUrl = "http://192.168.0.200:9093/utilization/insert";
    
    var payload =
    {
      "personId": personId,
      "personMonth": personMonth,
      "personYear": personYear,
      "waterUtilized": waterUtilized,
      "electricityUtilized": electricityUtilized,
      "updateDate": updateDate
    }
    axios.post(apiBaseUrl, payload, {headers :{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
  }})
    //axios.post(apiBaseUrl, payload)
      .then(function (response) {
        console.log(JSON.stringify(response));
        setLoading(false);
        if (response.status == 200) {
          console.log(response.data.status);
          if(response.data.status == 'STS005'){
            alert(response.data.message);
          }
          else if (response.data.status == "STS006") {
            alert(response.data.message);
          }
          else{
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
    <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center' }}>
          {/* <Image
            source={require('../Image/aboutreact.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }}
          /> */}
             </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
            //  onChangeText={personId => setPersonId(personId)}
              value={personId}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Id"
              placeholderTextColor="#F6F6F7"        
              returnKeyType="next"
            
              blurOnSubmit={false}
              editable={false} selectTextOnFocus={false}
            />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personMonth => setPersonMonth(personMonth)}
              underlineColorAndroid="#FFFFFF"
              placeholder="Enter Month"
              placeholderTextColor="#F6F6F7"
              autoCapitalize="sentences"
              returnKeyType="next"
            
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={personYear => setPersonYear(personYear)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Year"
              placeholderTextColor="#F6F6F7"
           
              returnKeyType="next"
            
              blurOnSubmit={false}
            />
               </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={waterUtilized => setWaterUtilized(waterUtilized)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Water Utilized"
              placeholderTextColor="#F6F6F7"
            
              returnKeyType="next"
             
              blurOnSubmit={false}
            />
               </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={electricityUtilized => setElectricityUtilized(electricityUtilized)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Electricity Utilized"
              placeholderTextColor="#F6F6F7"
             
              returnKeyType="next"
           
              blurOnSubmit={false}
            />
               </View>
          {/* <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={updateDate => setUpdateDate(updateDate)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Date"
              placeholderTextColor="#F6F6F7"
            
              returnKeyType="next"
             
              blurOnSubmit={false}
            />
          
          </View> */}
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