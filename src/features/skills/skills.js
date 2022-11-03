import React, {useEffect, useState} from 'react';

const SkillScreen = () => {

  const [skills, setSkills] = useState()
  const skillTypes = [{key:"combat"}, {key:"shooting"}, {key:"academic"}, {key:"strength"}, {key:"speed"}, {key:"sisters of sigmar"}, {key:"skaven"}]
  const [activeSkill, setActiveSkill] = useState("combat")

      const getSkills = () => {
        fetch(`https://mordheim-database.herokuapp.com/skills`)
          .then((response) => response.json())
          .then((json) => {
              setSkills([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!skills){
        getSkills();
        }
      }, []);

      const styles = {
        button: {
            alignItems: "center",
            backgroundColor: "black",
            borderRadius: 2,
            padding: 10,
            margin: 1,
            width: "100%",
            color: "white"
          }
    }

    return (
      <div>

      <div style = {{width: "100%"}}>
        <div className='grid-container'>
        {skillTypes.map(s => {
          return(
            <div className = 'grid-item' key= {s.key}>
                    <button 
                    style={styles.button}
                    onClick={() => {setActiveSkill(s.key)}}
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
        {!skills ? <p>information loading</p> : 
        skills && skills.map(s => {
        if(s.skill_type == activeSkill && s.name !== "Rat ogre stupidity"){
          return(
            <div className = 'grid-item' key= {s.id}>
            <p style = {{fontWeight: "bold"}}>{s.name} </p>
            <p style = {{fontStyle: "italic"}}>{s.skill_type}</p>
            <p >{s.description}</p>
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

  export default SkillScreen;