// Promise.reject
fetch("https://jsonplaceholder.typicode.com/comments/1s")
.then((response)=>{
    console.log("status", response);
    if(response.ok && response.status===200){
        return response.json();
    }else{
        return Promise.reject({status: response.status, statusText: response.statusText, ok: response.ok});
    }
})
.then((data)=>{
    console.log("data", data)
})
.catch((error)=>{
    console.log("error inside", error);
})

// Throw error but not caught in outside catch
fetch("https://jsonplaceholder.typicode.com/comments/1s")
.then((response)=>{
    console.log("status", response);
    try{

    if(response.ok && response.status===200){
        return response.json();
    }else{
        throw {status: response.status, statusText: response.statusText, ok: response.ok};
    }
    }
    catch(err){console.log("error in try", err); return err;}
    
})
.then((data)=>{
    console.log("data", data)
})
.catch((error)=>{
    console.log("error inside", error);
})


// Throw error caught in outside catch
fetch("https://jsonplaceholder.typicode.com/comments/1s")
.then((response)=>{
    console.log("status", response);
    try{

    if(response.ok && response.status===200){
        return response.json();
    }else{
        throw {status: response.status, statusText: response.statusText, ok: response.ok};
    }
    }
    catch(err){console.log("error in try", err); return Promise.reject({status: response.status, statusText: response.statusText, ok: response.ok});}
    
})
.then((data)=>{
    console.log("data", data)
})
.catch((error)=>{
    console.log("error inside", error);
})

// throw new Error object but by using THROW we can't catch errors in other catch methods except try's catch statment  
fetch("https://jsonplaceholder.typicode.com/comments/1s")
.then((response)=>{
    console.log("status", response);
    try{

    if(response.ok && response.status===200){
        return response.json();
    }else{
        throw new Error({status: response.status, statusText: response.statusText, ok: response.ok});
    }
    }
    catch(err){console.log("error in try", err); return err;}
    
})
.then((data)=>{
    console.log("data", data)
})
.catch((error)=>{
    console.log("error inside", error);
})
//output of above
/*error in try Error: [object Object]
    at fetch.then (<anonymous>:9:15)
VM144:16 data Error: [object Object]
    at fetch.then (<anonymous>:9:15)*/
// we are not getting the object value







// all errors got caught
fetch("https://jsonplaceholder.typicode.com/comments/1")
.then((response)=>{
    console.log("status", response);
    try{
    if(response.ok && response.status===200){
        return Promise.resolve(response.json());
    }else{
        throw {status: response.status, statusText: response.statusText, ok: response.ok};
    }
    }
    catch(err){console.log("error in try", err); return Promise.reject(err);}
    
})
.then((data)=>{
    console.log("data", data)
})
.catch((error)=>{
    console.log("error inside", error);
})
