import React, { useState } from 'react'
import sendFriendRequest from '../../../api/UserMannagement/Friends/sendFriendRequest';


export default function FriendRequestButton({ uid }) {
  const [txt, setTxt] = useState('Send friend request');

  return (
    <div>
      <button
        onClick={() => {
          sendFriendRequest(uid);
          setTxt('Friend request sent');
        }}
      >
        {txt}
      </button>
    </div >
  )
}
