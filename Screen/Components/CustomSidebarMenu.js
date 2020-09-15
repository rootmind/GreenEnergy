/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React from 'react';

//Import all required component
import { View, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const CustomSidebarMenu = props => {
  let items = [
    {
      navOptionName: 'Home',
      screenToNavigate: 'HomeScreen',
    },

    // {
    //   navOptionName: 'Settings',
    //   screenToNavigate: 'SettingsScreen',
    // },

    {
      navOptionName: 'Utilization',
      screenToNavigate: 'Utilization',
    },

    {
      navOptionName: 'Grade Utilization',
      screenToNavigate: 'GradeUtilization',
    },

    {
      navOptionName: 'School Utilization',
      screenToNavigate: 'SchoolUtilization',
    },

    {
      navOptionName: 'Profile',
      screenToNavigate: 'Profile',
    },



    {
      navOptionName: 'Logout',
      screenToNavigate: 'logout',
    },
  ];

  const handleClick = (index, screenToNavigate) => {
    if (screenToNavigate == 'logout') {
      props.navigation.toggleDrawer();
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return null;
            },
          },
          {
            text: 'Yes',
            onPress: () => {
              //AsyncStorage.clear();
              props.navigation.navigate('Auth');
              console.log('logout');
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      props.navigation.toggleDrawer();
      global.currentScreenIndex = screenToNavigate;
      props.navigation.navigate(screenToNavigate);
    }
  };



  return (
   
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'green' }}>
            {'Green Energy'.charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>Green Energy</Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />
      <View style={{ width: '100%', flex: 1 }}>
        {items.map((item, key) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
              color: 'black',
              backgroundColor:
                global.currentScreenIndex === item.screenToNavigate
                  ? '#E8DAEF'
                  : 'white',
            }}
            key={key}
            onStartShouldSetResponder={() =>
              handleClick(key, item.screenToNavigate)
            }>
            <Text style={{ fontSize: 20, color: 'black' }}>
              {item.navOptionName}
            </Text>
          </View>
        ))}
      </View>
    </View>
  
  );
};

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'green',
    backgroundColor: '#D5F5E3',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 24
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 18,
    marginLeft: 15,
    backgroundColor: 'black',
    marginTop: 15,
    marginBottom: 10,
  },
});
export default CustomSidebarMenu;