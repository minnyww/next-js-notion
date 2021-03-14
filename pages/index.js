import Link from "next/link";

export default function Home({ posts }) {
  console.log("posts : ", posts);
  return (
    <>
      <h2>This is notion blog cms</h2>
      {posts.map((post) => {
        return (
          <Link
            href="blogs/[slug]"
            as={`blogs/${post.slug}`}
            key={post.id}
            style={{ cursor: "pointer" }}
          >
            <div
              style={{
                border: "1px solid lightgray",
                padding: "10px",
                borderRadius: "12px",
              }}
            >
              <h3>{post.title}</h3>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export async function getStaticProps() {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/table/e519e5a2dfb44bd99626092b1055aaf0",
  ).then((res) => res.json());

  return {
    props: {
      posts: data,
    },
  };
}
