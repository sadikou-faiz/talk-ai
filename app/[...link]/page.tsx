import React from 'react'
import Chat from '../components/Chat';
import { cookies } from 'next/headers';
import { redis } from '@/lib/redis';
import { ragChat } from '@/lib/rag-chat';

interface PageProps {
  params: {
    link?: string | string[];
  }
}

function reconstructUrl({ url }: { url: string[] }) {
  const decodedComponents = url.map((component) => decodeURIComponent(component))
  return decodedComponents.join('/');
}


const page = async ({ params }: PageProps) => {

  const sessionCookies = (await cookies()).get("sessionId")?.value

  const awaitedParams = await params
  if (!awaitedParams?.link) {
    return <div>Erreur: Aucun lien fourni</div>
  }
  const linkArray = Array.isArray(awaitedParams.link) ? awaitedParams.link : [awaitedParams.link]

  const decodedLink = reconstructUrl({ url: linkArray })

  const sessionId = (decodedLink + "__" + sessionCookies).replace(/\//g, "")

  const isAlreadyIndexed = await redis.sismember("indexed-urls", decodedLink)
  console.log("isAlreadyIndexed:", isAlreadyIndexed);
  if (!isAlreadyIndexed) {
    console.log("Indexation en cours...")
    await ragChat.context.add({
      type: "html",
      source: decodedLink,
      config: { chunkOverlap: 50, chunkSize: 200 }
    })
    await redis.sadd("indexed-urls", decodedLink)
  }

  const initialMessages = await ragChat.history.getMessages({ amount: 10, sessionId })

  return (
    <Chat
      decodedLink={decodedLink}
      sessionId={sessionId}
      initialMessages={initialMessages}
    ></Chat>
  )
}

export default page
