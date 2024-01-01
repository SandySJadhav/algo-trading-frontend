import Dropdown from "./Dropdown";
import { searchAction } from "@actions/search";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

type Prop = {
  onSelect: () => void;
};

const Search = ({ onSelect }: Prop) => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getResults = useCallback(async () => {
    const searchResults = await searchAction({ searchText: searchTerm });
    if (searchResults.statusCode === 200) {
      const filteredResults = [];
      searchResults.data.forEach((result: any) => {
        console.log(result.expiry);
      });
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length > 2) {
      getResults();
    } else {
      setResults([]);
    }
  }, [searchTerm, getResults]);

  return (
    <div>
      <div className="grid content-center p-4">
        <label className="relative flex h-10">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400">
            <HiOutlineMagnifyingGlass />
          </span>
          <input
            className="placeholder:italic placeholder:text-slate-400 block bg-white dark:bg-black w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search eg. nifty, tcs, crude, gold, etc"
            type="text"
            name="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      <Dropdown
        classes={{
          ul: "pt-0 mt-0 ml-5",
        }}
        options={results}
        open={results.length > 0}
        onClose={() => setResults([])}
        onSelect={onSelect}
      />
    </div>
  );
};
export default Search;
