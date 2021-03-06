import React, { useState, useEffect } from 'react';
import base_api from './const'
import './App.css';
import {
    Link
  } from "react-router-dom";
import {
    useParams
  } from "react-router-dom";

function Home(props) {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    let {serie, number} = useParams();
    const serie_with_plus = serie.replace(' ', '+')

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                  base_api+'episodes?series='+serie_with_plus
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
    let filtered_data_provisorio = []
    data.forEach((d) => {
        if (d.season == number) {
            filtered_data_provisorio.push(d);
        }});
    setFilteredData(filtered_data_provisorio);
    
    }, [data]);

    console.log(data);
    console.log(filteredData);
    
    return (
      <div className="content-div">
        <h2>Episodios temporada {number}</h2>
        <div>
            {filteredData.map((episode) =>
                <div>
                    <Link to={"/episode/" + episode.episode_id}>{"Capítulo número "+ episode.episode + " : " + episode.title}</Link>
                </div>
            )}

        </div>
      </div>
    );
  }

export default Home;