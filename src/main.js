
function myFetch(url){
    fetch(url).then((response)=>{
    console.log("response", response);
    return response.json();
    })
    .then((data)=>{
        console.log("data", data);
        document.getElementById("loader").style.display = "none";
        document.getElementById("mydata").style.display = "block";
        data.data.map((item, index)=>{
            let node = document.createElement("LI");                 
            let textnode = document.createTextNode(item);         
            node.appendChild(textnode);                            
            document.getElementById("mydata").appendChild(node);
        })
    })
    .catch((err)=>{
        console.log("err", err);
        document.getElementById("loader").style.display = "none";
    });
}
function myFun(url){
setTimeout(()=>{ myFetch(url)}, 1000)
}

myFun("./src/Jsons/stories.json");