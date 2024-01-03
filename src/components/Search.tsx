"use client";

import { debounce } from "../utils";
import Dropdown from "./Dropdown";
import TextField from "./TextField";
import { searchScriptAction } from "@actions/search";
import { useCallback, useEffect, useState } from "react";

type Prop = {
  onSelect?: () => void;
};

const Search = ({ onSelect }: Prop) => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getResults = useCallback(
    debounce(async () => {
      const searchResults = await searchScriptAction({ searchTerm });
      if (searchResults?.statusCode === 200) {
        const filteredResults = [];
        searchResults.data.forEach((result: any) => {
          console.log(result);
        });
      } else {
        console.error("Failed to get search results");
      }
    }, 700),
    []
  );

  useEffect(() => {
    if (searchTerm.length > 2) {
      getResults();
    } else {
      setResults([]);
    }
  }, [searchTerm, getResults]);

  return (
    <div>
      <TextField
        title="Instrument"
        searchIcon={true}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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
