import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

//Imports necessários
import * as firebase from 'firebase'
import 'firebase/firestore'

import {firebaseConfig} from './config'

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()



export default function App() {
  const [nome, setNome] = React.useState('');

  const enviar = async () => {
      
    const pessoasRef = db.collection('pessoas')

    try {
      const doc = await pessoasRef.add({nome})
      console.log('Documento escrito com id: ', doc.id)
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    
  }

  return (
    <View style={styles.container}>
      <TextInput onChangeText={setNome} style={styles.input}/>
      <Button title='enviar' onPress={enviar}/>
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
