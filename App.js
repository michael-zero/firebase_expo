import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, TextInput, LogBox, Image } from 'react-native';
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

//========================================




export default function App() {

  const [nome, setNome] = React.useState('');
  const [img, setImg] = React.useState();
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

  const enviarImagem = async (imageUri) => {
     let extensao = null;
     extensao = imageUri.split('.').pop()
     const fileName = `workspace23.${extensao}`

     console.log(imageUri)
     const response = await fetch(imageUri) //retorna uma promise resolvida, o dado 
     const blob = await response.blob(); //convertendo a resposta para BLob

     let ref = firebase.storage().ref().child("imagens/" + fileName);

     ref.put(blob)

  }

  const listar = async () => {
      // Create a reference under which you want to list
      let listRef = storage.ref().child('/imagens');
      // Find all the prefixes and items.

      const response = await listRef.listAll();
      let nomePasta = 'imagens'; 
      
      response.items.forEach(itemRef => {
        console.log(itemRef['location'].path_ ,)
      })
     
      //descobre se existe uma pasta com este nome
      response.prefixes.forEach((pastaRef, i) => {
        if(pastaRef['location'].path_ === nomePasta){
          console.log('existe!!!')
        }
      })

      

    //   listRef.listAll().then(function(res) {
    //   res.prefixes.forEach(function(folderRef) {
    //     console.log('Nome pasta: ', folderRef.name)
    //   });
      
    //   res.items.forEach(function(itemRef) {
    //     console.log(itemRef.name, itemRef.fullPath)
    //     // All the items under listRef.
    //   });
    // }).catch(function(error) {
    //   console.log('error: ', error)
    // });
  }

  const download = () => {
   storage.ref().child('imagens/workspace23.jpg').getDownloadURL().then(async function(url) {
        //gs://firestorern-55ea3.appspot.com/imagens => caminho

        // var xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = function(event) {
        //   var blob = xhr.response;
        // };
        // xhr.open('GET', url);
        // xhr.send();

       await fetch(url, {method: 'GET'}).then(response => {
          return response.blob()
        })


        setImg(url);
        console.log(url)
      }).catch(function(error) {
        console.log('error: ',error)
      });
  }



  return (
    <View style={styles.container}>
      <ImagePicker imageUri={imageUri} setImageUri={setImageUri}/>
      {img && <Image source={{uri: img}} style={{width: 200, height: 200}}/>}
      <Button title='enviar storage' onPress={() => enviarImagem(imageUri)}/>
      <Button title='download storage' onPress={() => download()}/>
      <Button title='Listagem' onPress={() => listar()}/>
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
