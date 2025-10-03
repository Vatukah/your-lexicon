import { useLocation, useParams } from "react-router";
import { useRef, useEffect, useState } from "react";
import { fetchApi } from "../../config/api";
import { API_ENDPOINTS } from "../../config/api";
import asyncHandler from "../../utils/asyncHandler";
import HeroSearchBar from "../../components/heroSearchBar";
import SearchHeroSection from "./searchHeroSection";
import { ChevronDownIcon , ChevronUpIcon} from "@heroicons/react/24/solid";
import extractSynonyms from "../../utils/extractSynonyms.js";


export default function SearchPage() {
  const { word } = useParams();
  const location = useLocation();

  const [searchResults, setSearchResults] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event, navigate) => {
    event.preventDefault(); // Prevent default form submission
    let searchTerm = event.target.value; // Get the search query
    searchTerm = searchTerm.trim();
    if (searchTerm === "") {
      return;
    }

    navigate(`/search/${searchTerm}`); // Navigate to the search page with the query
    await fetchApi(`${API_ENDPOINTS.SEARCH}/${searchTerm}`, {
      method: "GET",
    })
      .then((response) => {
        console.log("Search results:", response);
        setSearchResults(response);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error?.error);
        setSearchResults({});
      });
  };

  const manualSearch = asyncHandler(async (searchTerm) => {
    if (searchTerm.trim() === "")
      throw new Error("Search term cannot be empty");

    await fetch(`${API_ENDPOINTS.SEARCH}/${searchTerm}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Search results:", data);
        setSearchResults(data);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error?.error);
        setSearchResults({});
      });
  });

  useEffect(() => {
    setLoading(true);
    fetchApi(`${API_ENDPOINTS.SEARCH}/${word}`, {
      method: "GET",
    })
      .then((response) => {
        console.log("Search results:", response);
        
        setSearchResults(response);
      })
      .catch((error) => {
        console.error("Error fetching search results:", error?.error);
        setSearchResults({});
      })
      .finally(() => setLoading(false));
  }, [location.search]);



  return (
    <div className=" w-full h-auto min-h-screen text-text ">
      <HeroSearchBar onSearch={handleSearch} />

     {loading &&  <div><Skeleton /></div>}
      {!loading && (
        <>
          <SearchHeroSection props={searchResults} />
          <DictionaryContainer content={searchResults} />
        </>
      )}
    </div>
  );
}



function DictionaryContainer({ content }) {
  const [currentPOS, setCurrentPOS] = useState(null);

  useEffect(() => {
    if (content?.lexicalEntries?.length > 0) {
      setCurrentPOS(content.lexicalEntries[0].lexicalCategory);
    }
  }, [content]);

  if (!content || !content.lexicalEntries) {
    return (
      <div className="p-4 text-gray-500">No dictionary data available.</div>
    );
  }

  return (
    <div className="my-4 w-full flex">
      {/* Word + Pronunciation */}

      <div className="w-full md:w-3/4 px-4">
        {/* POS Tabs */}
        <div className="flex mb-4">
          {content.lexicalEntries.map((entry, idx) => (
            <div
              key={idx}
              className={`mr-4 px-3 py-1 border border-gray-400 rounded-full text-sm cursor-pointer ${
                currentPOS === entry.lexicalCategory
                  ? "bg-accent text-white"
                  : ""
              }`}
              onClick={() => setCurrentPOS(entry.lexicalCategory)}
            >
              {entry.lexicalCategory}
            </div>
          ))}
        </div>

        {/* Meanings */}
        {content.lexicalEntries
          .filter(
            (entry) =>
              entry.lexicalCategory ===
              (currentPOS || content.lexicalEntries[0]?.lexicalCategory)
          )
          .map((entry, idx) => (
            <div key={idx} className="mb-6">
              {/* Senses */}
              {entry.senses?.map((sense, sIdx) => (
                <div
                  key={sense.id || sIdx}
                  className=" border-b border-gray-300 py-4 "
                >
                  <div className="ml-4">
                    {/* Registers */}
                    {sense.registers?.length > 0 && (
                      <div className="flex flex-wrap gap-2  ">
                        {sense.registers.map((reg, rIdx) => (
                          <span
                            key={rIdx}
                            className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full border border-yellow-300"
                          >
                            {reg}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Definition */}
                    <p className="text-lg font-semibold mt-1">
                      {sense.definitions?.[0] || "No definition available."}
                    </p>

                    {/* Examples */}
                    {sense.examples?.length > 0 && (
                      <ul className="list-none ml-6 mt-1 text-gray-600">
                        {sense.examples.map((ex, eIdx) => (
                          <li key={eIdx}>
                            "
                            <span>{typeof ex === "string" ? ex : ex.text}</span>
                            "
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Subsenses */}
                    {sense.subsenses?.length > 0 && (
                      <div className="ml-6 mt-2">
                        {sense.subsenses.map((sub, subIdx) => (
                          <div key={sub.id || subIdx} className="mb-2">
                            <p className="text-md font-medium">
                              {sub.definitions?.[0] || "No subsense definition"}
                            </p>

                            {/* Subsense registers */}
                            {sub.registers?.length > 0 && (
                              <div className="flex flex-wrap gap-2 ml-6 mt-1">
                                {sub.registers.map((reg, rIdx) => (
                                  <span
                                    key={rIdx}
                                    className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full border border-yellow-300"
                                  >
                                    {reg}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Subsense examples */}
                            {sub.examples?.length > 0 && (
                              <ul className="list-none  text-gray-500">
                                {sub.examples.map((ex, eIdx) => (
                                  <li key={eIdx}>
                                    "
                                    <span>
                                      {typeof ex === "string" ? ex : ex.text}
                                    </span>
                                    "
                                  </li>
                                ))}
                              </ul>
                            )}
                           
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Sense's Synonyms */}

                  <SynonymList synonyms={extractSynonyms(sense)} />
                </div>
              ))}
              <div>
                {/*etymology */}
                {entry.etymologies && entry.etymologies.length > 0 && (
                  <div className=" p-4 bg-accent/20 ">
                    <h2 className="text-md font-semibold mb-2 text-accent">
                      Etymology (Origin & History)
                    </h2>
                    <p className="text-md text-text-muted font-medium">
                      {entry.etymologies.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Sidebar (future features) */}
      <div className="w-0  md:w-1/4 bg-bg-muted p-3"></div>
    </div>
  );
}

function SynonymList({synonyms}) {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const containerRef = useRef(null);

  if (!synonyms || synonyms.length === 0) return null;

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      setShowToggle(el.scrollHeight > el.clientHeight);
    }
  }, [synonyms]);

 
  

  return (
    <div className="mt-4 h-auto bg-bg-muted p-4 rounded-lg">
      <h4 className="text-md font-semibold mb-2 text-accent">Synonyms</h4>
      <div className="flex ">
        <div
          ref={containerRef}
          className={`flex flex-wrap gap-2 items-center ${
            expanded ? "" : "overflow-hidden whitespace-nowrap h-11"
          }`}
          style={!expanded ? { maxWidth: "100%", whiteSpace: "nowrap" } : {}}
        >
          {synonyms.map((syn, index) => (
            <a
              href={`/search/${syn}`}
              key={index}
              className="text-text-muted text-sm px-2 py-1 border border-gray-400 rounded-full mr-2 hover:bg-accent hover:text-white transition inline-block mb-2"
              style={!expanded ? { display: "inline-block" } : {}}
            >
              {syn}
            </a>
          ))}
        </div>
        <div className="ml-auto">
          {showToggle && (
            <button
              className=" px-2 py-1 text-sm bg-accent text-white rounded-full"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? (
                <ChevronUpIcon className="h-4 w-4 inline-block " />
              ) : (
                <ChevronDownIcon className="h-4 w-4 inline-block font-bold" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const Skeleton = () => {
    return (
      <div className="  w-full h-auto min-h-screen text-text -z-10">
        {/* Hero Section Skeleton */}
        
        <div className="w-full  p-4 ">
           <div className="w-1/3 h-24 bg-gray-200 animate-pulse rounded-md mx-auto"></div>
           <div className="w-1/4 h-8 bg-gray-200 animate-pulse rounded-md mx-auto mt-6"></div>
        </div>
        <div className="flex  mx-4 gap-4">
          <div className="animate-pulse w-3/4 h-screen bg-gray-200 rounded-md"></div>
          <div className="animate-pulse w-1/4 h-screen bg-gray-200 rounded-md"></div>
        </div>
      
      </div>
    );
  }