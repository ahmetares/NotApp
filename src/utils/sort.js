export default  function (data) {
    return data.sort(function(a, b) {
        return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
    })
}
