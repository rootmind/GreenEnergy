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
  FlatList,
  SafeAreaView
} from 'react-native';
// import Loader from '../Components/Loader';
// import { set } from 'react-native-reanimated';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryGroup, VictoryStack, VictoryAxis, VictoryLine } from "victory-native";
import { serverIP } from '../../app.json';
//charan 
//kanna
//kiran
const HomeScreen = props => {
  let [personId, setPersonId] = useState('');
  // let [personName, setPersonName] = useState('');
  // let [personEmail, setPersonEmail] = useState('');
  // let [personPassword, setPersonPassword] = useState('');
  // let [grade, setGrade] = useState('');
  // let [personSection, setPersonSection] = useState('');
  // let [gender, setGender] = useState('');
  // let [personStatus, setPersonStatus] = useState('');
  // let [jobType, setJobType] = useState('');
   let [loading, setLoading] = useState(false);
   let [errortext, setErrortext] = useState('');
  let [isGraphLoading, setIsGraphLoading] = useState(false);
  //let [isLoading, setIsLoading] = useState[];
  let [utilizationData, setUtilizationData] = useState([{ personMonth: "1", waterUtilized: 0, electricityUtilized: 0, personZone: 'AMBER', zone: 0 }]);

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

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('person_id').then((value) => {
        // alert('value' + value);
        setPersonId(value);
        fetchUtilizationInfo(value);
      }

      );
    }, 1);
  }, []);


  const fetchUtilizationInfo = (props) => {
    setErrortext('');

    //Show Loader
    setLoading(true);
    // setLoading[];

    console.log('personId ' + props + ':' + personId);
    // var apiBaseUrl = "http://192.168.0.200:9093/person/find";
    // var apiBaseUrl = "http://192.168.43.235:9093/person/find";
    var apiBaseUrl = serverIP + "/utilization/get";
    //var apiBaseUrl = "http://192.168.1.3:9093/utilization/get";
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
        // setLoading[];
        console.log('Get Response ' + JSON.stringify(response));
        if (response.status == 200) {
          console.log('Data 1  ' + JSON.stringify(response.data));
          //console.log(response.data[0].personName);
          //  setPersonName(response.data.personName);
          // console.log('Slice ' + response.data.slice());
          // console.log('Initial Data  ' + data[0].personMonth + ' ' + data[0].waterUtilized + ' ' + data[0].electricityUtilized);
          // data = [...response.data];

          // console.log('Data 2  ' + JSON.stringify(data));
          // console.log('Final Data  ' + data[0].personMonth + ' ' + data[0].waterUtilized + ' ' + data[0].electricityUtilized);
          //  alert('Data ' + data);


          //  setTimeout(() => { setIsLoading(true); }, 1000);
          // setTimeout(() => { setIsLoading[]; }, 1000);
          if (response.data.length > 0) {
            setIsGraphLoading(true);
            setUtilizationData(response.data);
          }
          // setUtilizationData([{ personMonth: 1, waterUtilized: 100, electricityUtilized: 200 }]);

          // data = reponse.data;


        }

        else {
          //console.log("Username does not exists");
          alert("Query Not Successful");
        }
      })
      .catch(function (error) {

        setLoading(false);
        // setLoading[];
        console.log(error);
        alert("Unable To Reach Server");
      });



  };

  if (isGraphLoading) {

    return (
      <View style={styles.container}>






        <ScrollView keyboardShouldPersistTaps="handled" >

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => fetchUtilizationInfo(personId)}>
            {/* <ImageBackground source={image} style={styles.image}>
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </ImageBackground> */}

            {/* <Text style={styles.buttonTextStyle}>R</Text> */}
            <Image source={require('../../Image/refresh.png')} resizeMode='contain' style={styles.ImageIconStyle} />
            {/* <Image
                source={require('..../Image/2a.jpg')}
                style={{
                  width: '200%',
                  height: 250,
                  marginVertical: -5,
                  marginRight: 8,
                  marginBottom: -18,
                  resizeMode: 'contain'
                }}
              /> */}
          </TouchableOpacity>

          <VictoryChart height={400} width={375} theme={VictoryTheme.grayscale}        >

            <VictoryGroup offset={0}
              standalone={false}
              colorScale={"qualitative"}>

              <VictoryStack colorScale={"green"} >

                {/* {utilizationData.map((data, i) => {
                return <VictoryBar data={data} x="personMonth" y="electricityUtilized" key={i}/>;
              })} */}

                <VictoryBar name="ELECTRICITY" data={utilizationData} x="personMonth" y="electricityUtilized" barWidth={({ index }) => index * 2 + 8} labels={({ datum }) => `${datum.electricityUtilized}`} />
              </VictoryStack>

              <VictoryAxis dependentAxis label="Electricity"
                //domain={[0, 200]}
                tickFormat={(tick) => `${tick}kW`}
              />
              <VictoryAxis domain={[0, 12]} label="Month"
                tickFormat={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
              />

            </VictoryGroup>

          </VictoryChart>

          <VictoryChart height={400} width={375} theme={VictoryTheme.grayscale}        >



            <VictoryGroup offset={0}
              standalone={false}
              colorScale={"qualitative"}>

              <VictoryStack colorScale={"blue"} >

                {/* {utilizationData.map((data, i) => {
      return <VictoryBar data={data} x="personMonth" y="electricityUtilized" key={i}/>;
    })} */}

                <VictoryBar data={utilizationData} x="personMonth" y="waterUtilized" barWidth={({ index }) => index * 2 + 8} labels={({ datum }) => `${datum.waterUtilized}`} />
              </VictoryStack>

              <VictoryAxis dependentAxis label="Water"
                // domain={[0, 900]}
                tickFormat={(tick) => `${tick}gal`}
              />
              <VictoryAxis domain={[0, 12]} label="Month"
                tickFormat={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
              />

            </VictoryGroup>

          </VictoryChart>

          <VictoryChart height={400} width={375} theme={VictoryTheme.grayscale}        >



            <VictoryGroup offset={0}
              standalone={false}
              colorScale={"qualitative"}>

              <VictoryStack 
              // colorScale={"blue"} 
              >



                <VictoryBar data={utilizationData} x="personMonth" y="zone" barWidth={({ index }) => index * 2 + 8} labels={({ datum }) => `${datum.zone}`}
                       style={{
                        data: {
                          fill: ({ datum }) =>( datum.zone === 10 ? "red" :(datum.zone === 20 ? "#FFC200":"green") ),
                          // stroke: ({ index }) => +index % 2 === 0  ? "#000000" : "#c43a31",
                          // fillOpacity: 0.7,
                          // strokeWidth: 3
                        },
                        labels: {
                          fontSize: 15,
                          fill: ({ datum }) =>( datum.zone === 10 ? "red" :(datum.zone === 20 ? "#FFC200":"green") )
                        }
                      }}
                
                />
              </VictoryStack>

              <VictoryAxis dependentAxis label="Zone"
                // domain={[0, 900]}
                tickFormat={(tick) => `${tick}`}
              />
              <VictoryAxis domain={[0, 12]} label="Month"
                tickFormat={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]}
              />

            </VictoryGroup>

          </VictoryChart>

   

        </ScrollView>


        {/* <FlatList
          data={utilizationData}
          numColumns={1}
          renderItem={({ item }) => <View><Text style={styles.item}>{personMonthOptions[item.personMonth]} - {item.personZone}</Text></View>}
          keyExtractor={(item, index) => '' + index}
        /> */}




      </View>


    );
  }

  else {
    return (
      <View style={styles.container}>

      </View>
    );
  }
};

