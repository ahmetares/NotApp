
//ilk hali           [ 'ts (2 min)', 'pyt (5 min)', 'css (10 min)', 'js (12 min)', 'java (15 min)' ]

//js en öne geldi =  [ 'js (12 min)' ||||||| , 'ts (2 min)', 'pyt (5 min)', 'css (10 min)', 'java (15 min)' ]

//pyt en öne geldi = [ 'pyt (5 min)', 'js (12 min)', ||||||||| 'ts (2 min)', 'css (10 min)', 'java (15 min)' ]

//js ve pyt pinned = true   ,,,, pinned = false kendi arasında sıralandı



const arr = [ 'pyt', 'js', 'ts', 'css', 'java' ];

const fromIndex = arr.indexOf('pyt'); // 👉️ 2

const element = arr.splice(fromIndex, 1)[0];  // ['ts']

const toIndex = 0

arr.splice(toIndex, 0, element);

console.log(arr); // 👉️ ['js', 'ts', 'css']




const arr1 = [1,2,3]
const arr2 = [4,5,6]
console.log(arr1.concat(arr2))


const arr3 = ['aaaaa', 'bbbbbb']
const arr4 = []
arr4.push(arr3[1])
arr3.pop(arr3[1])

console.log(arr3)
console.log(arr4)