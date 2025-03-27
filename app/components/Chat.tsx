"use client"
import React from 'react'
import { ArrowUp, Sparkles } from 'lucide-react'
import { Message, useChat } from 'ai/react'
import MessagesList from './MessagesList'

const Chat = ({ decodedLink, sessionId, initialMessages }: { decodedLink: string, sessionId?: string, initialMessages: Message[] }) => {

    const { messages, handleInputChange, handleSubmit, input } = useChat({
        api: "/api/chat-stream",
        body: { sessionId },
        initialMessages
    })

    return (
        <div className='flex flex-col items-center p-4 relative h-screen'>
            <div className='mb-4'>
                <div className='badge badge-soft badge-success badge-lg'>
                    {decodedLink}
                </div>
            </div>

            <div className='w-full max-w-4xl rounded-lg space-y-4 felx-grow overflow-y-auto no-scrollbar mb-40 p-5'>
                <div className='spce-y-2'>
                    {messages.length === 0 ? (
                        <div className='p-4 flex justify-center items-center flex-col'>
                            <div className='flex items-center'>
                                <Sparkles className='w-10 h-10' />
                                <h1 className='font-bold text-3xl my-4 text-primary'>Talk.ai</h1>
                            </div>
                            <p className='text-2xl mb-8'>Comment puis-je vous aider ?</p>
                            <div className='grid md:grid-cols-2 gap-2'>
                                <div className='bg-base-200 p-5 w-full rounded-3xl'>Qu'est-ce que ce site propose ?</div>
                                <div className='bg-base-200 p-5 w-full rounded-3xl'>Comment fonctionne ce site ?</div>
                                <div className='bg-base-200 p-5 w-full rounded-3xl'>Quels services sont offerts sur ce site ?</div>
                                <div className='bg-base-200 p-5 w-full rounded-3xl'>Donne-moi un résumé du contenu du site</div>
                            </div>
                        </div>
                    ) : (
                        <MessagesList messages={messages}></MessagesList>
                    )}
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className='absolute bottom-4 left-4 right-4 md:left-auto md:right-auto md:w-full md:max-w-4xl p-4 rounded-3xl border border-base-300 flex items-center bg-base-300'
            >
                <div className='w-full'>
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        placeholder='Tapez votre question...'
                        className='w-full outline-0 resize-none h-full bg-transparent mb-4'
                    ></textarea>

                    <div className='flex justify-between items-center'>
                        <div className='badge badge-soft badge-success badge-lg'>
                            Talk.ai
                        </div>
                        <button
                            className='btn btn-circle btn-primary'
                        >
                            <ArrowUp />
                        </button>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default Chat
