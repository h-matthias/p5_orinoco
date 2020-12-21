
let params = new URLSearchParams(document.location.search);
let idCameras = params.get("id")
console.log(idCameras);

let cam
fetch("http://localhost:3000/api/cameras/" + idCameras)
    .then(res => res.json())
    .then(res => {
        cam=res;
        console.log(cam);
    })
    .catch(error => console.error(error))