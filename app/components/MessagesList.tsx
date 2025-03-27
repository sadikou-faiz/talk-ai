import React from 'react'
import { Message as TMessage} from 'ai/react'
import Message from './Message'

const MessagesList = ({messages} : {messages : TMessage[]}) => {
  return (
    <div className='space-y-2'>
      {messages.map((message , index) => (
       <Message key={index} content={message.content} isUserMessage={message.role === "user"}></Message>
      ))}
    </div>
  )
}

export default MessagesList
