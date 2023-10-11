"use client";
import Loader from "@/components/Loader";
import SearchForm from "@/components/SearchForm";
import SearchResults from "@/components/SearchResults";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const [posts, setPosts] = useState([] as any);
  const [users, setUsers] = useState([] as any);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPosts([] as any);
    setUsers([] as any);
  }, []);

  return (
    <section className="max-w-2xl mx-auto mt-24">
      <SearchForm
        setPosts={setPosts}
        setUsers={setUsers}
        setLoading={setLoading}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          {posts.length < 1 && users.length < 1 ? null : (
            <SearchResults users={users} posts={posts} loading={loading} />
          )}
        </>
      )}
    </section>
  );
};

export default SearchPage;
