
function get(url){
    return fetch(url)
}
function getJson(url){
return get(url).then((response)=>{
    return response.json();
});
}
getJson("./src/Jsons/stories.json")
.then((data)=>{
    console.log("data bilkul outside", data);
    data.chapterUrls.map((chapterurl, index)=>{
        getJson(`./src/Jsons/${chapterurl}`)
        .then((data)=>{
            console.log("data in each chapter", data);
            let {title, details} = data.data;
            console.log("yooy yoooy" , title, details)
            document.getElementById("loader").style.display = "none";
            document.getElementById("mydata").style.display = "block";
            let mainNode = document.createElement("div");
            let spanNode = document.createElement("span");                 
            let spanTextNode = document.createTextNode(title);         
            let mainTextNode = document.createTextNode(details);         
            mainNode.appendChild(mainTextNode); 
            spanNode.appendChild(spanTextNode);
            document.getElementById("mydata").appendChild(spanNode);
            document.getElementById("mydata").appendChild(mainNode);
        })
        .catch((error)=>{
            console.log("error in loading chapter data", error);
            document.getElementById("loader").style.display = "none";
            document.getElementById("mydata").style.display = "block";
            let mainNode = document.createElement("div");
            let mainTextNode = document.createTextNode("error while reteriving data");         
            mainNode.appendChild(mainTextNode); 
            document.getElementById("mydata").appendChild(mainNode);
        });
    });
})
.catch((error)=>{
    console.log("error in loading chapter urls", error);
    document.getElementById("loader").style.display = "none";
    document.getElementById("mydata").style.display = "block";
    let mainNode = document.createElement("div");
    let mainTextNode = document.createTextNode("error while reteriving data");         
    mainNode.appendChild(mainTextNode); 
    document.getElementById("mydata").appendChild(mainNode);
});