"use client";
import { useSearch } from "@/providers/Provider";
import React, { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchInputProps {
  placeholder?: string;
  debounceTime?: number;
  style?: React.CSSProperties;
  classname?: string;
}

export default function SearchInput({
  placeholder = "search movie...",
  debounceTime = 500,
  style,
  classname,
}: SearchInputProps) {
  const { searchQuery, setSearchQuery } = useSearch();
  const [inputValue, setInputValue] = useState(searchQuery);

  const debouncedInput = useDebounce(inputValue, debounceTime);

  useEffect(() => {
    setSearchQuery(debouncedInput);
  }, [debouncedInput, setSearchQuery]);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  return (
    <input
      placeholder={placeholder}
      value={inputValue}
      className={
        classname
          ? classname
          : "block w-full max-w-md p-2.5 mt-10 mx-auto mb-2.5 box-border border-gray-500"
      }
      onChange={(e) => setInputValue(e.target.value)}
      style={style}
    />
  );
}
