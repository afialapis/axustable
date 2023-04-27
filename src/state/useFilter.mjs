import {useState, useEffect, useCallback} from 'react'

function useFilter(fields, distincts) {

  const [filteringField, setFilteringField]= useState(undefined)
  const [filterData, setFilterData]= useState([])
  const [filteredIndexes, setFilteredIndexes]= useState([])


  useEffect(() => {

    let fIndexes= []
    filterData.map((col,idx) => {
      if (col!=undefined) {
        col.map((value,_) => {
          const [_val,show]= value
          if (show==false) {
            fIndexes.push(idx)
            return  
          }
        })
        
      }
    })
    setFilteredIndexes(fIndexes)

  }, [filterData])

  const handleClearFilter = useCallback(() => {
    //let zeroFilter= fields.map((_) => undefined)
    setFilterData([] /*zeroFilter*/)
  }, [/*fields*/])
  
  const handleFilterOpen= useCallback((fieldIdx, field) => {
    if (field.filterable) {
      if (filterData[fieldIdx] == undefined) {
        let nFilterData= [...filterData]
        const fdata= distincts[field.name].map(v => [v, true])
        nFilterData[fieldIdx]= fdata
        setFilterData(nFilterData)
      }
      setFilteringField(fieldIdx)
    }
  }, [filterData, distincts])

  const handleFilterClose = useCallback(() => {
    setFilteringField(undefined)
  }, [])

  const handleFilterSet = useCallback((filteringField, values) => {
    const nFilterData= [...filterData]
    nFilterData[filteringField]= values
    setFilterData(nFilterData)
    setFilteringField(undefined)
  }, [filterData])
  
  

  return [filteringField, filterData, filteredIndexes, handleClearFilter, handleFilterOpen, handleFilterClose, handleFilterSet]

}

export default useFilter