// <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
//   <Loader loading={loading} />
//   <ScrollView keyboardShouldPersistTaps="handled">



//     <View style={{ alignItems: 'center' }}>
//         <Image
//           source={require('../Image/aboutreact.png')}
//           style={{
//             width: '50%',
//             height: 100,
//             resizeMode: 'contain',
//             margin: 30,
//           }}
//         />
//            </View>
//         <View style={styles.SectionStyle}>
//           <TextInput
//             style={styles.inputStyle}
//             onChangeText={personId => setPersonId(personId)}
//             underlineColorAndroid="#F6F6F7"
//             placeholder="Enter Id"
//             placeholderTextColor="#F6F6F7"
//             keyboardType="email-address"
//             ref={ref => {
//               this._emailinput = ref;
//             }}
//             returnKeyType="next"
//             onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
//             blurOnSubmit={false}
//           />
//       </View>
//       <KeyboardAvoidingView enabled>
//         <View style={styles.SectionStyle}>
//           <TextInput
//             style={styles.inputStyle}
//            onChangeText={PersonName => setPersonName(PersonName)}
//            value = {personName}
//             underlineColorAndroid="#FFFFFF"
//             placeholder="Enter Name"
//             placeholderTextColor="#F6F6F7"
//             autoCapitalize="sentences"
//             returnKeyType="next"
//             onSubmitEditing={() =>
//               this._emailinput && this._emailinput.focus()
//             }
//             blurOnSubmit={false}
//           />
//         </View>
//         <View style={styles.SectionStyle}>
//           <TextInput
//             style={styles.inputStyle}
//             onChangeText={personEmail => setPersonEmail(personEmail)}
//             underlineColorAndroid="#F6F6F7"
//             placeholder="Enter Email"
//             placeholderTextColor="#F6F6F7"
//             keyboardType="email-address"
//             ref={ref => {
//               this._emailinput = ref;
//             }}
//             returnKeyType="next"
//             onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
//             blurOnSubmit={false}
//           />
//              </View>
//         <View style={styles.SectionStyle}>
//           <TextInput
//             style={styles.inputStyle}
//             onChangeText={personPassword => setPersonPassword(personPassword)}
//             underlineColorAndroid="#F6F6F7"
//             placeholder="Enter Password"
//             placeholderTextColor="#F6F6F7"
//             keyboardType="email-address"
//             ref={ref => {
//               this._emailinput = ref;
//             }}
//             returnKeyType="next"
//             onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
//             blurOnSubmit={false}
//           />
//              </View>
//         <View style={styles.SectionStyle}>
//           <TextInput
//             style={styles.inputStyle}
//             onChangeText={grade => setGrade(grade)}
//             underlineColorAndroid="#F6F6F7"
//             placeholder="Enter Grade"
//             placeholderTextColor="#F6F6F7"
//             keyboardType="email-address"
//             ref={ref => {
//               this._emailinput = ref;
//             }}
//             returnKeyType="next"
//             onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
//             blurOnSubmit={false}
//           />
//              </View>
//         <View style={styles.SectionStyle}>
//           <TextInput
//             style={styles.inputStyle}
//             onChangeText={personSection => setPersonSection(personSection)}
//             underlineColorAndroid="#F6F6F7"
//             placeholder="Enter Section"
//             placeholderTextColor="#F6F6F7"
//             keyboardType="email-address"
//             ref={ref => {
//               this._emailinput = ref;
//             }}
//             returnKeyType="next"
//             onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
//             blurOnSubmit={false}
//           />
//              </View>
//         <View style={styles.SectionStyle}>
//           <TextInput
//             style={styles.inputStyle}
//             onChangeText={gender => setGender(gender)}
//             underlineColorAndroid="#F6F6F7"
//             placeholder="Enter Email"
//             placeholderTextColor="#F6F6F7"
//             keyboardType="email-address"
//             ref={ref => {
//               this._emailinput = ref;
//             }}
//             returnKeyType="next"
//             onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
//             blurOnSubmit={false}
//           />

