"use client";

import { debounce } from "../utils";
import ReactSelectOptions from "./ReactSelectOptions";
import TextField from "./TextField";
import { searchInstrumentAction } from "@actions/search";
import { useCallback, useEffect, useRef, useState } from "react";

type Prop = {
  onSelect: (selection: any) => void;
  selection: any;
};

const Search = ({ onSelect, selection }: Prop) => {
  const searchBoxRef = useRef();
  const selectRef = useRef();

  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getResults = useCallback(
    debounce(async () => {
      const searchResults = await searchInstrumentAction({ searchTerm });
      if (searchResults?.statusCode === 200) {
        const filteredResults: any = [];
        searchResults.data.forEach((result: any) => {
          const { displayName, symbol } = result;
          filteredResults.push({
            label: displayName || symbol,
            value: result,
          });
        });
        setResults(filteredResults);
        setLoading(false);
      } else {
        console.log("Failed to get search results");
      }
    }, 700),
    [searchTerm]
  );

  useEffect(() => {
    if (
      (selection?.displayName || selection?.symbol) &&
      searchTerm !== (selection?.displayName || selection?.symbol)
    ) {
      onSelect(null);
    }
    if (searchTerm.length > 1) {
      setLoading(true);
      setResults([]);
      getResults();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [searchTerm]);

  const handleOnBlur = (e: any) => {
    // check if user clicked outside of options displayed
    if (
      !e.relatedTarget ||
      e.relatedTarget.classList.contains("react-select-option") === -1
    ) {
      setOpen(false);
    }
  };

  const handleOnSelect = (option: any) => {
    setOpen(false);
    setSearchTerm(option.displayName || option.symbol);
    setResults([]);
    onSelect(option);
  };

  const handleTextChange = (e: any) => {
    setSearchTerm(e.target.value);
    if (selection?.symbol !== e.target.value) {
      onSelect(null);
    }
  };

  return (
    <div className="relative">
      <TextField
        ref={searchBoxRef}
        onFocus={() => setOpen(true)}
        onBlur={(e) => handleOnBlur(e)}
        title="Instrument"
        isSearchable={true}
        loading={loading}
        onChange={handleTextChange}
        placeholder="Eg. Nifty"
        value={searchTerm}
      />
      <ReactSelectOptions
        ref={selectRef}
        open={!loading && open}
        options={results}
        onClose={() => setResults([])}
        onSelect={handleOnSelect}
        loading={loading}
      />
    </div>
  );
};
export default Search;
