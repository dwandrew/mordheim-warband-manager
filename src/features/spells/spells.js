import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions, ViewBase} from 'react-native';


const SpellScreen = ({ navigation }) => {

  const [spells, setSpells] = useState()
  const spellTypes = [
      {key:"Lesser magic"},
      {key:"Necromancy"}, 
      {key:"Chaos rituals"}, 
      {key:"Magic of the horned rat"}, 
      {key:"Prayers of Sigmar"}, 
  ]
  const [activeSpell, setActiveSpell] = useState("Lesser magic")

      const getSpells = () => {
        fetch(`https://mordheim-database.herokuapp.com/spells`)
          .then((response) => response.json())
          .then((json) => {
              setSpells([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!spells){
        getSpells();
        }
      }, []);

      const styles = {
        containerStyle: {
            flex: 1,
            flexDirection: "column",
            justifyContent: 'space-around',
            maxWidth: "100%",
           
            
        },
        button: {
            alignItems: "center",
            backgroundColor: "black",
            borderRadius: 2,
            padding: 10,
            margin: 1
          },
        textContainerStyle: {
            flex: 2,
            flexDirection: 'column',
            margin: 10,
            marginBottom: 0,
            justifyText: 'center',
            maxWidth: "100%",
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10
        },
        textBottom:{
          marginBottom: 10
        }
    }
    
    const renderGridItem = ({item, index}) => {
      let title = item.key.split()
      title[0] = title[0].toUpperCase()
      title = title.join()
     
      return(
        <View style ={{flex: 1, margin: "auto",}}>
        <TouchableOpacity 
        style={styles.button}
        onPress={() => {setActiveSpell(item.key)}}
      >
        <Text style = {{color: "white", }}>{title}</Text>
        </TouchableOpacity>
        </View>
      )
    }


    return (
      <View>
      {/* // <SafeAreaView style = {{flex: 1}}> */}
      {/* <TouchableOpacity style = {{alignItems: 'flex-end'}} onPress = {()=> navigation.openDrawer}><Text>Open menu</Text></TouchableOpacity> */}
      <View style = {{width: "100%"}}>

      <FlatList
        data ={spellTypes}
        renderItem = {renderGridItem}
        numColumns = {"3"}
      />
      </View>
    
      <ScrollView style = {{marginBottom : 100}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={styles.containerStyle}>
        {!spells ? <Text>information loading</Text> : 
        spells && spells.map(s => {
        if(s.school == activeSpell){
          return(
            <View style={styles.textContainerStyle} key= {s.id}>
            <Text style = {{fontWeight: "bold"}}>{s.name} </Text>
            <Text>Number: {s.number} </Text>
            <Text style = {{fontStyle: "italic"}}>{s.school}</Text>
            <Text >Difficulty: {s.difficulty}</Text>
            <Text style = {styles.textBottom}>{s.description}</Text>
            </View>
          )
            }
        })}
        </View>
       
      </View>

      </ScrollView>
      {/* </SafeAreaView> */}
      </View>
    );
  }

  export default SpellScreen;