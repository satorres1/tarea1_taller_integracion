import React from 'react';
import {
  Link
} from "react-router-dom";

const SearchList = ({searchList=[], input}) => {
  let char_count = 0;
  if (input) {
  return (
    <>
    <div className="search-list">
    { searchList.map((data,index) => {
        if (data) {
          const character_name = data.name.replace(' ', '+')
          const link = "/characters/" + character_name;
          char_count += 1;
          return (
            <div>    
                  <Link to={link}>{data.name}</Link>
	          </div>	
    	   )	
    	 }
    	 return null
    }) }
    </div>
    </>
  );}
  return null;
}

export default SearchList