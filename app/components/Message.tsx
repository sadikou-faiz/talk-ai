import React from 'react'

interface MessageProps {
    content: string;
    isUserMessage: boolean;
}

const Message = ({ content, isUserMessage }: MessageProps) => {
    const filteredContent = content.startsWith("Réponds en français : ")
        ? content.replace("Réponds en français : ", "")
        : content
    return (
        <div className={`flex w-full ${isUserMessage ? 'justify-end' : ''}`}>
            <div className={`max-w-4xl p-4 break-works ${isUserMessage ? 'bg-base-300 rounded-3xl' : 'w-full'}`}>
                {filteredContent}
            </div>
        </div>
    )
}

export default Message
