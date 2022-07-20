const GetRandomData = (arr) => {
     var r = Math.floor(Math.random() * (arr.length-1))
     return arr[r]
}

export default GetRandomData