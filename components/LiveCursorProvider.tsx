"use client"

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import FollowPointer from "./FollowPointer";

function LiveCursorProvider({ children }: { children: React.ReactNode }) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [myPresence, updateMyPresence] = useMyPresence();  //A Liveblocks hook that allows a user to set and update their presence data (e.g., cursor position).
	const others = useOthers(); //A Liveblocks hook that retrieves presence data of other connected users.

	function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
		const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) } //Captures the pointer's position (e.pageX and e.pageY) relative to the page.
		updateMyPresence({ cursor })
	}
	function handlePointerLeave() {
		updateMyPresence({ cursor: null })
	}

	return (
		<div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} >
			{others
			.filter((other) => other.presence.cursor !== null)
			.map(({ connectionId, presence, info }) => (
				<FollowPointer
				key={connectionId}
				info={info}
				x={presence.cursor!.x}
				y={presence.cursor!.y}
				 />
			))}
			{children}</div>
	)
}
export default LiveCursorProvider  //A component that wraps its children and adds real-time cursor sharing functionality.

// myPresence: The current user's presence state.

// updateMyPresence: A function to update the user's presence (e.g., cursor position or state).

// others: An array of objects representing other users connected in the same session. Each object includes:
// connectionId: A unique identifier for the user's connection.
// presence: The presence data of the user (e.g., their cursor position).
// info: Additional information about the user.