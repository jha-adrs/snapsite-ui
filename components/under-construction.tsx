// Component to show when a page is under construction
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { RocketIcon } from "lucide-react"

export const UnderConstruction = () => {
    return (
        <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-screen h-screen overflow-auto overscroll-contain -z-50">
            <ExclamationTriangleIcon className="w-10 h-10 text-muted-foreground" />
            <p className="text-xl font-semibold text-foreground/90">
                Code wizards on duty!
            </p>
            <p className="text-sm text-gray-500">
                Check back soon!  <RocketIcon className="w-4 h-4 inline-block" />
            </p>
        </div>
    )
}