import React, {useEffect, useState} from 'react';


const WarriorScreen = () => {

  const [warriors, setWarriors] = useState()
  const warriorTypes = [
    {key:"Mercenaries"},
    {key:"Skaven"}, 
    {key:"The Undead"}, 
    {key:"Witch hunters"}, 
    {key:"Cult of the possessed"}, 
    {key:"Sisters of Sigmar"}, 
  ]

  const [activeWarrior, setActiveWarrior] = useState("Mercenaries")
  const [equipment_lists, setEquipmentLists] = useState()
  const [mutations, setMutations] = useState()
  const [showEquipment, setShowEquipment] = useState(false)

      const getWarriors = () => {
        fetch(`https://mordheim-database.herokuapp.com/warriors`)
          .then((response) => response.json())
          .then((json) => {
            setWarriors([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      const getEquipmentLists = () => {
        fetch(`https://mordheim-database.herokuapp.com/equipment_lists`)
          .then((response) => response.json())
          .then((json) => {
            setEquipmentLists([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      const getMutations = () => {
        fetch(`https://mordheim-database.herokuapp.com/mutations`)
          .then((response) => response.json())
          .then((json) => {
            
            setMutations([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!warriors){
        getWarriors();
        }
        if(!equipment_lists){
          getEquipmentLists()
        }
        if(!mutations){
          getMutations()
        }
      }, []);

    const renderGridItem = ({item, index}) => {
        let title = item.key.split()
        title[0] = title[0].toUpperCase()
        title = title.join()
        let width = Dimensions.get('window').width
        let third = width/3
        let fontSize = third*0.1
        return(
          <div style ={{flex: 1, margin: "auto",}}>
          <button 
          className = 'buttonClass'
          onClick={() => {setActiveWarrior(item.key)}}
        >
          <p style = {{color: "white", fontSize: fontSize}}>{title}</p>
          </button>
          </div>
        )
      }

const equipmentLists = ()=> {
  return(<div>{
  equipment_lists && equipment_lists.map(el => {
        if (el.warband.toUpperCase() == activeWarrior.toUpperCase()){
          return(
          <div style={{width: "95%", textAlign: "center"}}>
            <p style={styles.itemTitle}>{el.name}</p>
              <p style={[styles.itemItalic, {borderBottomWidth: 1, marginTop: 3, marginBottom: 3}]}>Weapons</p>
                {itemGrid(2, el.weapons)}
                {el.armours.length >0 && <>
              
              <p style={[styles.itemItalic,  {borderBottomWidth: 1, marginTop: 3, marginBottom: 3}]}>Armour</p>
                {itemGrid(2, el.armours)}
                </>
                }
                {el.equipments.length >0 && <>
              
              <p style={[styles.itemItalic,  {borderBottomWidth: 1, marginTop: 3, marginBottom: 3}]}>Equipment</p>
                {itemGrid(2, el.equipments)}
                </>
                }
              <div style={{borderBottomWidth: 1, marginTop: 3, marginBottom: 10, borderStyle: "dashed"}}></div>
          </div>)
        }
      })
}
{activeWarrior == "Cult of the possessed" && <>
                <p style={[styles.itemItalic,  {borderBottomWidth: 1, marginTop: 3, marginBottom: 3}]}>Mutations</p>
                {itemGrid(2, mutations)}
                <div style={{borderBottomWidth: 1, marginTop: 3, marginBottom: 10, borderStyle: "dashed"}}></div>
                </>}

</div>)
}
  

const statGrid = (numColumns, data) => {

  const size = Dimensions.get('window').width/(numColumns+2);

  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <div style={styles.itemContainer}>
          <p style={styles.item}>{item.value}</p>
        </div>
      )}
      keyExtractor={item => item.id}
      numColumns={numColumns} />
  );
}

const itemGrid = (numColumns, data) => {
  data.forEach(item => {
    if(item.name == "Blessed water"){
      item.rarity = "Common"
      item.cost = "10"
    }
    if(item.name == "Holy tome"){
      item.cost = "120"
    }
    
    if(item.name == "Holy (Unholy) relic"){
      item.name = "Holy relic"
      item.cost = "15"
    }
  } )

  return (data.map(item => {
    return (
      <div className='grid-item' key={w.id}>
          <p style={styles.itemTitle}>{item.name}</p>
          <p style={styles.itemItalic}>{item.cost} gold crowns</p>
      </div>
    )
  }

  )
  )
  // TO BE DELETED WHEN OTHER CODE TESTED
  // return (
  //   <FlatList
  //     style = {{width: "100%", marginBottom: 10}}
  //     data={data}
  //     renderItem={({item}) => (
  //       <div style= {{height: 40, flex: 1, flexShrink: 1, width: "50%"}}>
  //         <p style={styles.itemTitle}>{item.name}</p>
  //         <p style={styles.itemItalic}>{item.cost} gold crowns</p>
  //         {/* <p style={styles.itemNoBorder}>{item.name == "Blessed water" ? "Common" : item.rarity.split("(")[0]}</p> */}
  //         {/* <p style={styles.itemNoBorder}>{item.range !== "Close Combat" ? "Range: " : ""}{item.range}</p>
  //         <p style={styles.itemNoBorder}>Strength: {item.strength}</p> */}
  //       </div>
  //     )}
  //     keyExtractor={item => item.id}
  //     numColumns={numColumns} />
  // );
}


      const styles = {
        containerStyle: {
            flex: 1,
            flexDirection: "column",
            justifyContent: 'space-around',
            maxWidth: "100%",
        },
        itemContainer: {
            width: "11%",
            height: 27,
          },
          item: {
            flex: 1,
            margin: 0,
            flexwrap: "wrap",
            borderWidth: 1,
            borderColor: "black",
            textAlign: 'center',
          },
          itemNoBorder: {
            flex: 1,
            flexwrap: "wrap",
            margin: 0,
            textAlign: 'center',
          },
          itemTitle: {
            // flex: 1,
            // flexShrink: 1,
            margin: 0,
            maxWidth: "100%",
            fontWeight: "bold",
            textAlign: 'center',

          },
          itemItalic: {
            flex: 1,
            margin: 0,
            textAlign: 'center',
            fontStyle: "italic"

          },
        button: {
            alignItems: "center",
            backgroundColor: "black",
            borderRadius: 2,
            padding: 7,
            margin: 1,
            
          },
        textContainerStyle: {
            flex: 2,
            flexDirection: 'column',
            margin: 10,
            marginBottom: 0,
            justifyp: 'center',
            maxWidth: "100%",
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10
        },
        textBottom:{
          marginBottom: 10
        }
    }

    return (
    <div style = {{flex: 1,}}>
          <div style = {{width: "100%"}}>
            <FlatList
              data ={warriorTypes}
              renderItem = {renderGridItem}
              numColumns = {"3"}
              />
          </div>
        <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <button 
          style={styles.button}
          onPress={() => {setShowEquipment(!showEquipment)}}
        >
          <p style = {{color: "white"}}>{showEquipment ? "Hide equipment list" : "Show equipment list"}</p>
        </button>
        </div>

      <div style = {{marginBottom: 100}}>
      <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <div style = {{flex: 1, width: "100%"}}>
          {showEquipment ? equipmentLists() : null}
        </div>
        
        <div style={styles.containerStyle}>
        {!warriors ? <p>information loading</p> :

        warriors && warriors.map(w => {
          if (w.warband == activeWarrior){
            let description = w.description.replace(/\  /g, "")
            let stats =   [
                    {id: `move_${w.id}`, value: `M`}, 
                    {id: `weapon_skill_${w.id}`, value: `WS`}, 
                    {id: `ballistic_skill_${w.id}`, value: `BS`}, 
                    {id: `strength_${w.id}`, value: `S`}, 
                    {id: `toughness_${w.id}`, value: `T`}, 
                    {id: `wounds_${w.id}`, value: `W`}, 
                    {id: `initiative_${w.id}`, value: `I`}, 
                    {id: `attacks_${w.id}`, value: `A`}, 
                    {id: `leadership_${w.id}`, value: `LD`}, 
                    {id: `m_stat_${w.id}`, value: w.move},
                    {id: `ws_stat_${w.id}`, value: w.weapon_skill},
                    {id: `bs_stat_${w.id}`, value: w.ballistic_skill},
                    {id: `str_stat_${w.id}`, value: w.strength},
                    {id: `t_stat_${w.id}`, value: w.toughness},
                    {id: `w_stat_${w.id}`, value: w.wounds},
                    {id: `i_stat_${w.id}`, value: w.initiative},
                    {id: `a_stat_${w.id}`, value: w.attacks},
                    {id: `ls_stat_${w.id}`, value: w.leadership}
                    ]

          return(
            <div style={styles.textContainerStyle} key= {w.id}>
            <p style = {{fontWeight: "bold"}}>{w.name} </p>
            <p style = {{fontStyle: "italic"}}>{w.cost !== "0" ? `${w.cost} Gold crowns` : "Free"}</p>
            <p style = {{fontStyle: "italic", fontWeight: "bold"}}>{w.warrior_type}</p>
            <p>{description}</p>
            <div style = {{marginTop: 10, marginBottom: 10}}>
            {statGrid(9, stats)}
            </div>
            <div style = {{marginBottom: 10}}>
            <p style = {{fontWeight: "bold"}} >Equipment list:</p>
            {w.equipment_lists  !== [] ? w.equipment_lists.map(e_l => {
                return(<p>{w.name}'s can use equipment from the {e_l.name}</p>)})
                 : <p>{w.name}'s cannot use equipment</p>}
            {/* <p style = {styles.textBottom}>Strength: {w.strength}</p> */}
            </div>
            <div style = {{marginBottom: 10}}>
            {w.skills!== [] ? w.skills.map(r => {
                let name = r.name.replace(/\_/g, "-")
                let desc = r.description.replace(/\_/g, "-")
                desc = desc.trim()
                return(<>
                <p style = {{fontStyle: "italic", fontWeight: "bold"}}>{name}</p>
                <p style = {{fontStyle: "italic"}}>{r.skill_type} skill</p>
                <p style = {styles.textBottom}>{desc}</p>
                </>
                )
            }) : null}
            </div>
            </div>
          )
        }
        }
        )
        }
        </div>
       
      </div>

      </div>
      </div>
    );
  }

  export default WarriorScreen;