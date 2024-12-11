import React from 'react'
import NewDocumentButton from './NewDocumentButton'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'

const menuOptions = 
(<>
<NewDocumentButton />
</>)


function SideBar() {
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