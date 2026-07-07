"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function RegistrantsPage() {
  const params = useParams();
  const eventId = params?.eventId;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;
    (async () => {
      try {
        const res = await fetch(`/api/dashboard/my-events/${eventId}/registrants`, { credentials: "include" });
        const json = await res.json();
        if (res.ok) setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20">
        <p className="text-textSecondary">Could not load registrant data.</p>
        <Link href="/dashboard/my-events" className="text-accent text-sm mt-2 inline-block">← Back to My Events</Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/dashboard/my-events" className="inline-flex items-center gap-1 text-sm text-accent hover:underline mb-6">
        <ArrowLeftIcon className="w-4 h-4" /> Back to My Events
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-textPrimary">Registrants</h1>
        <p className="text-textSecondary text-sm mt-1">People registered for <span className="font-semibold text-textPrimary">{data.event?.title}</span></p>
      </div>

      {data.registrants?.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl">
          <p className="text-textSecondary text-lg">No one has registered for this event yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-backgroundSecondary">
                  <th className="text-left px-5 py-3 font-semibold text-textPrimary">#</th>
                  <th className="text-left px-5 py-3 font-semibold text-textPrimary">Name</th>
                  <th className="text-left px-5 py-3 font-semibold text-textPrimary">Email</th>
                  <th className="text-left px-5 py-3 font-semibold text-textPrimary">Phone</th>
                  <th className="text-left px-5 py-3 font-semibold text-textPrimary">Payment</th>
                  <th className="text-left px-5 py-3 font-semibold text-textPrimary">Registered At</th>
                </tr>
              </thead>
              <tbody>
                {data.registrants.map((r, idx) => (
                  <tr key={r._id} className="border-b border-gray-50 hover:bg-backgroundSecondary/50 transition">
                    <td className="px-5 py-3 text-textSecondary">{idx + 1}</td>
                    <td className="px-5 py-3 font-medium text-textPrimary">{r.name}</td>
                    <td className="px-5 py-3 text-textSecondary">{r.email}</td>
                    <td className="px-5 py-3 text-textSecondary">{r.phone}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.paymentStatus ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {r.paymentStatus ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-textSecondary text-xs">
                      {new Date(r.createdAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
