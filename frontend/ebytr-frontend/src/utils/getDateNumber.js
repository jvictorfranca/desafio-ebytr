const getDateNumber = (date) => {
  const dateArray = date.split('/')
  const USDate = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`
  return USDate
}

export default getDateNumber