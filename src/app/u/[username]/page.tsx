"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function page() {
  const [ message, setMessage ] = useState("");
  const param = useParams();

  console.log("param", param.username);

  

  const sendMessage = async () => {
    try{
      const response =await axios.post('/api/send-message',{username: "Aditya", content: message});
      console.log("response",response.data);
      if(response.data.success){
        setMessage("")
        toast.success(response.data.message);
      }

    }catch(error){
      console.log(error);
      
    }
  };

  const suggestMessage = async() => {
    try{
      const response = await axios.get('api/suggest-messages');
      console.log("response",response.data);
      toast.success(response.data.message);
    }catch(error){
      console.log(error);
      toast.error("Error sending message");
    }
  };

  return <div>
    <input type="text" placeholder="Message" className="w-50% border border-gray-300 p-2" value={message} onChange={(e) => setMessage(e.target.value)} />
    <button onClick={sendMessage}>Send Message</button>
    <div>
      <button onClick={suggestMessage}>Suggest Messages</button>
    </div>
  </div>;
}

export default page;
