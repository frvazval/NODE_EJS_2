function deleteTravel(id) {
    // console.log(id);
    fetch (`/delete/${id}`, {
        method: "delete"
    })
    .then (response => {
        response.json()       
       })
    .then (data => {
        location.reload();      
        // setTimeout(() => location.reload(), 300);        
    }).catch(err => console.log(err))
}