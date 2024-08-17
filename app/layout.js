"use client"

import { ClerkProvider } from "@clerk/nextjs"

export default function Layout({ children }) {
	return (
		<html>
			<body>
				<ClerkProvider>{children}</ClerkProvider>
			</body>
		</html>
	)
}
