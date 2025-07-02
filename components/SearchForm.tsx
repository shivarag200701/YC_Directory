import React from "react";
import Form from "next/form";
import ResetButton from "./ResetButton";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action="/" className="search-form">
      <input
        name="query"
        placeholder="Search Startups"
        defaultValue={query}
        className="search-input"
      />
      <div className="flex gap-2">
        {query && <ResetButton />}
        <Button type="submit" className="search-btn text-white-100">
          <Search className="size-5" />
        </Button>
      </div>
    </Form>
  );
};

export default SearchForm;
