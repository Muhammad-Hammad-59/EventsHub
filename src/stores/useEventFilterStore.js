import { create } from "zustand"

export const useEventFilter = create( (set) => ({
  page: 1,
  limit: 10,
  type: '',
  createdBy: '',
  search: '',
  category: '',


  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setPage: (page ) => set({ page }),
  setLimit: (limit ) => set({ limit }),
  setType: (type ) => set({ type }),
  setCreatedBy: (createdBy ) => set({ createdBy }),
}) )