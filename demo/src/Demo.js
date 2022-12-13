import React from 'react'
import {Axustable} from '../../src/index.mjs'
import data from '../../test/data.cjs'

import './demo.scss'

const fields = [
  {
    label: "Id",
    className: "main", 
    value: (p) => p.id
  }, 
  {
    label: "First Name", 
    value: (p) => p.first_name
  }, 
  {
    label: "Last Name", 
    value: (p) => p.last_name
  },
  {
    label: "Email", 
    value: (p) => p.email
  },
  {
    label: "Phone", 
    value: (p) => p.phone
  },  
  {
    label: "NHS Number", 
    value: (p) => p.nhs
  },   
  {
    label: "City", 
    value: (p) => p.city
  },   
  {
    label: "Country", 
    value: (p) => p.country
  },     
  {
    label: "Avatar", 
    render: (p, onEvent) => 
      <div style={{textAlign: "center"}}>
        <img src={p.avatar} width="25"></img>
      </div>
  } 
]
const Demo = ( )=> {
  return (
    <div>
      <h1>Welcome to axustable demo</h1>

      <Axustable
        data= {data}
        fields= {fields}
        initialSort= {[0, "asc"]}
        makeKey    = {(p) => `person_${p.id}`}/>
    </div>
  )
}

export default Demo
