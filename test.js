const arr = [3,4,5,6,6,7,7,8,9]


  let arr2 = []

  for (let i = 0; i < arr.length; i++) {
    let isRepeated = false
    for (let j = 0; j < i; j++) {
      if (arr[i] === arr[j]) {
        //a b c d c
        isRepeated = true
      }
    }

    if (!isRepeated){
         arr2.push(arr[i])
    }
}

console.log(arr2)


let sonHal = []
for (let i = 0; i < updatedNotes.length; i++) {
  let isRepeated = false
  for (let j = 0; j < i; j++) {
    if (updatedNotes[i].id === updatedNotes[j].id) {
      //a b c d c
      isRepeated = true
    }
    if(!isRepeated){
      sonHal.push(updatedNotes[i])
    }
    
  }

  console.log(sonHal)
  