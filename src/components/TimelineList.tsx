import { useTimeline } from "../timeline/useTimeline";
import { useEffect, useState } from "react";
import { fetchProfile } from "../api/fetchProfile";


export default function TimelineList() {
const events = useTimeline();
const [profiles, setProfiles] = useState<Record<string, any>>({});


useEffect(() => {
(async () => {
const pubkeys = [...new Set(events.map((e) => e.pubkey))];
const newProfiles: Record<string, any> = {};
for (const pk of pubkeys) {
if (!profiles[pk]) {
const profile = await fetchProfile(pk);
newProfiles[pk] = profile;
}
}
if (Object.keys(newProfiles).length > 0) {
setProfiles((prev) => ({ ...prev, ...newProfiles }));
}
})();
}, [events]);


return (
<div className="space-y-4">
{events.map((event) => {
const profile = profiles[event.pubkey];
return (
<div key={event.id} className="border rounded p-2 shadow">
<div className="flex items-center gap-2">
{profile?.picture && (
<img src={profile.picture} alt="icon" className="w-8 h-8 rounded-full" />
)}
<span className="font-bold">{profile?.name || event.pubkey.slice(0, 8)}</span>
</div>
<p className="mt-2">{event.content}</p>
</div>
);
})}
</div>
);
}
