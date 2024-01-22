const CheckIfIsInArray = (n, array) => {
     for (let index = 0; index < array.length; index++) 
          if(n === array[index]) return true
     return false
}

export default CheckIfIsInArray