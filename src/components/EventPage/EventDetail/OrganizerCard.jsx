export default function OrganizerCard({ organizer }) {
    if (!organizer) {
      return (
        <div className="border p-6 rounded-xl shadow-sm bg-backgroundSecondary w-full">
          <h3 className="text-lg font-semibold mb-4">Organizer</h3>
          <hr />
          <div className="mt-4 text-sm text-gray-500">
            Organizer information not available.
          </div>
        </div>
      );
    }

    return (
      <div className="border p-6 rounded-xl shadow-sm bg-backgroundSecondary w-full">
        <h3 className="text-lg font-semibold mb-4">Organizer</h3>
        <hr />
        <div className="flex lg:flex-row sm:items-start md:flex-col gap-4 mt-4 mb-4">
          <img
            src={organizer?.image || "/eventimg1.jpg"}
            alt={organizer?.username || "Organizer"}
            className="w-24 h-24 rounded-xl object-cover"
          />
          <div className="text-center sm:text-left space-y-1">
            <div className="font-medium text-base">{organizer?.username || "Unknown"}</div>
            <div className="text-sm text-gray-500">{organizer?.name}</div>
            <div className="text-sm text-blue-500 break-all">{organizer?.email}</div>
          </div>
        </div>
        <hr />
        <div className="mt-4 space-y-4 text-sm text-gray-700">
          <div className="space-y-1">
            <h4 className="font-semibold">Contact</h4>
            <p>{organizer?.phone || "N/A"}</p>
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold">Email</h4>
            <p className="break-all">{organizer?.email || "N/A"}</p>
          </div>
        </div>
      </div>
    );
  }