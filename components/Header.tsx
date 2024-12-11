"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";

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
