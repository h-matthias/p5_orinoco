let request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        for (let i in response){
            console.log("--------------------------");
            console.log(response[i]._id);
            console.log(response[i].name);
            console.log(response[i].price);
            console.log(response[i].description);
            console.log(response[i].lenses);
            console.log("--------------------------");
        }
    }
};
request.open("GET", "http://localhost:3000/api/cameras");
request.send();

