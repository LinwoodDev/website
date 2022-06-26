import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getAllPostIds, getPostById, getPostSlugs } from "../lib/blog";
import PostType from "../types/post";
import PostPage from "./blog/[year]/[month]/[day]/[slug]";

export default function TopBlogEntry({
  post,
  mdxSource,
}: {
  post: PostType;
  mdxSource: MDXRemoteSerializeResult;
}) {
  return PostPage({ post, mdxSource });
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const path = params!.blogentry as string[];
  const pathString = path.join("/");
  const post = getPostById(pathString);
  const mdxSource = await serialize(post.content);
  return {
    props: {
      post,
      mdxSource,
    },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds().map((id) => `/${id}`);
  return {
    paths,
    fallback: false,
  };
};
