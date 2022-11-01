import '../../App.css';
import React, {useEffect, useState} from 'react';

const ArmourScreen = () => {

  const [armour, setArmour] = useState()

      const getArmour = () => {
        fetch(`https://mordheim-database.herokuapp.com/armours`)
          .then((response) => response.json())
          .then((json) => {
            setArmour([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!armour){
        getArmour();
        }
      }, []);

    const displayArmour = () => {
      return( armour.map(w => {
        return(
          <div className='grid-item' key={w.id}>
            <p style = {{fontWeight: "bold"}}>{w.name}</p>
            <p style = {{fontStyle: "italic"}}>{w.cost !== "0" ? `${w.cost} Gold crowns` : "Free"}</p>
            <p>{w.rarity}</p>
            {w.saving_throw !== "-" ? <p>Saving throw: {w.saving_throw}</p> : null}
            {w.special_rules.length > 0 ? w.special_rules.map(r => {
                let name = r.name.replace(/\_/g, "-")
                let desc = r.description.replace(/\_/g, "-")
                desc = desc.replace(/\  /g, "")
                return(<>
                <p style = {{fontStyle: "italic", fontWeight: "bold"}}>{name == "Shielded" ? "Optional rule: " : ""}{name}</p>
                <p className='textBottom'>{desc}</p>
                </>
                )
            }) : <p></p>}
            </div>
        )}
      )
    )
    }
  
    return (
    <div style = {{flex: 1,}}>
      <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <div className='grid-container'>
        {!armour ? <p>information loading</p> :
        armour && displayArmour()}
        </div>
       
      </div>

      </div>
    );
  }

  export default ArmourScreen;