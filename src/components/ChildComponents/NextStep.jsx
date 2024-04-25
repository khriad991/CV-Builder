"use client"
import Link from "next/link";
import {useRouter} from "next/navigation";

const NextStep = ({href, value}) => {
    const router = useRouter();
    return (
       <>
           <div className="container flex justify-between gap-x-4 py-5 mb-10">
               <button className="btnBG px-8" onClick={()=> router.back()}>back</button>
               <Link className="btn px-8 py-4" href={href}>{value}</Link>
           </div>
       </>
    );
};

export default NextStep;