//         </View>
//         <View style={styles.SectionStyle}>
//           <TextInput
//             style={styles.inputStyle}
//             onChangeText={personStatus => setPersonStatus(personStatus)}
//             underlineColorAndroid="#F6F6F7"
//             placeholder="Enter Status"
//             placeholderTextColor="#F6F6F7"
//             keyboardType="email-address"
//             ref={ref => {
//               this._ageinput = ref;
//             }}
//             onSubmitEditing={() =>
//               this._addressinput && this._addressinput.focus()
//             }
//             blurOnSubmit={false}
//           />
//         </View>
//         <View style={styles.SectionStyle}>
//           <TextInput
//             style={styles.inputStyle}
//             onChangeText={jobType => setJobType(jobType)}
//             underlineColorAndroid="#FFFFFF"
//             placeholder="Enter JobType"
//             placeholderTextColor="#F6F6F7"
//             autoCapitalize="sentences"
//             ref={ref => {
//               this._addressinput = ref;
//             }}
//             returnKeyType="next"
//             onSubmitEditing={Keyboard.dismiss}
//             blurOnSubmit={false}
//           />
//         </View>
//         {errortext != '' ? (
//           <Text style={styles.errorTextStyle}> {errortext} </Text>
//         ) : null}
//         <TouchableOpacity
//           style={styles.buttonStyle}
//           activeOpacity={0.5}
//           onPress={handleSubmitButton}>
//           <Text style={styles.buttonTextStyle}>REGISTER</Text>
//         </TouchableOpacity>
//       </KeyboardAvoidingView> 
//   </ScrollView>
// </View>

export default HomeScreen;




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
    // backgroundColor: '#7DE24E',
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 34,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 340,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 11
  },
  buttonTextStyle: {
    color: 'black',
    paddingVertical: 1,
    fontSize: 15,
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  },
  item: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    height: 60,
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  }
});




// /* This is an Login Registration example from https://aboutreact.com/ */
// /* https://aboutreact.com/react-native-login-and-signup/ */

// //Import React
// import React from 'react';

// //Import all required component
// import { View, Text } from 'react-native';

// const HomeScreen = () => {
//   global.currentScreenIndex = 'HomeScreen';
//   return (
//     <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
//       <Text style={{ fontSize: 23, marginTop: 10 }}>Home Screen</Text>
//       <Text style={{ fontSize: 18, marginTop: 10 }}>
//         Simple Login Registraction Example
//       </Text>
//       <Text style={{ fontSize: 18, marginTop: 10 }}>https://aboutreact</Text>
//     </View>
//   );
// };
// export default HomeScreen;