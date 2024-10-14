import Image from "next/image"
import Link from "next/link"
import { DottedSeparator } from "./dotted-separator"
import { Navigation } from "./navigation"


export const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link className="flex flex-col items-center justify-center" href={"/"}>
        <Image src="/logo.svg" alt="logo" width={60} height={20} />
        <h3>Task IT</h3>
      </Link>
      <DottedSeparator className="my-2"/>
      <Navigation/>

    </aside>
  )
}
