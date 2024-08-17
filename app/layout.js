"use client"

import { ClerkProvider } from "@clerk/nextjs"

export default function Layout({ children }) {
	return (
		<ClerkProvider>
			<html>
				<body>{children}</body>
			</html>
		</ClerkProvider>
	)
}
