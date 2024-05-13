
import Swal from "sweetalert2";
import {Delete} from "@/utility/APIHelper";
export const SweetAlert = (api)=>{
    return Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            return Delete(api).then((res)=>{
                return res
            })
        }
    })
}

export const SuccessAlert = (msg ,icon="success")=>{
    return Swal.fire({
            position: "center",
            icon: icon,
            title: msg,
            showConfirmButton: false,
            timer:1500,
        customClass:{
                content:"container"
        }
        });
}
export const ErrAlert = (msg)=>{
    return Swal.fire({
        text:"Something went wrong",
        position: "center",
        icon: "error",
        title: msg,
        showConfirmButton: false,
        timer:1500,
        customClass:{
            title:{
              color:"red",
              fontsize:"10px"
            },
            icon:10,

        }
    });
}