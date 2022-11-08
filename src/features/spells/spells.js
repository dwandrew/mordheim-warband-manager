import React, {useEffect, useState} from 'react';


const SpellScreen = () => {

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


    return (
      <div>

      <div style = {{width: "100%"}}>
        <div className='grid-container'>
        {spellTypes.map(s => {
          return(
            <div className = 'grid-item' key= {s.key}>
                    <button 
                    className='buttonClass'
                    onClick={() => {setActiveSpell(s.key)}}
                  >{s.key[0].toUpperCase() + s.key.substring(1)}</button>
            </div>
          )
          })
        }
        </div>  

      </div>
    
      <div style = {{marginBottom : 100}}>
      <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <div className='grid-container'>
        {!spells ? <p>information loading</p> : 
        spells && spells.map(s => {
        if(s.school == activeSpell){
          return(
            <div className='grid-item' key= {s.id}>
            <p style = {{fontWeight: "bold"}}>{s.name} </p>
            <p>Number: {s.number} </p>
            <p style = {{fontStyle: "italic"}}>{s.school}</p>
            <p >Difficulty: {s.difficulty}</p>
            <p>{s.description}</p>
            </div>
          )
            }
        })}
        </div>
       
      </div>

      </div>
      </div>
    );
  }

  export default SpellScreen;