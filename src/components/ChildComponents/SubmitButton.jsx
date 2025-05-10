/*
'use client'
import React from 'react';
import {Button, Spinner} from "keep-react";

const SubmitButton = (props) => {
   if(props?.submit === false){
       return (
           <Button type="submit" size="md" className="px-5 md:px-10 max-w-fit py-3 hover:bg-white hover:text-blue-700 border-2 hover:border-blue-700 capitalize font-bold" onClick={props?.onClick}>
               {props?.text}
           </Button>
       )
   }else {
       return (
           // <Button type="submit" size="md" className="px-5 md:px-10 max-w-fit py-3 hover:bg-white text-red-600 hover:text-blue-700 border-[1px] hover:border-red-700 capitalize font-bold" disabled>
           //     {props?.text}
           // </Button>

           <Button  size="md" className="px-16 py-3 hover:bg-white hover:text-blue-700 border-2 hover:border-blue-700 cursor-not-allowed capitalize font-bold">
               <Spinner color="info" size="md"  />
           </Button>
       )
   }
};

export default SubmitButton;*/
'use client'
import React from 'react';

const SubmitButton = (props) => {
    if (props?.submit === false) {
        return (
            <button
                type="submit"
                className="px-5 md:px-10 max-w-fit py-3 hover:bg-white hover:text-blue-700 border border-gray-500 text-gray-700 text-base hover:border-blue-700 capitalize font-bold rounded-lg my-transition"
                onClick={props?.onClick}
            >
                {props?.text}
            </button>
        );
    } else {
        return (
            <button
                type="submit"
                className="px-16 py-3 hover:bg-white hover:text-blue-700 border hover:border-blue-700 cursor-not-allowed capitalize font-bold rounded-lg my-transition"
                disabled
            >
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-700"></div>
            </button>
        );
    }
};

export default SubmitButton;
