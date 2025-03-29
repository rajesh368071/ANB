function getFormattedDateDDMMYYYY(date = new Date()) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    console.log(`${day}/${month}/${year}`);
    return `${day}/${month}/${year}`;
}
getFormattedDateDDMMYYYY();

function getThirtiethDayFormatted(nextTotalDay) {
    const today = new Date();
    const thirtiethDay = new Date(today);
    thirtiethDay.setDate(today.getDate() + nextTotalDay);
  
    // Format the date as DD/MM/YYYY
    const day = String(thirtiethDay.getDate()).padStart(2, '0'); // Ensure two digits for the day
    const month = String(thirtiethDay.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = thirtiethDay.getFullYear();

    return `${day}/${month}/${year}`;
  }

module.exports = {
    getFormattedDateDDMMYYYY,
    getThirtiethDayFormatted,
}