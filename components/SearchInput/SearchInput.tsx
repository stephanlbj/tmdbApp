"use client";
import React, { useState, useEffect } from "react";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  debounceTime?: number;
  style?: React.CSSProperties;
  initialValue?: string;
  classname?: string;
}

export default function SearchInput({
  placeholder = "Search...",
  onSearch,
  debounceTime = 300,
  style,
  initialValue = "",
  classname,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) onSearch(inputValue);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [inputValue, onSearch, debounceTime]);

  return (
    <input
      type="search movie..."
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
