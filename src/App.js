import React, { useEffect, useState } from "react";
import './App.css'
function App() {
  const [getList,setList]=useState([])
  const [getAPI,setAPI]=useState('https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1')
  const [getModal,setModal] = useState(false);
  const [getId,setId]=useState(0)
  const getAllDetails=async()=>{
    try{
      let response=await fetch(getAPI)
      let data=await response.json();
      setAPI(data[0].next)
      console.log(data[0])
      let list=data[0].results
      // If you use forEach it will give random data
      // list.forEach(async item=>{
      //   let response=await fetch(item.url)
      //   let result=await response.json()
      //   console.log(result)
      // })
      // To get the sequential data use for loop
      for await(let obj of list){
        let response=await fetch(obj.url)
        let pokemondata=await response.json()
        setList((prev)=>[...prev,pokemondata[0]]);
        // console.log(pokemondata[0])
      }
    }
    catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    getAllDetails();
  },[])

  const nextLoadData=()=>{
    getAllDetails();
  }
  const modalEventHandler=(id)=>{
    console.log(id);
    setId(id);
    setModal(!getModal);
  }
  return (
    <div id='parent'>
      <div id='section'>
        <div className='content'>
          <h2>PokeMon</h2>
          <h2>PokeMon</h2>
        </div>
        <div className='content2'>
          <h2>KingDom</h2>
          <h2>KingDom</h2>
        </div>
      </div>
    <div className="App">
      <div className="app-container">
        <div className="pokemon-container">
          <div className="all-container">
            {getList.map((obj, index) => {
              return (<div key={index} className={`thumb-container ${obj.type}`}>
                <div className="number">
                  <small>#{obj.id}</small>
                </div>
                <img src={obj.image} alt={obj.name} />
                <div className="detail-wrapper">
                  <h3>{obj.name.toUpperCase()}</h3>
                  <small>Type: {obj.type}</small>
                  <button className="pokeinfo" onClick={()=>modalEventHandler(index)}>Know more...</button>
                </div>
              </div>)
            })}
          </div>
          <button className="load-more" onClick={nextLoadData} >More Pokemons</button>
        </div>
      </div>
      </div>
      {getModal && <div className={`expanded-overlay ${getList[getId].type} visible`}><button onClick={modalEventHandler} className="close-button normal ">X</button>
        <div className="expanded-left"><img className="expanded-image"
         src={getList[getId].image} alt={getList[getId].name} />
          <h3 className="expanded-name">{getList[getId].name}</h3>
        </div>
        <div className={`expanded-right  ${getList[getId].type} `}>
          <table className={`expanded-table ${getList[getId].type} `}>
            <tbody>
              <tr>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>Weight:</td>
                        <td>{getList[getId].weight}</td>
                      </tr>
                      <tr>
                        <td>Height:</td>
                        <td>{getList[getId].height}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>Stat1:</td>
                        <td>{getList[getId].stats[0].stat.name}</td>
                      </tr>
                      <tr>
                        <td>Stat2:</td>
                        <td>{getList[getId].stats[1].stat.name}</td>
                      </tr>
                      <tr>
                        <td>Stat3:</td>
                        <td>{getList[getId].stats[2].stat.name}</td>
                      </tr>
                      <tr>
                        <td>Stat4:</td>
                        <td>{getList[getId].stats[3].stat.name}</td>
                      </tr>
                      <tr>
                        <td>Stat5:</td>
                        <td>{getList[getId].stats[4].stat.name}</td>
                      </tr>
                      <tr>
                        <td>Stat6:</td>
                        <td>{getList[getId].stats[5].stat.name}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                        <td>Bs1:</td>
                        <td>{getList[getId].stats[0].base_stat}</td>
                      </tr>
                      <tr>
                        <td>Bs2:</td>
                        <td>{getList[getId].stats[1].base_stat}</td>
                      </tr>
                      <tr>
                        <td>Bs3:</td>
                        <td>{getList[getId].stats[2].base_stat}</td>
                      </tr>
                      <tr>
                        <td>Bs4:</td>
                        <td>{getList[getId].stats[3].base_stat}</td>
                      </tr>
                      <tr>
                        <td>Bs5:</td>
                        <td>{getList[getId].stats[4].base_stat}</td>
                      </tr>
                      <tr>
                        <td>Bs6:</td>
                        <td>{getList[getId].stats[5].base_stat}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>} 

      </div>
  );
}

export default App;
