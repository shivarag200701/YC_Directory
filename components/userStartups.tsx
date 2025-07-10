import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import StartupCard from './StartupCard'
import React from 'react'

const userStartups = async ({id}:{id:string}) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY,{id})
  return (
    <>
    {startups.length >0 ? (startups.map((startup:any)=>(
        <StartupCard key={startup._id} post={startup}/>
    ))):(
        <p className='no-results'>No startups Yet</p>
    )}
    </>
  )
}

export default userStartups