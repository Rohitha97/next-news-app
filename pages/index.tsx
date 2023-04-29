import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";
import styles from "@/styles/Home.module.css";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";
import NewsArticleEntry from "@/components/NewsArticleEntry";
import NewsArticleGrid from "@/components/NewsArticleGrid";
import NavBar from "@/components/NavBar";

interface BreackingNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getServerSideProps: GetServerSideProps<BreackingNewsPageProps> = async () => {
  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;
  const response = await fetch(url);

  const newsResponse: NewsResponse = await response.json();

  return {
    props: { newsArticles: newsResponse.articles },
  };
};

export default function BreackingNewsPage({ newsArticles }: BreackingNewsPageProps) {
  return (
    <>
      <Head>
        <title key="title">Next News App</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <NewsArticleGrid articles={newsArticles} />
      </main>
    </>
  );
}
