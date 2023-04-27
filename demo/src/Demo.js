import React from 'react'
import {Axustable} from '../../src/index.mjs'
import data from '../../test/data.cjs'

const fields = [
  {
    name: "id",
    label: "Id",
    className: "main"
  }, 
  {
    name: "first_name",
    label: "First Name"
  }, 
  {
    name: "last_name",
    label: "Last Name"
  },
  {
    name: "email",
    label: "Email"
  },
  {
    name: "phone",
    label: "Phone"
  },  
  {
    name: "nhs",
    label: "NHS Number"
  },   
  {
    name: "city",
    label: "City"
  },   
  {
    name: "country",
    label: "Country"
  },     
  {
    label: "Avatar", 
    render: (p, onEvent) => 
      <div style={{textAlign: "center"}}>
        <img src={p.avatar} width="25"></img>
      </div>,
    sortable: false,
    filterable: false
  } 
]
const Demo = ( )=> {
  return (
    <div>
      <h1>Welcome to axustable demo</h1>

      <Axustable
        data= {data}
        fields= {fields}
        config     = {{
          sort: [0, "asc"],
          export: true
        }}
        makeKey    = {(p) => `person_${p.id}`}/>
    </div>
  )
}

export default Demo
