import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaginateLink } from "./PaginateLink";

export const Paginate = () => {

  const { pages } = useSelector((state) => state.places);

  return (
    <>
      <div class="flex justify-center">
        
        <div>
          <nav aria-label="Page navigation example">
            <ul class="list-style-none flex">
              {pages.map((n,i) => <PaginateLink key={i} n={n}/> )}
            </ul>
          </nav>
        </div>
      </div>
      <div>&nbsp;</div>
    </>
  );
};
