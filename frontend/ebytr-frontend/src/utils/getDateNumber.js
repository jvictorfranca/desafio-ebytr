const getDateNumber = (date) => {
  const dateArray = date.split('/')
  const USDate = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`
  console.log(date ,USDate, Date.parse(USDate))
  return Date.parse(USDate)
}

export default getDateNumber