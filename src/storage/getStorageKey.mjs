
const getStorageKey = (fields) => {
  const flds= fields.map((f) => f.label).join('_').toLowerCase()
  let num=0
  flds.split('').map((c) => {num+= c.charCodeAt()})
  return `axustable_rows_${num}`
}

export default getStorageKey