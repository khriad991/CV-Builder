
class APIHelper {
    async Create(api,obj){
        try {
            const res = await fetch(api,{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(obj)
            })
            return res.json();
        }catch (e) {
            return false
        }
    }
    
    async Get(api){
        try {
            const res = await fetch(api);
            return res.json();
        }catch (e) {
            return false
        }
    }

    async Delete(api){
        try {
            const res = await fetch(api,{
                method:"DELETE",
            })
            return true
        }catch (e) {
            return false
        }
    }
    
    async Update(api,obj){
        try {
            const res = await fetch(api,{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(obj)
            })
            return res.json();
        }catch (e) {
            return false
        }
    }
    

}


export const {Create,Get ,Delete,Update} = new APIHelper();