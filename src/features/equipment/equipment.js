import '../../App.css';
import React, {useEffect, useState} from 'react';

const EquipmentScreen = () => {

  const [equipment, setEquipment] = useState()

      const getEquipment = () => {
        fetch(`https://mordheim-database.herokuapp.com/equipment`)
          .then((response) => response.json())
          .then((json) => {
              setEquipment([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!equipment){
        getEquipment();
        }
      }, []);
    
    return (
      <div style = {{marginBottom: 40}}>
        <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <div className='grid-container'>
          {!equipment ? <p>information loading</p> : 
          equipment && equipment.map(e => {
            let description = e.description.replace(/\  /g, "")
            return(
              <div className='grid-item' key= {e.id}>
                <p style = {{fontWeight: "bold"}}>{e.name} </p>
                <p style = {{fontStyle: "italic"}} >{e.cost} Gold crowns</p>
                <p>{e.rarity}</p>
                <p className='textBottom'>{description}</p>
              </div>)
          })}
          </div>
        </div>
      </div>
    );
  }

  export default EquipmentScreen;