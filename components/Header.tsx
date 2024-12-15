"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";

function Header() {
const	{ user } = useUser()
	return (
		<div className="flex justify-between p-5 items-center">
			{
				user && (
					<h1>
						{user?.firstName}{`'s`} Space
					</h1>
				)
			}
			{/* Breadcrumbs */}
			<Breadcrumbs/>

			<div>
				<SignedOut>
					<SignInButton/>
				</SignedOut>

				<SignedIn>
					<UserButton/>
				</SignedIn>
			</div>
		</div>
	)
}

export default Header;
