import React, { useState, useEffect } from 'react';
import base_api from './const'
import SearchComponent from './SearchComponent'
import {
  Link
} from "react-router-dom";

function Home(props) {

    const [data, setData] = useState([]);
    const [dataBCS, setDataBCS] = useState([]);
    const [temporadas, setTemporadas] = useState([]);
    const [temporadasBCS, setTemporadasBCS] = useState([]);
    
    useEffect(() => {
      async function fetchData() {
          try {
              const response = await fetch(
                base_api+'episodes?series=Breaking+Bad'
              );
              const json = await response.json();
              setData(json);

          } catch (e) {
              console.error(e);
          }
      };
      fetchData();
    }, []);

    useEffect(() => {
      async function fetchData() {
          try {
              const response = await fetch(
                base_api+'episodes?series=Better+Call+Saul'
              );
              const json = await response.json();
              setDataBCS(json);

          } catch (e) {
              console.error(e);
          }
      };
      fetchData();
    }, []);

    useEffect(() => {
      let temporadas_provisorio = []
      data.forEach((d) => {
        if (!temporadas_provisorio.includes(d.season)) {
            temporadas_provisorio.push(d.season);
        }});
      setTemporadas(temporadas_provisorio);
      
    }, [data]);

    useEffect(() => {
      let temporadas_provisorio = []
      dataBCS.forEach((d) => {
        if (!temporadas_provisorio.includes(d.season)) {
            temporadas_provisorio.push(d.season);
        }});
      setTemporadasBCS(temporadas_provisorio);
      
    }, [dataBCS]);
            
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  
    return (
      <div>
        <SearchComponent />
        <h1> Temporadas Breaking Bad </h1>
        <ul>
            {temporadas.map((temporada) => 
                <li key={temporada}>
                    <h2>Temporada numero {temporada}</h2>
                    <Link to={"/season/Breaking+Bad/" + temporada}>{"Temporada numero " + temporada}</Link>
                    
                </li>
            
            )}

        </ul>
        <h1> Temporadas Better Call Saul </h1>
        <ul>
            {temporadasBCS.map((temporada) => 
                <li key={temporada}>
                    <h2>Temporada numero {temporada}</h2>
                    <Link to={"/season/Better+Call+Saul/" + temporada}>{"Temporada numero " + temporada}</Link>
                </li>
            
            )}

        </ul>
      </div>
    );
  }

export default Home;
