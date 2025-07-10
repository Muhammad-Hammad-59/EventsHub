export default function AgendaTable({ agenda }) {
    return (
      <div className="overflow-x-auto border rounded-xl bg-backgroundSecondary">
        <h2 className="text-xl font-semibold p-4">Agenda</h2>
        <table className="min-w-full text-left">
          <thead className="bg-accent text-white">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Session Title</th>
              <th className="px-4 py-3">Duration</th>
             
            </tr>
          </thead>
          <tbody className="bg-white">
            {agenda.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3">{
                  new Date(item.date).toLocaleDateString("en-US", {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })
                  }</td>
                <td className="px-4 py-3">{item.starttime}</td>
          
                <td className="px-4 py-3">{item.sessionName}</td>
                <td className="px-4 py-3">{item.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  