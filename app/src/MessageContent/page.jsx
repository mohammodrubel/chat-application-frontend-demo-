import React, { useRef, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

function MessageContent({ message, own }) {
  const messageContentRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message content div
    if (messageContentRef.current) {
      messageContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [message]); 

  const formattedDate = message && message.createdAt ? formatDistanceToNow(new Date(message.createdAt), { addSuffix: true }) : '';

  return (
    <div className="px-10 rounded-lg">
      <div ref={messageContentRef} className={`w-60 mt-5 px-5 py-5 h-auto rounded-lg ${own ? 'bg-slate-50 text-gray' : 'bg-blue-400 text-white ml-auto'}`}>
        {message && message.text} <br />
        <small className={`text-gray-800 ${own && 'bg-white'}`}>{formattedDate}</small>
      </div>
    </div>
  );
}

export default MessageContent;
