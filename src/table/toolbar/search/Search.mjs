import React, {useState} from 'react'
import SearchIcon from './SearchIcon.mjs'

const Search = ({searchable, search, onChangeSearch}) => {

  const [showSearch, setShowSearch]= useState(false)
  
  if (! searchable) {
    return null
  }


  return (

    <div className={`axt-toolbar-search`}>
      
      <div className="axt-toolbar-search-icon"
           onClick={() => setShowSearch(!showSearch)}>
        <SearchIcon />
      </div>
      {showSearch===true
      ?
        <div className="axt-toolbar-search-input">
          <input type="search"
                value={search}
                onChange={(ev) => onChangeSearch(ev.target.value)}
                placeholder="Busca..."/>
        </div>            
      : null}
    </div>

  )

}

export default Search