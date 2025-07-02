import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";

// import Image from "next/image";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1,name: "John Doe" },
      _id: 1,
      description: "This is a description",
      image:
        "https://unsplash.com/photos/macbook-pro-on-brown-wooden-table-EeS69TTPQ18",
      category: "Robots",
      title: "We Robots",
    },
  ];

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
        <ul className="mt-7 card-grid">
          {posts.length > 0 ? (
            posts.map((post: StartUpCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">Start up not found</p>
          )}
        </ul>
      </section>
    </>
  );
}
