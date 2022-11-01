
import '../../App.css';
import React, {useEffect, useState} from 'react';

const MutationsScreen = () => {

  const [mutation, setMutations] = useState()
  
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
        if(!mutation){
        getMutations();
        }
      }, []);

    const displayMutations = () => {
      return( mutation.map(w => {
        return(
          <div className='grid-item' key= {w.id}>
            <p style = {{fontWeight: "bold"}}>{w.name} </p>
            <p style = {{fontStyle: "italic"}}>{w.cost !== "0" ? `${w.cost} Gold crowns` : "Free"}</p>
            <p>{w.description}</p>
            </div>
        )}
      
      )
    )
    }

    return (
    <div style = {{flex: 1,}}>
      <div style = {{marginBottom: 100}}>
        <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <div className='grid-container'>
          {!mutation ? <p>information loading</p> :
          mutation && displayMutations()}
          </div>
        </div>
      </div>
    </div>
    );
  }

  export default MutationsScreen;