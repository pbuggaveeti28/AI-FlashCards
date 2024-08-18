import {
	Box,
	Toolbar,
	Typography,
	Grid,
	AppBar,
	Button,
	Container
} from "@mui/material"
import Head from "next/head"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function Home() {
	const handleSubmit = async () => {
		const checkoutSession = await fetch("/api/checkout_sessions", {
			method: "POST",
			headers: { origin: "http://localhost:3000" }
		})
		const checkoutSessionJson = await checkoutSession.json()

		const stripe = await getStripe()
		const { error } = await stripe.redirectToCheckout({
			sessionId: checkoutSessionJson.id
		})

		if (error) {
			console.warn(error.message)
		}
	}

	return (
		<Container maxWidth="lg">
			<Head>
				<title>FlashCards AI</title>
				<meta name="description" content="Create flashcards"></meta>
			</Head>
			<AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
				<Toolbar>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						Flashcard SaaS
					</Typography>
					<SignedOut>
						<Button color="inherit" href="/sign-in">
							Login
						</Button>
						<Button color="inherit" href="/sign-up">
							Sign Up
						</Button>
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</Toolbar>
			</AppBar>

			{/* Hero section */}
			<Box sx={{ textAlign: "center", my: 4 }}>
				<Typography variant="h2" component="h1" gutterBottom>
					Welcome to Flashcard SaaS
				</Typography>
				<Typography variant="h5" component="h2" gutterBottom>
					The easiest way to create flashcards from your text.
				</Typography>
				<Button
					variant="contained"
					color="primary"
					sx={{ mt: 2, mr: 2 }}
					href="/generate"
				>
					Get Started
				</Button>
				<Button variant="outlined" color="primary" sx={{ mt: 2 }}>
					Learn More
				</Button>
			</Box>

			{/* Features Section: */}
			<Box sx={{ my: 6 }}>
				<Typography
					variant="h4"
					component="h2"
					gutterBottom
					sx={{ textAlign: "center" }}
				>
					Features
				</Typography>
				<Grid container spacing={4}>
					<Grid item xs={12} md={4}>
						<Typography variant="h6">Easy Text Input</Typography>
						<Typography>
							Simply input your text & let our software do the rest. Creating
							flash cards has never been easier
						</Typography>
					</Grid>

					<Grid item xs={12} md={4}>
						<Typography variant="h6">Smart Flashcards</Typography>
						<Typography>
							Our AI intelligently breaks down your text into concise flashcards
							perfect for studing
						</Typography>
					</Grid>

					<Grid item xs={12} md={4}>
						<Typography variant="h6">Accessible Anywhere</Typography>
						<Typography>
							Access your flashcards from any device at any time .Study on the
							go with ease
						</Typography>
					</Grid>
				</Grid>
			</Box>

			{/* Pricing Section */}
			<Box sx={{ my: 6, textAlign: "center" }}>
				<Typography variant="h4" component="h2" gutterBottom>
					Pricing
				</Typography>
				<Grid container spacing={4}>
					<Grid item xs={12} md={6}>
						<Box
							sx={{
								p: 3,
								border: "1px soild",
								borderColor: "grey.300",
								borderRadius: 2
							}}
						></Box>
						<Typography variant="h5">Basic</Typography>
						<Typography variant="h6">$5/month</Typography>
						<Typography>
							Access to basic flashcards features & limited storage
						</Typography>
						<Button variant="contained" color="primary">
							Choose Basic
						</Button>
					</Grid>

					<Grid item xs={12} md={6}>
						<Box
							sx={{
								p: 3,
								border: "1px soild",
								borderColor: "grey.300",
								borderRadius: 2
							}}
						></Box>
						<Typography variant="h5">Pro</Typography>
						<Typography variant="h6">$10/month</Typography>
						<Typography>
							Access to basic flashcards features & limited storage
						</Typography>
						<Button variant="contained" color="primary">
							Choose Pro
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Container>
	)
}
