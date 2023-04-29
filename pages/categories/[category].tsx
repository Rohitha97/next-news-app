import NewsArticleGrid from "@/components/NewsArticleGrid";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

interface CategoryNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlungs = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

  const paths = categorySlungs.map((slug) => ({ params: { category: slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({ params }) => {
  const category = params?.category?.toString();
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`);
  const newsResponse: NewsResponse = await response.json();

  return {
    props: { newsArticles: newsResponse.articles },
    revalidate: 5 * 60,
  };
};

const CategoryNewsPage = ({ newsArticles }: CategoryNewsPageProps) => {
  const router = useRouter();
  const categoryName = router.query.category?.toString();
  const tilte = "Category : " + categoryName;

  return (
    <>
      <main>
        <Head>
          <title key="title">{tilte}</title>
        </Head>
        <h1>{tilte}</h1>
        <NewsArticleGrid articles={newsArticles} />
      </main>
    </>
  );
};

export default CategoryNewsPage;
