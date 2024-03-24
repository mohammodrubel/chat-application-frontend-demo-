import React from "react";
import Image from "next/image";
import userDemoImg from "../../img/user.png";
import { useSelector } from "react-redux";
import { useGetSingleUsersQuery } from "../Redux/featchers/auth/authApi";

function Conversation({ conversationData }) {
  //current user
  const currentUser = useSelector((state)=> state.auth.user)
  const currentUserId = currentUser._id
  // friendData 
  const friendId = conversationData?.member?.find((item)=> item !== currentUserId)
  // finding friendInformation 
  const {data:frindInforamtion} = useGetSingleUsersQuery(friendId)
  const friendData = frindInforamtion?.data?.data
 
  return (
    <div className="px-4">
      <div className="flex cursor-pointer gap-4 mt-2 px-5 items-center border-b py-3">
        <Image
          src={userDemoImg}
          width={40}
          height={40}
          style={{ borderRadius: "50%" }}
        />
        <div>
          <h3 className="text-2xl">{friendData?.email}</h3>
          <p className=" text-gray-500">pending</p>
        </div>
      </div>
    </div>
  );
}

export default Conversation;
