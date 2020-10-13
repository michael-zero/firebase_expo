import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

//Import necessário
import * as Permissions from 'expo-permissions'

const App = () => {

    
    const obterPermissao = async () => {
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.LOCATION); 
        
        if(!granted){
            alert('Você precisa dar permissão!!')
        }
       
        
    }

    React.useEffect(() => {
        obterPermissao();
    },[])

    return (
        <View style={styles.container}>
           <Text>Deixa seu like!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
})

export default App
