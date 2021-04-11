import React from 'react';
import {
  Link
} from "react-router-dom";

const SearchList = ({searchList=[], input}) => {
  let char_count = 0;
  if (input) {
  return (
    <>
    <ul>
    { searchList.map((data,index) => {
        if (data) {
          const character_name = data.name.replace(' ', '+')
          const link = "/characters/" + character_name;
          char_count += 1;
          return (
            <div>    
                <li key={char_count}>
                    <Link to={link}>{data.name}</Link>
                </li>
	        </div>	
    	   )	
    	 }
    	 return null
    }) }
    </ul>
    </>
  );}
  return null;
}

export default SearchList