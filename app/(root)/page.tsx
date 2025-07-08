
import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { auth } from "@/auth";
// import Image from "next/image";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const params = {search:query|| null
  }
  const {data:posts} = await sanityFetch({query:STARTUPS_QUERY,params})
  

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your startup,
          <br />
          Connect with entreprenuers
        </h1>
        <p className="sub-heading !max-w-xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competions
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post: StartUpCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">Start up not found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
