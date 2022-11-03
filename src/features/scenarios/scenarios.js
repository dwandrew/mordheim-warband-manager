import React, {useEffect, useState} from 'react';


const ScenarioScreen = () => {

  const [scenarios, setScenarios] = useState()
  

      const getScenarios = () => {
        fetch(`https://mordheim-database.herokuapp.com/scenarios`)
          .then((response) => response.json())
          .then((json) => {
            
            setScenarios([...json])
          })
          .catch((error) => {
            console.error(error);
          });
      };

      useEffect(() => {
        if(!scenarios){
        getScenarios();
        }
      }, []);

    const displayScenarios = () => {
      return( scenarios.map(s => {
          
        return(
          <div className= "grid-item" key= {s.id}>
            <p style = {{fontWeight: "bold", fontSize: 16}}>{s.name} </p>
            <p style = {{fontStyle: "italic"}}>Scenario Number: {s.id} </p>
            <p  className= "inner-title"> Description:</p>
            <p >{s.description} </p>
            <p  className= "inner-title">Terrain:</p>
            <p >{s.terrain} </p>
            <p  className= "inner-title">Warbands: </p>
            <p >{s.warbands} </p>
            <p  className= "inner-title">Starting: </p>
            <p >{s.starting} </p>
            <p  className= "inner-title">Ending: </p>
            <p >{s.ending} </p>
            <p  className= "inner-title">Experience: </p>
            <p >{s.experience} </p>

            {s.wyrdstone !== "" ? <>
            <p  className= "inner-title">Wyrdstone: </p>
            <p>{s.wyrdstone}</p> 
            </>: null}
            {s.special_rules!=="" ? <>
            <p  className= "inner-title">Special Rules: </p>
            <p >{s.special_rules} </p>
            </>
            : null}
                       
        </div>
        )}
      
      )
    )
    }
  


    return (
    <div style = {{flex: 1,}}>
      <div style = {{marginBottom: 100}}>
      <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
        <div className="grid-container">
        {!scenarios ? <p>information loading</p> :
        scenarios && displayScenarios()}
        </div>
       
      </div>

      </div>
      </div>
    );
  }

  export default ScenarioScreen;