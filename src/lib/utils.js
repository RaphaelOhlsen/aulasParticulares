const Intl = require('intl');

module.exports = {
  age(timestamp){
    const today = new Date();
    const birthDate = new Date(timestamp);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {
      --age;
    }

    return age;
  },
  strToArr(str) {
    return str.split(',').map(el => el.trim());
  },
  timeFormat(timestamp) {
    return new Intl.DateTimeFormat("pt-BR").format(timestamp);
  },
  date(timestamp) {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);
    return {
      day,
      month, 
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }   
  },
  grade(grade) {
    switch (grade) {
      case '5EF':
        return '5° ano fundamental'
      case '6EF':
        return '6° ano fundamental'
      case '7EF':
        return '7° ano fundamental'
      case '8EF':
        return '8° ano fundamental';
      case '9EF':
        return '9° ano fundamental'
    }
    
  }
}
