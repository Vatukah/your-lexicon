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
    
  return (
    <div className="home w-full  text-text">

      <HeroSection />
      <div className="bg-white sticky top-[var(--navbar-height)] flex p-2 box-border flex-grow h-16 rounded-2xl z-50">
 <input
          type="text"
          placeholder="Search..."
          className="  px-4  flex-grow  outline-none text-lg "
        />
        <button className="bg-accent text-white py-2 px-4 rounded-xl"> Search</button>
       </div>
      
      <div>
        <h2 className="font-bold text-2xl text-text my-[var(--space-md)]" >Search. Learn. Expand.</h2>
        <p className="text-text-muted">“Discover meanings, explore word origins, and grow your vocabulary. Start your lexicon journey with just one search.”</p>
      </div>
      

      
    </div>
  );
}