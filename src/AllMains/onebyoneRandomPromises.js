
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
    let sendData = data.chapterUrls.map((chapterurl)=>{
        return getJson(`./src/Jsons/${chapterurl}`);
    });
    return sendData;
})
.then((data)=>{
    console.log("data in each chapter", data);
    let errorsInside;
    document.getElementById("loader").style.display = "none";
    document.getElementById("mydata").style.display = "block";

    data.map((chapterData)=>{
        chapterData
        .then((inComingdata)=>{
            let {title, details} = inComingdata.data;
            // console.log("error in loading chapter urls", error);
            let mainNode = document.createElement("div");
            let spanNode = document.createElement("span");                 
            let spanTextNode = document.createTextNode(title);         
            let mainTextNode = document.createTextNode(details);
            let mainNodeDiv = document.createElement("div");         
            mainNode.appendChild(mainTextNode); 
            spanNode.appendChild(spanTextNode);
            mainNodeDiv.appendChild(spanNode);
            mainNodeDiv.appendChild(mainNode);
            document.getElementById("mydata").appendChild(mainNodeDiv);
        })
        .catch((error)=>{
            console.log("error inside", error);
            document.getElementById("loader").style.display = "none";
            document.getElementById("mydata").style.display = "block";
            let mainNode = document.createElement("div");
            let mainTextNode = document.createTextNode("error while reteriving data");         
            mainNode.appendChild(mainTextNode); 
            document.getElementById("mydata").appendChild(mainNode);
            return Promise.reject(error)
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