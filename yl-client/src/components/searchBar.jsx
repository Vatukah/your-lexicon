import { useNavigate } from "react-router";

export default function SearchBar() {
    const navigate = useNavigate();
     const handleSearch = (event) => {
    event.preventDefault(); // Prevent default form submission

    const query = event.target.value; // Get the search query
    if (query.trim() === "") {
      return;
    }
    navigate(`/search/${query}`); // Navigate to the search page with the query
  };
  return (
    <div className="sticky top-[var(--navbar-height)]  pt-4  box-border w-full flex justify-center ">
      <input
        type="text"
        placeholder="Search..."
        className="border p-2 rounded-full w-full max-w-[720px] "
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSearch(event);
          }
        }}
      />
      
    </div>
  );
}
