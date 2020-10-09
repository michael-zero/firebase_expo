import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, LogBox } from 'react-native';
import ImagePicker from './components/ImagePicker'
//Imports necessários
import * as firebase from 'firebase'
import 'firebase/firestore'

import {firebaseConfig} from './config'

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

LogBox.ignoreLogs(['Setting a timer']);

//Firebase ===============================
const db = firebase.firestore()
const storage = firebase.storage();
const storageRef = storage.ref();
//========================================

export default function App() {

  const [nome, setNome] = React.useState('');
  const [imageUri, setImageUri] = React.useState();

  const enviar = async () => {
    const pessoasRef = db.collection('pessoas')
    try {
      const doc = await pessoasRef.add({nome})
      console.log('Documento escrito com id: ', doc.id)
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  const receber = async () => {
    const query = await db.collection("pessoas").get()
    query.forEach((doc) => {
         const {nome} = doc.data();
         console.log(`${doc.id} => ${nome}`);
    });
  }

  const upload = () => {
    const workspaceRef = storageRef.child('./imagens/workspace.png')
    console.log(`Nome ${workspaceRef.name},`)
    
  }

  return (
    <View style={styles.container}>
      <ImagePicker imageUri={imageUri} setImageUri={setImageUri}/>
      {/* <TextInput onChangeText={setNome} style={styles.input} placeholder='Digite um nome'/>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', }}>
        <Button title='enviar' onPress={enviar}/>
        <Button title='buscar' onPress={receber}/>
        <Button title='upload' onPress={upload}/>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderColor: 'gray',
},
});
