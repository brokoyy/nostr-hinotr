import { getEventHash, signEvent, Event } from "nostr-tools";


export async function createPost(content: string, pubkey: string, signer: any) {
const event: Event = {
kind: 1,
pubkey,
created_at: Math.floor(Date.now() / 1000),
tags: [],
content,
id: "",
sig: "",
};


event.id = getEventHash(event);
event.sig = await signer.signEvent(event);


return event;
}
