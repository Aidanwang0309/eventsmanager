// import React, { useContext, useState, useEffect, useCallback } from "react";
// import { EventContext } from "../../context/events/eventStore";
// const { filterEvents, clearFilter } = useContext(EventContext);

// type useCacheSearchProps = {
//   searchFunction: () => void;
//   resultsHandler: (props: Array<object>) => void;
// };

// export const useCacheSearch = ({
//   searchFunction,
//   resultsHandler
// }: useCacheSearchProps) => {
//   const [query, setQuery] = useState<string>("");
//   const [cache, setCache] = useState<object>({});

//   useEffect(() => {
//     if (query.length < 3) {
//       resultsHandler([]);
//       return;
//     }
//     if (cache[query]) {
//       resultsHandler(cache[query]);
//     } else {
//       searchFunction(query);
//     }
//   });

//   return [setQuery];
// };
