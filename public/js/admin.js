function deleteTravel(id) {
    // console.log(id);
    fetch (`/delete/${id}`, {
        method: "delete"
    })
    .then (response => response.json())
    .then (data => {
        location.reload()
    })
}