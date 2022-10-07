async function getRol(rolId){
    roles = await rolsGetAll();
    for(const key in roles){   
        if(rolId === roles[key].rolId){
            //console.log(roles[key].rolName)
            return roles[key].rolName
        }
    }
}