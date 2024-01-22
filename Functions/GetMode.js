const GetMode = (arr) => {
     // encontramos los minimos y máximos del arreglo
  var min = arr[0]
  var max = arr[0]

  for (let i = 0; i < arr.length; i++) {
    if(arr[i] < min)min = arr[i]
  }
  for (let i = 0; i < arr.length; i++) 
    if(arr[i] > max) 
      max = arr[i]
  
  var Array = []
  var counter
  var maxCounter = 0

  for (let i = min; i <= max; i++) {
    counter = 0
    for (let j = 0; j < arr.length; j++) {
      if(arr[j] == i) 
        ++counter
    }
      if(counter > maxCounter) maxCounter = counter
        Array.push({
          n: i,
          c: counter
        })
    }
    var modeArr = []
    for (let i = 0; i < Array.length; i++) {
      if(Array[i].c == maxCounter) 
        modeArr.push(Array[i].n)
      }
      var finalResult
      var aux = arr
    if(modeArr.length > 1){
      
      var Randomic = Math.floor(Math.random() * (modeArr.length))
      finalResult = modeArr[Randomic]

      aux.push(finalResult)
    }
    else finalResult = modeArr[0]
    return {aux, finalResult}
}

export default GetMode