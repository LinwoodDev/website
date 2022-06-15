import Author from "./author";

type PostType = {
  slug: string;
  fileName: string;
  title: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
  coverImage?: string;
  author: Author;
  excerpt?: string;
  ogImage?: {
    url: string;
  };
  content: string;
  tags: string[];
  id?: string;
};

export default PostType;
