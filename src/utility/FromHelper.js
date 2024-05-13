
import toast from 'react-hot-toast';
import Swal from "sweetalert2";
let EmailRegx = /\S+@\S+\.\S+/;

class FromHelper {
    IsEmpty(v){
        return v?.length === 0
    }
    IsEmail(v){
        return !EmailRegx.test(v);
    }
    ErrToast(msg){
        return toast.error(msg);
    }
    Successtoast(msg){
       return toast.success(msg);
    }
   async ErrorSweet (msg){
        return Swal.fire({
            text:"Please Try Again",
            position: "center",
            icon: "error",
            title: msg,
            showConfirmButton: false,
            timer:1300,
            timerProgressBar:true
        });
    }

    async  SuccSweetAlert (msg){
        return Swal.fire({
            position: "center",
            icon: "success",
            title: msg,
            showConfirmButton: false,
            timer:1300,
           timerProgressBar:true
        });
    }

}

export const  {IsEmpty, IsEmail,ErrToast, Successtoast,ErrorSweet ,SuccSweetAlert} = new FromHelper();