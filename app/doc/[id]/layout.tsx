import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";

function DocLayout({ children, params: { id } }: { children: React.ReactNode; params: { id: string } }) {
	auth.protect()
	return (
		<RoomProvider roomId={id}>
			<div className="relative min-h-screen">
			{children}
			</div>
		</RoomProvider>
	)
}
export default DocLayout