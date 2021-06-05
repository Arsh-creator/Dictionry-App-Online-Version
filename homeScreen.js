import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Text, View, StyleSheet,TextInput,TouchableOpacity,ImageBackground } from 'react-native';
import {Header} from 'react-native-elements'
import { Audio } from 'expo-av';
import dictionary from './dic';

export default class homeScreen extends React.Component{
    playSound=async()=>{
        await Audio.Sound.createAsync(
            {uri:'http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/pause.wav'},
            {shouldPlay: true} 
        )
    }

    constructor(){
        super();
        this.state={
            text:'',
            word:'',
            lexicalCategory:'',
            definition: ""
        }
    }

    getWord=(word)=>{
        var searchKeyWord = word.toLowerCase();
            var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyWord+".json"
            return fetch(url)
            .then((data)=>{
              if(data.status === 200){
                return data.json;
              }else{
                return null;
              }
            })
            .then((response)=>{
              var responseObject = response;
              if(responseObject){
                var wordData = responseObject.definition[0]
                var definition = wordData.description
                var lexicalCategory = wordData.wordtype
                this.setState({
                  'word': this.state.text,
                  'definition': definition,
                  'lexicalCategory':lexicalCategory
                })
              }else{
                this.setState({
                  'word':this.state.text,
                  'definition': 'Not Found'
                })
              }
            })
            }

    render(){
        return(
            <View style={styles.container}>
                <Header>
                backgroundColor={'yellow'}
                centerComponent={{ text: 'Pocket Dictionary', style: { width:200,           
                color: 'orange',fontSize:20,fontFamily:'Cursive' } }}
                </Header>

                <ImageBackground
                source={{uri:'https://images.unsplash.com/photo-1513151233558-d860c5398176?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80'}}
                style={{width:330,height:730,borderWidth:3,borderColor:'red'}}>

                <TextInput>
                    placeholder = "ENTER YOUR TEXT HERE"
                    style={{marginTop:200,marginLeft:20,borderWidth:3,width:280,
                    height:40,fontFamily:'cursive',fontWeight:'bold'}},
                    onChangeText={ ((text)=>{
                        this.setState({
                            text:text,
                            word:'Loading',
                            lexicalCategory: '',
                            definition:''
                        })
                    })}
                    value={
                      this.state.text
                    }
                </TextInput>
                
                <TouchableOpacity
                style={styles.searchButton}
                onPress={
                    this.getWord(text)
                }>
                    Search
                </TouchableOpacity>

         <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'orange' }}>
            Word:{''}{''}
          </Text>
          <Text style={{ fontSize: 20 }}>{this.state.word}</Text>
          </View>

        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'orange' }}>
            Type:{''}
          </Text>
          <Text style={{ fontSize: 20 }}>{this.state.lexicalCategory}</Text>
        </View>

        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'orange' }}>
            Definition:{''}
          </Text>
          <Text style={{ fontSize: 20 }}>{this.state.definition}</Text>
        </View>
       
        </ImageBackground>
       
      </View>

                 
        );
    }

}
const styles = StyleSheet.create({
    container: {
       flex: 1,
    
     },
      searchButton: {
       width: '50%',
       alignSelf: 'center',
       height: 55,
       margin: 10,
       padding: 5,
       borderRadius: 20,
       borderWidth: 3,
       backgroundColor: 'crimson',
       marginTop:100
     },
      buttonText: {
       textAlign: 'center',
       fontSize: 30,
       fontWeight: 'bold',
       
     },
   });