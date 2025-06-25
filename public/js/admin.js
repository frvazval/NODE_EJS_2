const sectionInsert = document.getElementById("insert");
const sectionUpdate = document.getElementById("update");
sectionUpdate.style.display= "none";


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

function editTravel(travel) {
    sectionInsert.style.display = "none";
    sectionUpdate.style.display = "block";
    
    const newTravel = JSON.parse(travel)
    console.log(newTravel);
}