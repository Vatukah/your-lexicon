import { useState } from "react";
import HeroSection from "../../components/herosection";
import HeroSearchBar from "../../components/heroSearchBar";
import { useAuth } from "../../contexts/authContext";
import SearchBar from "../../components/searchBar";

const CHANNELS = [
  "word_updates",
  "news",
  "announcements",
  "general",
];

export default function Home() {
  const {channel,setChannel,messages} = useAuth();
    
  
  const handleHomeSearch = (event,navigate) => {
    event.preventDefault(); // Prevent default form submission
    let query = event.target.value; // Get the search query
    query = query.trim();
    if (query === "") {
      return;
    }
    navigate(`/search/${query}`); // Navigate to the search page with the query
  };
  return (
    <div className="home w-full  text-text">

      <HeroSection />
      <HeroSearchBar onSearch={handleHomeSearch}/>
      
      <div className="h-screen">
        <h2 className="font-bold text-2xl text-text my-[var(--space-md)]" >Search. Learn. Expand.</h2>
        <p className="text-text-muted">“Discover meanings, explore word origins, and grow your vocabulary. Start your lexicon journey with just one search.”</p>
      </div>
      

      
    </div>
  );
}