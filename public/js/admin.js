const sectionInsert = document.getElementById("insert");
const sectionUpdate = document.getElementById("update");
sectionUpdate.style.display= "none";
const dataUpdate = document.getElementById('dataUpdate');



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
    // console.log(newTravel);

    
    document.getElementById("update_id").value = newTravel.id;
    document.getElementById("update_ruta").value = newTravel.ruta;    
    document.getElementById("update_lugar").value = newTravel.lugar;
    document.getElementById("update_nombre").value = newTravel.nombre;
    document.getElementById("update_descripcion").value = newTravel.descripcion;
    document.getElementById("update_precio").value = newTravel.precio;
    document.getElementById("update_img").value = newTravel.img;
    
}

dataUpdate.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(dataUpdate);
    const datosFormulario = Object.fromEntries(formData);
    console.log(datosFormulario);

})