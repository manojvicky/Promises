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

// new Promise way to catch errors
var promise = new Promise((resolve, reject)=>{
    fetch("https://jsonplaceholder.typicode.com/cdomments/1")
    .then((response)=>{
        if(response.ok && response.status===200){
            resolve(response.json())
        }else{
            reject({status: response.status, statusText: response.statusText, ok: response.ok})
        }
    })
    .catch(error=>{
        reject(error)
    });
}); 

promise
.then((data)=>{
    console.log("data", data)
})
.catch((err)=>{
console.log("error outside", err)
});

// // new Promise way to catch errors (another way)
var promise = new Promise((resolve, reject)=>{
    fetch("https://jsonplaceholder.typicode.com/cdomments/1")
    .then((response)=>{
        if(response.ok && response.status===200){
            resolve(response.json())
        }else{
            reject({status: response.status, statusText: response.statusText, ok: response.ok})
        }
    })
    .catch(error=>{
        reject(error)
    });
}); 

promise
.then((data)=>{
    console.log("data", data)
},
(error)=>{
    console.log("error outside", error);
});

//ASYNC and Await my own method
function pro(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("Done");
            return resolve("resolve Done");
        }, 3000);
    });
}
function handleResult(response){
    console.log("response in handleResult", response);
    return response.then((data)=>{console.log("result of data", data); return data;})
}
async function mypromise(url){
    let response = await fetch(url);
    console.log("response in mypromise", response);
    return handleResult(response.json());
}

mypromise('https://jsonplaceholder.typicode.com/todos/1')
.then((data)=>console.log("output data", data));

// standard method ASYNC and await
function myFunc(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{console.log("Yoo resolve"); resolve(Promise.resolve("Yoo inside promise"))}, 3000)
    });
}
async function handleResult(response){
    console.log("response in handleResult", response);
    if(response.ok){
    const data = await response.json();
    console.log("data in handleResult", data);
    return data;
    }
}
async function myfetch(url){
    let response = await fetch(url);
    console.log("yoo yoo after await", response);
    return handleResult(response);
}
myfetch('https://jsonplaceholder.typicode.com/todos/1')
.then((data)=>{console.log("data in OUTPUT", data)});

