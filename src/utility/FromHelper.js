
import toast from 'react-hot-toast';
let EmailRegx = /\S+@\S+\.\S+/;

class FromHelper {
    IsEmpty(v){
        return v?.length === 0
    }
    IsEmail(v){
        return !EmailRegx.test(v);
    }
    ErrToast(msg){
        toast.error(msg);
    }
    Successtoast(msg){
        toast.success(msg);
    }
    
}

export const  {IsEmpty, IsEmail,ErrToast, Successtoast } = new FromHelper();