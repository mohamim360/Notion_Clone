"use client"

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import {
	Tooltip,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Avatars() {
	const others = useOthers();
	const self = useSelf()

	const all = [self, ...others]
	return (
		<div className="flex gap-2 items-enter">
			<p className="text-sm font-light">Users currently editing this page</p>
			<div>
				{all.map(other, i) =>{
					<TooltipProvider key={other?.id + i}>
						<Tooltip>
							<TooltipTrigger>
								<Avatar className="border-2 hover:z-50">
									<AvatarImage src={other?.info.avatar} />
									<AvatarFallback>{other?.info.name}</AvatarFallback>
								</Avatar>

							</TooltipTrigger>
							<TooltipContent>
								<p>{self?.id === other?.id ? "you" : other?.info.name}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

				}}
			</div>
		</div>
	)
}
export default Avatars