import { useEventFilter } from "@/stores/useEventFilterStore"


export default function PaginationControls({totalpage}){
        const { page, setPage} = useEventFilter()
    return(
        <div>
            {
                Array.from({length:totalpage},(_,i) => (
                    <button
                        key={i+1}
                        onClick={() => setPage(i+1)}
                        className={`ml-2 px-4 py-2 rounded ${
                            page === i + 1 ? "bg-accent text-white" : "bg-accent/10"
                          }`}
                    >
                    {i + 1}
                    </button>
                ))
            }
        </div>
    )
}