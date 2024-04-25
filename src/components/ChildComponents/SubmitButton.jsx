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
           <Button  size="md" className="px-16 py-3 hover:bg-white hover:text-blue-700 border-2 hover:border-blue-700 cursor-not-allowed capitalize font-bold">
               <Spinner color="info" size="md"  />
           </Button>
       )
   }
};

export default SubmitButton;