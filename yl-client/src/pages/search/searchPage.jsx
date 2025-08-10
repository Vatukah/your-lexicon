import { useParams } from "react-router";
import Navbar from "../../components/navbar/navbar";
import { useEffect ,useState} from "react";
import { fetchApi } from "../../config/api";
import { API_ENDPOINTS } from "../../config/api";
import { object, objectOf } from "prop-types";

export default function SearchPage() {
    const { word } = useParams();

    const [searchResults, setSearchResults] = useState({});

    const handleSearch = async (searchTerm) => {
         await fetchApi(`${API_ENDPOINTS.SEARCH}/${searchTerm}`, {
            method: 'GET',
        }).then(response => {
            console.log('Search results:', response);
            setSearchResults(response);
        }).catch(error => {
            console.error('Error fetching search results:', error?.error);
            setSearchResults({});
        });
    };

    useEffect(() => {
        handleSearch(word);
    }, [word]);

  return (
   <div className=" w-full h-screen  text-text ">
        <Navbar />
      <h1>Search Page</h1>
     
        {searchResults && Object.keys(searchResults).length > 0 ? (
             <div>
            <h2> {searchResults.word}</h2>
          <ul>
            {searchResults.meanings.map((meaning) => (
              <li key={meaning.partOfSpeech}>
                <strong>{meaning.partOfSpeech}:</strong> {meaning.definitions}
              </li>
            ))}
          </ul>
            </div>
        ) : (
          <p>No results found.</p>
        )   }
    
    </div>
  );
}