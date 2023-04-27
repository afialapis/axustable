import {useState, useEffect} from 'react'

function _getDistincts(fields, data) {
  let distincts= {}

  fields.map((field) => {

    const fdistincts= new Set(data.map((rec) => field.value(rec)))
    distincts[field.name]= Array.from(fdistincts)
  })

  return distincts
}


function useDistincts(fields, data) {

  const [distincts, setDistincts]= useState(_getDistincts(fields, data))

  useEffect(() => {
    setDistincts(_getDistincts(fields, data))
  }, [fields, data])

  return distincts
}

export default useDistincts