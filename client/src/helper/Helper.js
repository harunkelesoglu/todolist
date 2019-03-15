
const isNotNull = (obj) => {
    
return Object.keys(obj).map( item => {
        if(obj[item]){
            return true;
        }
        return false;
    })
}


export{
    isNotNull
}

