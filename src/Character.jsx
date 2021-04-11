import React, { useState, useEffect } from "react";
import base_api from './const'
import {
  Link
} from "react-router-dom";
import {
  useParams
} from "react-router-dom";

function Character(props) {
  let {name} = useParams();
  const name_with_plus = name.replace(' ', '+')
  let occupation_count = 0;
  let appearance_bb_count = 0;
  let appearance_bcs_count = 0;

  const [data, setData] = useState({});
  const [frases, setFrases] = useState([]);

  useEffect(() => {
      // GET request using fetch inside useEffect React hook
      fetch(base_api+'characters?name='+name_with_plus)
          .then(response => response.json())
          .then(data => setData(data[0]));

      
      fetch(base_api+'quote?author='+name_with_plus)
          .then(response => response.json())
          .then(frases => setFrases(frases));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div>
      <h2>Nombre: {data.name}</h2>
      
      <h2>Ocupación: </h2>
      <ul>
        {data.occupation && data.occupation.map((o) => {
          occupation_count += 1;
          return (
            <li key={occupation_count}>
              <h3>{o}</h3>
            </li>
          );
        })}
      </ul>

      <h2>Imagen: </h2>
      <img src={data.img} alt="Imagen" width="100" height="132"></img>
      <h2>Estado: {data.status}</h2>
      <h2>Apodo: {data.nickname}</h2>

      <h2>Apariciones en BB: </h2>
      <ul>
        {data.appearance && data.appearance.map((temporada) => {
          appearance_bb_count += 1;
          return (
            <li key={appearance_bb_count}>
              <Link to={"/season/Breaking+Bad/" + temporada}>{"Temporada numero " + temporada}</Link>
            </li>
          );
        })}
      </ul>

      <h2>Apariciones en BCS: </h2>
      <ul>
        {data.better_call_saul_appearance && data.better_call_saul_appearance.map((temporada) => {
          appearance_bcs_count += 1;
          return (
            <li key={appearance_bcs_count}>
              <Link to={"/season/Better+Call+Saul/" + temporada}>{"Temporada numero " + temporada}</Link>
            </li>
          );
        })}
      </ul>

      <h2>Actor/Actriz: {data.portrayed}</h2>
      <h2>Categoria: {data.category}</h2>
      <h2>Frases del personaje: </h2>
      <ul>
        {frases && frases.map((frase) => {
          return (
            <li key={frase.quote_id}>
              <h2>{frase.quote}</h2>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Character;