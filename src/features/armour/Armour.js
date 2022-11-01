
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

    const displayArmour = () => {
      return( armour.map(w => {
        return(
          <div style={styles.textContainerStyle} className='sausages' key={w.id}>
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
                <p style = {styles.pBottom}>{desc}</p>
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
        
        <div style={styles.containerStyle}>
        {!armour ? <p>information loading</p> :
        armour && displayArmour()}
        </div>
       
      </div>

      </div>
    );
  }

  export default ArmourScreen;