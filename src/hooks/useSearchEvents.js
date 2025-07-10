import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useEventFilter } from "@/stores/useEventFilterStore";

export const useSearchEvents = () => {
  const { search, category} = useEventFilter();
  console.log(`search in query defination: ${search} and category: ${category}`)
  return useQuery({
    queryKey: ["events", search, category],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category) params.append("category", category);
      

      const { data } = await axios.get(`/api/events?${params.toString()}`);
      return data.events;
    },
  });
};