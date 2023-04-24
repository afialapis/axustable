const AXUSTABLE_DEFAULTS= {
  filterable: true, 
  searchable: true, 
  
  pages: {
    enabled: true,
    rows: 15,
  },

  sort: {
    enabled: true,
    initial: undefined
  },  

  export: {
    enabled: true,
    fields: undefined,
    name: 'document'
  },

  style: {
    transparent : true, 
    bordered : false, 
  }
}

export default AXUSTABLE_DEFAULTS