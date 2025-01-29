

const FormatDate = ({ inputDate }) => {
  const date = new Date(inputDate)
  const monthNum = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }
  const month = months[monthNum]
  const formattedDate = `${month} ${day}, ${year}`

  return (
    formattedDate
  )
}

export default FormatDate
