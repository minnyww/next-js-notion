// import { NotionRenderer } from "react-notion";
import { NotionRenderer } from "react-notion-x";
import { NotionAPI } from "notion-client";
const notion = new NotionAPI();

export default ({ post, blocks }) => (
  <div>
    <NotionRenderer recordMap={blocks} fullPage={true} darkMode={false} />
    {/* <NotionRenderer blockMap={blocks} /> */}
  </div>
);

export const getAllPosts = async () => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/e519e5a2dfb44bd99626092b1055aaf0`,
  ).then((res) => res.json());
};
export async function getStaticProps({ params: { slug } }) {
  const posts = await getAllPosts();
  const post = posts.find((t) => t.slug === slug);
  //   const blocks = await fetch(
  //     `https://notion-api.splitbee.io/v1/page/${post.id}`,
  //   ).then((res) => res.json());

  //   const collectionId = "2d8aec23-8281-4a94-9090-caaf823dd21a";
  //   const collectionViewId = "ab639a5a-853e-45e1-9ef7-133b486c0acf";
  //   const colectionData = await notion.getCollectionData(
  //     collectionId,
  //     collectionViewId,
  //   );

  //   console.log("colectionData : ", colectionData);
  const table = await notion.getPage("e519e5a2dfb44bd99626092b1055aaf0");
  console.log("table :: ", table);
  const recordMap = await notion.getPage(post.id);

  return {
    props: {
      blocks: recordMap,
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const path = posts.map((row) => `/blogs/${row.slug}`);
  return {
    paths: path,
    fallback: true,
  };
}
