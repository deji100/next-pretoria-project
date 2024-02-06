"use client"

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({data, search, handleTagClick}) => {
  const [filteredResult, setFilteredResult] = useState([]);

  useEffect(() => {
    const regSearch = new RegExp(search, 'i');
  
    const filteredPosts = data.filter((item) => (
      regSearch.test(item.prompt) ||
      regSearch.test(item.tag) ||
      regSearch.test(item.creator.username)
    ));

    setFilteredResult(filteredPosts);
  }, [search])

  if (search !== "") {
    return (
      <div className="mt-16 prompt_layout">
        {filteredResult.map((item) => (
          <PromptCard 
            key={item._id}
            post={item}
            handleTagClick={handleTagClick}
          />
        ))
        }
      </div>
    )
  }else {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((item) => (
          <PromptCard 
            key={item._id}
            post={item}
            handleTagClick={handleTagClick}
          />
        ))
        }
      </div>
    )
  }

  
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
        className="search_input peer"
        type="text"
        placeholder="Search for a tag or a username"
        value={searchText}
        onChange={handleSearchChange}
        required />
      </form>

      <PromptCardList
        data={posts}
        search={searchText}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed