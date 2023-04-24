import { useEffect, useState } from "react"
import defaults from './defaults.mjs'

function _mergeConfig(config) {
  
  function _mergePages() {
    let value= {...defaults.pages}
    if (config!=undefined) {
      if (config?.pages!=undefined) {
        if (config.pages===false) {
          value.enabled= false
        } else if (typeof config.pages == 'object') {
          value= {
            ...defaults.pages,
            ...config.pages
          }
        }
      }
    }
    return value
  }
  
  function _mergeSort() {
    let value= {...defaults.sort}
    if (config!=undefined) {
      if (config?.sort!=undefined) {
        if (config.sort===false) {
          value.enabled= false
        } else if (config.sort===true) {
          value.enabled= true
          value.inital= undefined
        } else if (typeof config.sort == 'object') {
          value= {
            ...defaults.sort,
            ...config.sort
          }
        }
      }
    }
    return value
  }

  function _mergeExport() {
    let value= {...defaults.export}
    if (config!=undefined) {
      if (config?.export!=undefined) {
        if (config.export===false) {
          value.enabled= false
        } else if (config.export===true) {
          value.enabled= true
          value.fields= undefined
        } else if (typeof config.export == 'object') {
          value= {
            ...defaults.export,
            ...config.export
          }
        }
      }
    }
    return value
  }

  
  function _mergeStyle() {
    return {
      ...defaults.style,
      ...config?.style || {}
    }  
  }


  return {
    ...defaults, 
    ...config || {},

    pages: _mergePages(),
    sort: _mergeSort(),
    export: _mergeExport(),
    style: _mergeStyle() 
  }
}



function useConfig (config) { //{sortable, filterable, paginable, searchable, exportable, transparent, bordered}) {
  //const [config,  setConfig]= useState(_mergeConfig({sortable, filterable, paginable, searchable, exportable, transparent, bordered}))
  const [innerConfig,  setInnerConfig]= useState(_mergeConfig(config))

  /*useEffect(() => {
    setConfig(_mergeConfig({sortable, filterable, paginable, searchable, exportable, transparent, bordered}))
  }, [sortable, filterable, paginable, searchable, exportable, transparent, bordered])*/

  useEffect(() => {
    setInnerConfig(_mergeConfig(config))
  }, [config])


  return innerConfig
}

export default useConfig