import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import NewsArticleGrid from "@/components/NewsArticleGrid";
import Head from "next/head";
import { Button, Form, Spinner } from "react-bootstrap";
import { NewsArticle } from "@/models/NewsArticles";

const SearchNewsPage = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null);
  const [searchResultLoading, setSearchResultLoading] = useState(false);
  const [searchResultLoadingIsError, setSearchResultLoadingIsError] = useState(false);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        setSearchResults(null);
        setSearchResultLoadingIsError(false);
        setSearchResultLoading(true);
        const response = await fetch("/api/search-news?q=" + router.query.q);
        const articles: NewsArticle[] = await response.json();
        setSearchResults(articles);
      } catch (error) {
        console.error(error);
        setSearchResultLoadingIsError(true);
      } finally {
        setSearchResultLoading(false);
      }
    }

    if (router.query.q) {
      fetchSearchResults();
    }
  }, [router.query.q]);

  return (
    <main>
      <Head>
        <title key="title">Search Results</title>
      </Head>
      <h1>Search News</h1>

      <div className="de-flex flex-column align-img-thumbnail">
        {searchResultLoading && <Spinner animation="border" />}
        {searchResultLoadingIsError && <p>Something went wrong</p>}
        {searchResults?.length === 0 && <p>Noting found</p>}
        {searchResults && <NewsArticleGrid articles={searchResults} />}
      </div>
    </main>
  );
};

export default SearchNewsPage;
