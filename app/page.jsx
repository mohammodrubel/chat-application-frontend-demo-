"use client";
import Image from "next/image";
import userDemoImg from "./img/user.png";
import MessageContent from "./src/MessageContent/page";
import InputBox from "./src/InputBox/InputBox";
import { useSelector } from "react-redux";
import { useGetSingleConversationQuery } from "./src/Redux/featchers/conversation/conversationApi";
import Conversation from "./src/Conversation/Conversation";
import { useEffect, useRef, useState } from "react";
import { useGetMessageQuery, useSendingMessageMutation } from "./src/Redux/featchers/message_data/messageApi";


export default function Home() {
  const [sendingMessegeData] = useSendingMessageMutation();

//current user
const currentUser = useSelector((state) => state.auth.user);
const currentUserId = currentUser?._id;

//singleConversation
const { data } = useGetSingleConversationQuery(currentUserId);
const conversationList = data?.data?.data;
console.log(data?.data?._id);

// current chat
const [currentChat, setCurrentChat] = useState({});
const currentChatId = currentChat?._id;

//message data
const { data: messageData } = useGetMessageQuery(currentChatId);
const userConversationMessage = messageData?.data?.data;

// new Message
const [newMessage, setNewMessage] = useState('');

// handleSubmit chat
const handelSubmit = async (e) => {
  const sendingData = {
    conversationId: currentChatId,
    senderId: currentUserId,
    text: newMessage
  };
  const res = await sendingMessegeData(sendingData);
  setNewMessage('');
};


  return (
    <>
      <div className="w-screen flex ">
        <div className="w-[25%] h-screen border bg-slate-50">
          <div className="flex flex-col gap-4 justify-center px-5 items-center border-b py-2">
            <Image
              src={userDemoImg}
              width={60}
              height={60}
              style={{ borderRadius: "50%" }}
            />
            <div className="text-center">
              <h3 className="text-2xl">Name</h3>
              <small className=" text-gray-500">My Account</small>
            </div>
          </div>
          {conversationList?.map((item, index) => <div onClick={()=>setCurrentChat(item)}>    
            <Conversation conversationData={item}/>
            </div>)}
        </div>
        <div className="w-[50%] h-screen border  bg-white">
          <div className="bg-slate-50 mt-5 mx-8 rounded-3xl">
            <div className="px-5 flex py-3 justify-between items-center">
              <Image
                src={userDemoImg}
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />
              <div className="flex gap-4">
                <i class="text-gray-500 fa-solid fa-phone-volume"></i>
                <i class="text-gray-500 fa-solid fa-video"></i>
                <i class="text-gray-500 fa-solid fa-circle-info"></i>
              </div>
            </div>
          </div>
          <div
            className="h-[75vh] overflow-y-scroll  border-b"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#F5F5DC	" }}
          >
           
              {
               userConversationMessage?.map((item)=> <MessageContent message={item} own={item?.senderId === currentUserId} />) 
              }
            
          </div>
          <div>
            <InputBox setNewMessage={setNewMessage} handelSubmit={handelSubmit} />
          </div>
        </div>
        <div className="w-[25%] h-screen border bg-slate-50"></div>
      </div>
    </>
  );
}
