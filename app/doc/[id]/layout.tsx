import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server";
import React from "react";

function DocLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  // Await the params to destructure `id`
	const { id } = React.use(params);


  // Protect the route
  auth.protect();

  // Return the layout
  return (
    <RoomProvider roomId={id}>
      <div className="relative min-h-screen">
        {children}
      </div>
    </RoomProvider>
  );
}

export default DocLayout;
