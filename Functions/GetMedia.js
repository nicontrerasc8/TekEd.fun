const GetMedia = (arr) => {
     
     var counter = 0
     for (let i = 0; i < arr.length; i++) 
          counter+=arr[i]
     counter/=arr.length

     return counter
}

export default GetMedia