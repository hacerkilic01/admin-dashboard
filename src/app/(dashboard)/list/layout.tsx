export const runtime = "nodejs"
export const dynamic = "force-dynamic"

import { ReactNode } from "react"

export default function ListLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}