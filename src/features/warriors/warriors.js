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
  const [loadedState, setLoadedState] = useState(false)

      const getWarriors = () => {
        fetch(`https://mordheim-database.herokuapp.com/warriors`)
          .then((response) => response.json())
          .then((json) => {
            console.log([...json])
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
            console.log("equipment: ", [...json])
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
            console.log([...json])
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
      }, [warriors]);

      useEffect(() => {
        if(!equipment_lists){
        getEquipmentLists();
        }
      }, [equipment_lists]);

      useEffect(() => {
        if(!mutations){
        getMutations();
        }
      }, [mutations]);

      useEffect(() => {
        if(warriors && equipment_lists && mutations){
          setLoadedState(true)
        }
      }, [warriors, equipment_lists, mutations]);

      const warriorTypesGrid = () => {
        let grid  = warriorTypes.map(item => {
        let title = item.key.split()
        title[0] = title[0].toUpperCase()
        title = title.join()
        return(
          <div className='grid-item' key = {item.key}>
          <button 
          className = 'buttonClass'
          onClick={() => {setActiveWarrior(item.key)}}
        >
          <p>{title}</p>
          </button>
          </div>
        )
      })
      return grid
      }

const equipmentLists = ()=> {
  return(<div>{
    equipment_lists.map(el => {
        if (el.warband.toUpperCase() == activeWarrior.toUpperCase()){
          return(
          <div style={{textAlign: "center"}}>
            <p style={styles.itemTitle}>{el.name}</p>
              <p>Weapons</p>
                {itemGrid(5, el.weapons)}

                {el.armours.length >0 && <>
              <p >Armour</p>
                {itemGrid(5, el.armours)}
                </>
                }
                {el.equipments.length > 0 && <>
              
              <p >Equipment</p>
                {itemGrid(5, el.equipments)}
                </>
                }
              <div style={{borderBottomWidth: 1, marginTop: 3, marginBottom: 10, borderStyle: "dashed"}}></div>
          </div>)
        }
      })
}
{activeWarrior == "Cult of the possessed" && <>
                <p>Mutations</p>
                {itemGrid(4, mutations)}
                <div style={{borderBottomWidth: 1, marginTop: 3, marginBottom: 10, borderStyle: "dashed"}}></div>
                </>}

</div>)
}
  

const statGrid = (numColumns, data) => {


  return (<div className='grid-container' style = {{gridTemplateColumns: `repeat(${numColumns}, auto)`}} >
    {data.map(item => {
    return (
      <div className='grid-item' key={item.id}>
          <p style={styles.item}>{item.value}</p>
      </div>
        )
        }
      )
}</div>)
      // TO BE DELETED WHEN OTHER CODE TESTED
  // return (
  //   <FlatList
  //     data={data}
  //     renderItem={({item}) => (
  //       <div style={styles.itemContainer}>
  //         <p style={styles.item}>{item.value}</p>
  //       </div>
  //     )}
  //     keyExtractor={item => item.id}
  //     numColumns={numColumns} />
  // );

  
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
  
  return (
    <div className='grid-container' style = {{ gridTemplateColumns: `repeat(${numColumns}, auto)`}}>
    {data.map(item => {
    return (
      <div className='grid-item' key={item.id}>
          <p>{item.name}</p>
          <p>{item.cost} gold crowns</p>
      </div>
        )
        }
      )}
      </div>
    )
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
    if (loadedState){
    return (
    <div style = {{flex: 1,}}>
          <div className='grid-container'>
            {warriorTypesGrid()}
          </div>
        <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <button 
          className='buttonClass'
          onClick={() => {setShowEquipment(!showEquipment)}}
        >
          <p>{showEquipment ? "Hide equipment list" : "Show equipment list"}</p>
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
    else{
      return <p>Loading...</p>
    }
  }

  export default WarriorScreen;