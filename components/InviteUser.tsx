"use client"
import {
	Dialog,

	DialogContent,
	DialogDescription,

	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"

import { Input } from "./ui/input"
import { inviteUserToDocument } from "@/actions/actions"

function InviteUser() {
	const [isOpen, setIsOpen] = useState(false)
	const [isPending, startTransition] = useTransition()
	const [email,setEmail] = useState("")

	const pathname = usePathname()
	const handleInvite = async (e: FormEvent) => {
		e.preventDefault()
		const roomId = pathname.split("/").pop();
	  
		if (!roomId) return;
		startTransition(async () => {
			const { success } = await inviteUserToDocument(roomId,email);
			if (success) {
				setIsOpen(false)
				setEmail('')
			}
		})
	}
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<Button asChild variant="outline">
				<DialogTrigger>Invite</DialogTrigger>
			</Button>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						Invite User
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleInvite} className="flex gap-2">
					<Input type="email"
					placeholder="Email"
					className="w-full"
					value={email}
					onChange={(e)=> setEmail(e.target.value)}/>
					<Button type="submit"  disabled={!email || isPending}>
						{isPending ? "Inviting..." : "Invite"}
					</Button>
				</form>
			</DialogContent>
		</Dialog>

	)
}
export default InviteUser