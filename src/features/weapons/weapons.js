import React, { useEffect, useState } from 'react';

const WeaponScreen = () => {

  const [weapons, setWeapons] = useState()
  const weaponTypes = [{ key: "Close Combat" }, { key: "Ranged" }]
  const [rangedWeapons, setRangedWeapons] = useState()
  const [activeWeapon, setActiveWeapon] = useState("Close Combat")

  const getWeapons = () => {
    fetch(`https://mordheim-database.herokuapp.com/weapons`)
      .then((response) => response.json())
      .then((json) => {
        let ranged = json.filter(w => w.range !== "Close Combat" && w.range !== "Close combat")
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
    if (!weapons) {
      getWeapons();
    }
  }, []);


  const renderGridItem = (item) => {
    return (
      <div style={{ flex: 1, margin: "auto", }}>
        <div className='grid-container'>
          {weaponTypes.map(s => {
                let title = s.key.split()
                title[0] = title[0].toUpperCase()
                title = title.join()
            return (
              <div className='grid-item' key={s.key}>
                <button
                  className='buttonClass'
                  onClick={() => { setActiveWeapon(s.key) }}
                  style={{ color: "white", }}
                >{title}</button>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }

  const closeCombatWeapons = () => {
    return (weapons.map(w => {
      return (
        <div className='grid-container' key={w.id}>
          <p style={{ fontWeight: "bold" }}>{w.name} </p>
          <p style={{ fontStyle: "italic" }}>{w.cost !== "0" ? `${w.cost} Gold crowns` : "Free"}</p>
          <p>{w.rarity}</p>
          {/* <p>{w.range !== "Close Combat" ? "Range: " : null}{w.range}</p> */}
          <p>Strength: {w.strength == "" ? "As user" : w.strength}</p>
          {w.special_rules !== [] ? w.special_rules.map(r => {
            let name = r.name.replace(/\_/g, "-")
            let desc = r.description.replace(/\_/g, "-")
            desc = desc.replace(/\  /g, "")
            return (<>
              <p style={{ fontStyle: "italic", fontWeight: "bold" }}>{name}</p>
              <p >{desc}</p>
            </>
            )
          }) : null}
        </div>
      )
    }

    )
    )
  }
  const ranged_Weapons = () => {
    return (rangedWeapons.map(w => {
      return (
        <div className='grid-container' key={w.id}>
          <p style={{ fontWeight: "bold" }}>{w.name} </p>
          <p style={{ fontStyle: "italic" }}>{w.cost !== "0" ? `${w.cost} Gold crowns` : "Free"}</p>
          <p>{w.rarity}</p>
          <p>Range: {w.range}</p>
          <p >Strength: {w.strength == "" ? "As user" : w.strength}</p>
          {w.special_rules !== [] ? w.special_rules.map(r => {
            let name = r.name.replace(/\_/g, "-")
            let desc = r.description.replace(/\_/g, "-")
            desc = desc.replace(/\  /g, "")
            return (<>
              <p style={{ fontStyle: "italic", fontWeight: "bold" }}>{name}</p>
              <p >{desc}</p>
            </>
            )
          }) : null}
        </div>
      )
    }

    )
    )
  }

  return (<>

    <div style={{ flex: 1, }}>
      {renderGridItem()}
      <div style={{ marginBottom: 100 }}>
        <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <div className='grid-container'>
            {!weapons ? <p>information loading</p> :
              weapons && activeWeapon == "Close Combat" && closeCombatWeapons()}
            {!rangedWeapons ? null :
              rangedWeapons && activeWeapon == "Ranged" && ranged_Weapons()}
          </div>

        </div>

      </div>
    </div>
  </>
  );
}

export default WeaponScreen;