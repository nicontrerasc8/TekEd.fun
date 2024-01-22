const GetMediana = (arr, Order) => {
     if(Order){
          arr.sort(function(a, b) {
               return a - b;
             });
     }
     var result
     if(arr.length % 2 == 0) {
          var first = arr[(arr.length) / 2]
          var second = arr[Math.floor((arr.length - 1) / 2)]
          result = ((first+second)/2)
     }
     else result = arr[(arr.length - 1) / 2]
     return result
}

export default GetMediana