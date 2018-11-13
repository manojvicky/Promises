
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
            let node = document.createElement("LI");                 // Create a <li> node
            let textnode = document.createTextNode(item);         // Create a text node
            node.appendChild(textnode);                              // Append the text to <li>
            document.getElementById("mydata").appendChild(node);
        })
    })
    .catch((err)=>{
        console.log("err", err);
        document.getElementById("loader").style.display = "none";
    });
}
function myFun(url){
setTimeout(()=>{ myFetch(url)}, 5000)
}

myFun("./Jsons/stories.json");