import { useState } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router";
export default function HeroSearchBar({ onSearch }) {
  const navigate = useNavigate();
  const [focus, setFocus] = useState(false);
  return (
    <div className="w-full sticky top-[var(--navbar-height)] pt-4  heroSearchBar z-50">
      <div
        className={`${
          focus ? "bg-none backdrop-blur-md" : "bg-accent"
        } max-w-[720px] mx-auto  flex p-2 box-border flex-grow h-16 rounded-full  focus:bg-none border-2  border-accent `}
      >
        <input
          type="text"
          placeholder="Search for word, phrases, and idioms"
          className="  px-4  flex-grow  outline-none text-lg "
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(e,navigate);
            }
          }}
        />
        <button>
          {" "}
          <ArrowRightIcon
            className={`w-8 h-8 ${focus ? "text-accent" : "text-white"} `}
            strokeWidth={80}
            title="click to search"
          />
        </button>
      </div>
    </div>
  );
}
