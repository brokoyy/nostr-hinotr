import React from "react";
import { useTimeline } from "../timeline/useTimeline";
import { fetchProfile } from "../api/fetchProfile";

interface TimelineEvent {
  id: string;
  pubkey: string;
  created_at: number;
  content: string;
}

export const TimelineList: React.FC = () => {
  const { events } = useTimeline();
  const [profiles, setProfiles] = React.useState<Record<string, any>>({});

  React.useEffect(() => {
    const loadProfiles = async () => {
      const pubkeys = [...new Set(events.map((e) => e.pubkey))];
      const newProfiles: Record<string, any> = {};

      for (const pk of pubkeys) {
        if (!profiles[pk]) {
          try {
            newProfiles[pk] = await fetchProfile(pk);
          } catch (e) {
            console.error("プロフィール取得失敗:", e);
          }
        }
      }
      setProfiles((prev) => ({ ...prev, ...newProfiles }));
    };

    if (events.length > 0) {
      loadProfiles();
    }
  }, [events]);

  return (
    <div className="space-y-4 p-4">
      {events.map((event: TimelineEvent) => {
        const profile = profiles[event.pubkey] || {};
        return (
          <div
            key={event.id}
            className="flex items-start space-x-3 p-3 rounded-2xl shadow bg-white"
          >
            <img
              src={profile.picture || "/default-avatar.png"}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="font-semibold">
                {profile.display_name || profile.name || "名無し"}
              </div>
              <div className="text-gray-700 whitespace-pre-wrap break-words">
                {event.content}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(event.created_at * 1000).toLocaleString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
