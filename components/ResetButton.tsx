"use client";
import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const ResetButton = () => {
  function reset() {
    const form = document.querySelector(".search-form") as HTMLFormElement;

    if (form) {
      form.reset();
    }
  }
  return (
    <div>
      <Button
        type="reset"
        onClick={reset}
        className="search-btn text-white-100"
      >
        <Link href="/" className="search-btn text-white-100">
          <X className="size-5" />
        </Link>
      </Button>
    </div>
  );
};

export default ResetButton;
