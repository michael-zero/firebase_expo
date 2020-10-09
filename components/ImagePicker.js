import React from 'react'
import { Alert, StyleSheet, Text, View, Button, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const ObterImagem = ({imageUri, setImageUri}) => {
   

    React.useEffect(() => {
        obterPermissao();
      }, [])
    
       //Obter permissao para acessar a camera
       const obterPermissao = async () => {
        const {granted} =  await ImagePicker.requestCameraRollPermissionsAsync()
        
        if(!granted){
            Alert.alert('Voce precisa dar permissao')
        }
      }

      const selectImage = async () => {
        try {
            //carrega a imagem da biblioteca e passa os requisitos da imagem
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5, 
            })

            if(!result.cancelled){
              setImageUri(result.uri)
              console.log('URI:', imageUri)
            }
        } catch (error) {
            console.log('erro ao ler a imagem ',error);
        }
    }


    return (
        <View>
            {imageUri && <Image style={styles.image} source={{uri: imageUri}}/>}
            <Button title='buscar' onPress={selectImage}/>
            {!imageUri && <Text>Nao ha imagem</Text>}
        </View>
    )
}

export default ObterImagem

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    }
})
