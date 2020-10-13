import React from 'react';
import { Image, StyleSheet, Button, Text, View, Alert, LogBox } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as firebase from 'firebase';
import 'firebase/firestore'

import {firebaseConfig} from '../config'

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

LogBox.ignoreLogs(['Setting a timer']);

//Firebase ===============================
const db = firebase.firestore()
const storage = firebase.storage();

//========================================



export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  };

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchCameraAsync();
    //let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      this.uploadImage(result.uri, "test-image")
        .then(() => {
          Alert.alert("Success");
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  }

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Choose image..." onPress={this.onChooseImagePress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: "center", },
});