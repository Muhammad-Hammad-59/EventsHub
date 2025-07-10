import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchLatestEvents = async () => {
    const response = await axios.get(`/api/events?limit=5`)
    console.log("response from latest events", response)
     
    return response.data
}

export const fetchSingleEvent = async (id) => {
    const response = await axios.get(`/api/events?id=${id}`);
    console.log("response from latest events", response)
    return response.data.event;
  };

export const useLatestEvents = () => {
    return useQuery({
      queryKey: ["latest-events"],
      queryFn: fetchLatestEvents,
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
    });
  };


  export const useSingleEventQuery = (id) =>
    useQuery({
      queryKey: ["event", id],
      queryFn: () => fetchSingleEvent(id),
      enabled: !!id,
    });