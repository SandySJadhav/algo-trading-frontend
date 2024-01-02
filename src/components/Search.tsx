"use client";

import Dropdown from "./Dropdown";
import TextField from "./TextField";
import { searchAction } from "@actions/search";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

type Prop = {
  onSelect?: () => void;
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
      <TextField title="Instrument" searchIcon={true} />
      {/* <div className="grid content-center p-4">
        <label className="relative flex h-10">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400">
            <HiOutlineMagnifyingGlass />
          </span>

        </label>
      </div> */}
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
