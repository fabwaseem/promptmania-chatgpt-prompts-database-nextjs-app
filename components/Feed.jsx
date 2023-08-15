"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import Masonry from "react-masonry-css";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@app/loading";

const PromptCardList = ({ data }) => {
  return (
    <div className="mt-16 w-full">
      <Masonry
        breakpointCols={{ default: 3, 1200: 2, 900: 1 }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.map((post) => (
          <PromptCard key={post._id} post={post} />
        ))}
      </Masonry>
    </div>
  );
};

const Feed = () => {
  const router = useRouter();
  const seachParams = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    router.push(`/?query=${e.target.value}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/prompt`);
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const handleSearch = async (e) => {
    e && e.preventDefault();
    setLoading(true);
    const response = await fetch(`/api/prompt/search?query=${searchText}`);
    const data = await response.json();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    const query = seachParams.get("query");
    if (query) {
      setSearchText(query);
      handleSearch();
    }
  }, [seachParams]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {loading ? (
        <Loading />
      ) : posts.length > 0 ? (
        <PromptCardList data={posts} />
      ) : (
        <div className="flex-center flex-col mt-10">
          <h1 className="text-2xl font-bold">No prompts found</h1>
          <p className="text-lg">Try searching for something else</p>
        </div>
      )}
    </section>
  );
};

export default Feed;
