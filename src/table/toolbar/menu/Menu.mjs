import React from 'react'
import MenuIcon from './MenuIcon.mjs'

import { Menu, Item, Separator, Submenu, useContextMenu, use } from 'react-contexify';
import 'react-contexify/ReactContexify.css';

const MENU_ID = 'blahblah';

const MenuMenu = ({filterable, hasSomeFilter, onClearFilter, exportable, onExportFile}) => {
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  function handleContextMenu(event){
      show({
        event,
        props: {
            key: 'value'
        }
      })
  }

  // I'm using a single event handler for all items
  // but you don't have too :)
  const handleItemClick = ({ id, event, props }) => {
    switch (id) {
      case "copy":
        console.log(event, props)
        break;
      case "cut":
        console.log(event, props);
        break;
      //etc...
    }
  }  

  return (

    // USO NEW ICONS

    <div> 
      <MenuIcon onClick  = {handleContextMenu}
              disabled = {false}/>

      <Menu id={MENU_ID}>
        <Item id="copy" onClick={handleItemClick}>
          <MenuIcon></MenuIcon>
          Menu
        </Item>
        <Item id="cut" onClick={handleItemClick}>Cut</Item>
        <Separator />
        <Item disabled>Disabled</Item>
        <Separator />
        <Submenu label="Foobar">
          <Item id="reload" onClick={handleItemClick}>Reload</Item>
          <Item id="something" onClick={handleItemClick}>Do something else</Item>
        </Submenu>
      </Menu>
    </div>

  )
}

export default MenuMenu