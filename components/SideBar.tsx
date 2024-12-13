"use client"
import { db } from '@/firebase';
import NewDocumentButton from './NewDocumentButton'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { useUser } from '@clerk/nextjs';
import { collectionGroup, DocumentData, query, where } from 'firebase/firestore';
import { MenuIcon } from 'lucide-react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useState } from 'react';
import SidebarOption from './SidebarOption';

interface RoomDocument extends DocumentData {
	createdAt: string;
	role: "owner" | "editor";
	roomId: string;
	userId: string;
}

function SideBar() {
	const { user } = useUser()
	const [groupedData, setGroupedData] = useState<{
		owner: RoomDocument[],
		editor: RoomDocument[]
	}>({
		owner: [],
		editor: []
	})
	console.log("User:", user);
	console.log("Email:", user?.emailAddresses?.[0]?.toString());

	const [data] = useCollection(
		user && query(collectionGroup(db, 'rooms'), where('userId', '==', user.emailAddresses[0].emailAddress))
	)

	// 	[
	// 		{
	// 			"id": "room1",
	// 			"role": "owner",
	// 			"userId": "user@example.com"
	// 		},
	// 		{
	// 			"id": "room2",
	// 			"role": "editor",
	// 			"userId": "user@example.com"
	// 		}
	// 	]
	// groupeData:
	// 	{
	// 		"owner": [
	// 			{
	// 				"id": "room1",
	// 				"role": "owner",
	// 				"userId": "user@example.com"
	// 			}
	// 		],
	// 		"editor": [
	// 			{
	// 				"id": "room2",
	// 				"role": "editor",
	// 				"userId": "user@example.com"
	// 			}
	// 		]
	// 	}


	useEffect(() => {

		if (!data) return;

		const grouped = data.docs.reduce<{
			owner: RoomDocument[];
			editor: RoomDocument[];
		}>(
			(acc, curr) => {
				const roomData = curr.data() as RoomDocument;
				console.log(roomData);

				if (roomData.role === "owner") {
					acc.owner.push({
						id: curr.id,
						...roomData
					})
				} else {
					acc.editor.push({
						id: curr.id,
						...roomData
					})
				}
				return acc;
			},
			{
				owner: [],
				editor: []
			}
		)
		setGroupedData(grouped)
	}, [data])

	const menuOptions =
		(<>
			<NewDocumentButton />
			<div className='flex flex-col py-4 space-y-4 md:max-w-36'>
				{/* My Documents */}
				{groupedData.owner.length === 0 ? (
					<h2 className='text-gray-500 text-sm font-semibold'>No documents found</h2>
				) : (
					<>
						<h2 className='text-gray-500 text-sm font-semibold'>My documents</h2>
						{
							groupedData.owner.map((doc) => (
								<SidebarOption key={doc.id} href={`/doc/${doc.id}`} id={doc.id} />
							))
						}
					</>
				)}
			</div>
			{/* Shared with me */}
			{
				groupedData.editor.length > 0 && (
					<>
						<h2 className='text-gray-500 text-sm font-semibold'>Share with me</h2>
						{
							groupedData.editor.map((doc) => (
								<SidebarOption key={doc.id} href={`/doc/${doc.id}`} id={doc.id} />
							))
						}
					</>
				)
			}
		</>)

	return (
		<div className='p-2 md:p-5 bg-gray-200 relative'>
			<div className='md:hidden'>
				<Sheet>
					<SheetTrigger>
						<MenuIcon className='p-2 md:p-5 bg-gray-200 relative' size={40} />
					</SheetTrigger>
					<SheetContent side='left'>
						<SheetHeader>
							<SheetTitle>Menu</SheetTitle>
							<div>{menuOptions}</div>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
			<div className='hidden md:inline'>
				{menuOptions}
			</div>

		</div>
	)
}

export default SideBar