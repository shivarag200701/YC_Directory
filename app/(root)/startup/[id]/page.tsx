import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"
import { client } from "@/sanity/lib/client"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
export const experimental_ppr = true
import markdownit from 'markdown-it'
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import View from "@/components/View"
import { PLAYLISTS_BY_SLUG_QUERY } from "@/sanity/lib/queries"
import StartupCard from "@/components/StartupCard"
import { log } from "console"
const md = markdownit()
export default async function page({params}:{params:Promise<{id:string}>}) {

    const {id} = await params
    const [post,{startups:editorPicks}] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY,{id}),
        client.fetch(PLAYLISTS_BY_SLUG_QUERY,{slug: 'editor-picks-new'})
    ])

    
    if(!post) return notFound()
     const parsedContent = md.render(post?.pitch || "")    
  return (
<>
<section className="pink_container !min-h-[230px]">
    <p className="tag">{formatDate(post._createdAt)}</p>
    <h1 className="heading">{post.title}</h1>
    <p className="sub-heading !max-w-5xl">{post.description}</p>
</section>
<section className="section_container">
    <img src={post.image} alt={post.title} className="w-full h-full rounded-xl" />
    <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className="flex-between gap-5">
            <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
                <div className="w-16 h-16 rounded-full overflow-hidden drop-shadow-lg">
                    <Image src={post.author?.image} alt="avatar" width={64} height={64} className="w-full h-full object-cover" />
                </div>
                <div>
                    <p className="text-20-medium">{post.author?.name}</p>
                    <p className="text-16-medium !text-black-300">@{post.author?.username}</p>

                </div>
            </Link>
            <p className="category-tag">{post.category}</p>
        </div>
        <h3 className="text-30-bold">Pitch Details</h3>
        {parsedContent ? ( 
            <article className="prose max-w-4xl font-work-sans break-all" dangerouslySetInnerHTML={{__html:parsedContent}}/>
        ):(
            <p className="no-result">No pitch details available</p>
        )}
    </div>
    <hr className="divider" />
    {editorPicks?.length>0 &&  (
        <div className="max-w-4xl mx-auto">
             <p className="text-30-semibold">Editor Picks</p>
             <ul className="mt-7 card_grid-sm">
                {editorPicks.map((startup:any)=>(
                    <li key={startup._id}>
                        <StartupCard post={startup} />
                    </li>
                ))}
             </ul>
        </div>
    )}
    <Suspense fallback={<Skeleton className="view_skeleton"/>}>
        <View id={id} />
    </Suspense>
</section>
</>
  )
}