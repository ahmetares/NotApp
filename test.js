
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




const bulkDeletedNotes = ['a','b','c','d','e','f']
const arr2 = ['a','b','c']



for (var i = arr2.length -1; i >= 0; i--)
bulkDeletedNotes.splice(arr2[i],1);   //Remove 1 element at arr2[i]

   console.log('yeniBulkDelete:' , bulkDeletedNotes)




const ourNotes = [{"date": "2023-03-20T15:22:10.184Z", "id": 34853, "isPinned": false, "note": "34"},{"date": "2023-03-20T15:23:10.184Z", "id": 34854, "isPinned": false, "note": "aaaaaa"}];

const bulk = [{"date": "2023-03-20T15:22:10.184Z", "id": 34853, "isPinned": false, "note": "34"}];
const bulkIds = bulk.map(note => note.id);

const filteredNotes = ourNotes.filter(note => !bulkIds.includes(note.id));

console.log('our new notes: ',filteredNotes); // Output: [{date: '2023-03-20T15:23:10.184Z',id: 34854,isPinned: false,note: 'aaaaaa'}]









const a = ''

console.log(!a? 'evet çalışmadı' : 'hayır hala dolu ')