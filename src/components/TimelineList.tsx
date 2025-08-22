import React from "react";
import { NostrEvent } from "nostr-tools";

export interface TimelineEventWithProfile extends NostrEvent {
  profile?: { name?: string; picture?: string };
}

interface Props {
  events: TimelineEventWithProfile[];
}

const TimelineList: React.FC<Props> = ({ events }) => {
  if (!events || events.length === 0) {
    return <div>投稿がありません</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {events.map((e) => {
        const profile = e.profile || {};
        return (
          <div
            key={e.id}
            className="flex items-center p-4 border-b border-gray-200 bg-white rounded shadow-sm"
          >
            {profile.picture && (
              <img
                src={profile.picture}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
            )}
            <div>
              <div className="font-bold">{profile.name || e.pubkey}</div>
              <div>{e.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineList;
