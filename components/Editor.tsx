"use client"

import { useRoom, useSelf } from "@liveblocks/react/suspense"
import { useEffect, useState } from "react"
import * as Y from 'yjs'
import { LiveblocksYjsProvider } from '@liveblocks/yjs'
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css"
import stringToColor from "@/lib/stringToColor"
type EditorProps = {
	doc: Y.Doc;
	provider: any;
}
function BlockNote({ doc, provider }: EditorProps) {
	const userInfo = useSelf((me) => me.info)
	console.log(userInfo);
	const editor: BlockNoteEditor = useCreateBlockNote({
		collaboration: {
			provider,
			fragment: doc.getXmlFragment("document-store"),
			user: {
				name: userInfo?.name,
				color: stringToColor(userInfo?.email)
			}
		}
	})
	return (
		<div className="relative max-w-6xl mx-auto">
			<BlockNoteView className="min-h-screen"
				editor={editor} />
		</div>
	)
}

function Editor() {
	const room = useRoom()
	const [doc, setDoc] = useState<Y.Doc>()
	const [provider, setProvider] = useState<LiveblocksYjsProvider>()

	useEffect(() => {
		const yDoc = new Y.Doc()
		const yProvider = new LiveblocksYjsProvider(room, yDoc)
		setDoc(yDoc)
		setProvider(yProvider)
		return () => {
			yDoc?.destroy()
			yProvider?.destroy()
		}
	}, [room])

	if (!doc || !provider) {
		return null;
	}

	return (
		<div className="max-w-6xl mx-auto">
			<div className="flex items-center gap2 justify-end mb-10">

			</div>
			<BlockNote doc={doc} provider={provider} />
		</div>
	)
}
export default Editor