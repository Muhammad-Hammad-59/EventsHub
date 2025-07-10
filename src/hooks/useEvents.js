import { category } from "@/components/home/home";
import { useEventFilter } from "@/stores/useEventFilterStore";
import { useQuery } from "@tanstack/react-query";



  const fetchEvents = async ({ queryKey }) => {
    const [_key, { page, limit, type, createdBy,search,category }] = queryKey;
  
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
  
    if (type) params.append('type', type);
    if (createdBy) params.append('createdBy', createdBy);

    if (search) params.append('search', search);
    if (category) params.append('category', category);
  
    const res = await fetch(`/api/events?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
  };




  export const useEvents = () => {
    const { page, limit, type, createdBy,search,category } = useEventFilter();
  
    return useQuery({
      queryKey: ['events', { page, limit, type, createdBy,search,category }],
      queryFn: fetchEvents,
      keepPreviousData: true,
      staleTime: 1000 * 60, // 1 min
    });
  };