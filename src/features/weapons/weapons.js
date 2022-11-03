
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, TouchableOpacity, FlatList} from 'react-native';


const WeaponScreen = ({ navigation }) => {

  const [weapons, setWeapons] = useState()
  const weaponTypes = [{key: "Close Combat"},{key: "Ranged"}]
  const [rangedWeapons, setRangedWeapons] = useState()
  const [activeWeapon, setActiveWeapon] = useState("Close Combat")

      const getWeapons = () => {
        fetch(`https://mordheim-database.herokuapp.com/weapons`)
          .then((response) => response.json())
          .then((json) => {
            let ranged = json.filter(w => w.range !== "Close Combat" && w.range !== "Close combat" )
            console.log(ranged)
            setRangedWeapons([...ranged])
            let close = json.filter(w => w.range == "Close Combat" || w.range == "Close combat")
            console.log(close)
            setWeapons([...close])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!weapons){
        getWeapons();
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
        onPress={() => {setActiveWeapon(item.key)}}
      >
        <Text style = {{color: "white", }}>{title}</Text>
        </TouchableOpacity>
        </View>
      )
    }

    const closeCombatWeapons = () => {
      return( weapons.map(w => {
        return(
          <View style={styles.textContainerStyle} key= {w.id}>
            <Text style = {{fontWeight: "bold"}}>{w.name} </Text>
            <Text style = {{fontStyle: "italic"}}>{w.cost !== "0" ? `${w.cost} Gold crowns` : "Free"}</Text>
            <Text>{w.rarity}</Text>
            {/* <Text>{w.range !== "Close Combat" ? "Range: " : null}{w.range}</Text> */}
            <Text style = {styles.textBottom}>Strength: {w.strength == "" ? "As user" : w.strength}</Text>
            {w.special_rules!== [] ? w.special_rules.map(r => {
                let name = r.name.replace(/\_/g, "-")
                let desc = r.description.replace(/\_/g, "-")
                desc = desc.replace(/\  /g, "")
                return(<>
                <Text style = {{fontStyle: "italic", fontWeight: "bold"}}>{name}</Text>
                <Text style = {styles.textBottom}>{desc}</Text>
                </>
                )
            }) : null}
            </View>
        )}
      
      )
    )
    }
    const ranged_Weapons = () => {
      return( rangedWeapons.map(w => {
        return(
          <View style={styles.textContainerStyle} key= {w.id}>
            <Text style = {{fontWeight: "bold"}}>{w.name} </Text>
            <Text style = {{fontStyle: "italic"}}>{w.cost !== "0" ? `${w.cost} Gold crowns` : "Free"}</Text>
            <Text>{w.rarity}</Text>
            <Text>Range: {w.range}</Text>
            <Text style = {styles.textBottom}>Strength: {w.strength == "" ? "As user" : w.strength}</Text>
            {w.special_rules!== [] ? w.special_rules.map(r => {
                let name = r.name.replace(/\_/g, "-")
                let desc = r.description.replace(/\_/g, "-")
                desc = desc.replace(/\  /g, "")
                return(<>
                <Text style = {{fontStyle: "italic", fontWeight: "bold"}}>{name}</Text>
                <Text style = {styles.textBottom}>{desc}</Text>
                </>
                )
            }) : null}
            </View>
        )}
      
      )
    )
    }



    return (
    <View style = {{flex: 1,}}>
          <View style = {{width: "100%"}}>
            <FlatList
              data ={weaponTypes}
              renderItem = {renderGridItem}
              numColumns = {"2"}
              />
          </View>
      <ScrollView style = {{marginBottom: 100}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <View style={styles.containerStyle}>
        {!weapons ? <Text>information loading</Text> :
        weapons && activeWeapon== "Close Combat" && closeCombatWeapons()}
        {!rangedWeapons ? null :
          rangedWeapons && activeWeapon== "Ranged" && ranged_Weapons()}
        </View>
       
      </View>

      </ScrollView>
      </View>
    );
  }

  export default WeaponScreen;