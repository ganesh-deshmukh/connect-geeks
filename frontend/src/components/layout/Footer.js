// functional component

import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-info text-white mt-4 p-3 text-center">
        Copyright &copy; {new Date().getFullYear()} Find-Geeks
      </footer>
    </div>
  );
}
