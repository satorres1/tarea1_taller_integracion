import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import base_api from './const'

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [characterListDefault, setCharacterListDefault] = useState();
  const [characterList, setCharacterList] = useState();
  const [limit, setLimit] = useState(0);
  const [offset, setOffset] = useState(0);

  const fetchData = async () => {
    return await fetch(base_api+'characters?limit='+String(limit)+'&offset='+String(offset))
      .then(response => response.json())
      .then(data => {
        setCharacterList(data) 
        setCharacterListDefault(data)
       });}

  const updateInput = async (input) => {
     const filtered = characterListDefault.filter(character => {
      return character.name.includes(input)
     })
     setInput(input);
     setCharacterList(filtered);
  }

  useEffect( () => {fetchData()},[]);
	
  return (
    <>
      <SearchBar 
       input={input} 
       onChange={updateInput}
      />
      <SearchList searchList={characterList} input={input}/>
    </>
   );
}

export default SearchPage