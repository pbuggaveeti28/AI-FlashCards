"use client"

import { useState } from "react"
import {
	Container,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	TextField,
	Button,
	Typography,
	Box,
	Grid,
	CardContent,
	Paper,
	Card,
	CardActionArea
} from "@mui/material"
import { useUser } from "@clerk/nextjs"
import { collection } from "firebase/firestore"
import { useRouter } from "next/navigation"

export default function Generate() {
	const { isLoaded, isSignedIn, user } = useUser()
	const [flashcards, setFlashcards] = useState([])
	const [flipped, setFlipped] = useState([])
	const [text, setText] = useState("")
	const [name, setName] = useState("")
	const [open, setOpen] = useState(false)
	const router = useRouter()

	const [dialogOpen, setDialogOpen] = useState(false)

	const handleOpenDialog = () => setDialogOpen(true)
	const handleCloseDialog = () => setDialogOpen(false)

	const saveFlashcards = async () => {
		if (!name) {
			alert("Please enter a name for your flashcard set.")
			return
		}

		try {
			const batch = writeBatch(db)

			const userDocRef = doc(collection(db, "users"), user.id)
			const userDocSnap = await getDoc(userDocRef)

			if (userDocSnap.exists()) {
				if (collection.find((item) => item.name == name)) {
					alert("Flashcard with same name already exists")
					return
				} else {
					collection.push(name)
					batch.set(userDocRef, { flashcardSets: updatedSets }, { merge: true })
				}
			} else {
				//Does not exist
				batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
			}

			const colref = collection(userDocRef, name)

			flashcards.forEach((item) => {
				const cardRef = doc(colref)
				batch.set(userDocRef, flashcards)
			})

			await batch.commit()
			handleCloseDialog()

			alert("Flashcards saved successfully!")

			setSetName("")
			router.push("/flashcards")
		} catch (error) {
			console.error("Error saving flashcards:", error)
			alert("An error occurred while saving flashcards. Please try again.")
		}
	}

	const handleSubmit = async () => {
		if (!text.trim()) {
			alert("Please enter some text to generate flashcards.")
			return
		}

		try {
			const response = await fetch("./api/generate", {
				method: "POST",
				body: text
			})

			if (!response.ok) {
				throw new Error("Failed to generate flashcards")
			}

			const data = await response.json()

			setFlashcards(data)
		} catch (error) {
			console.error("Error generating flashcards:", error)
			alert("An error occurred while generating flashcards. Please try again.")
		}
	}

	const handleCardCLick = (id) => {
		setFlipped((prev) => ({
			...prev,
			[id]: !prev[id]
		}))
	}

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	return (
		<>
			<Container maxWidth="md">
				<Box
					sx={{
						mt: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center"
					}}
				>
					<Typography variant="h4" component="h1" gutterBottom>
						Generate Flashcards
					</Typography>
					<Paper sx={{ width: "100%", p: 4, mb: 4 }}>
						<TextField
							value={text}
							onChange={(e) => setText(e.target.value)}
							label="Enter text"
							fullWidth
							multiline
							rows={4}
							variant="outlined"
							sx={{ mb: 2 }}
						/>
					</Paper>
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						fullWidth
					>
						Generate Flashcards
					</Button>

					{flashcards.length > 0 && (
						<Box sx={{ mt: 4 }}>
							<Typography variant="h5" component="h2" gutterBottom>
								Generated Flashcards
							</Typography>
							<Grid container spacing={3}>
								{flashcards.map((flashcard, index) => (
									<Grid item xs={12} sm={6} md={4} key={index}>
										<Card>
											<CardActionArea onClick={() => handleCardCLick(index)}>
												<CardContent>
													<Typography variant="h6">Front:</Typography>
													<Typography>{flashcard.front}</Typography>
													<Typography variant="h6" sx={{ mt: 2 }}>
														Back:
													</Typography>
													<Typography>{flashcard.back}</Typography>
												</CardContent>
											</CardActionArea>
										</Card>
									</Grid>
								))}
							</Grid>
						</Box>
					)}

					{flashcards.length > 0 && (
						<Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
							<Button
								variant="contained"
								color="primary"
								onClick={handleOpenDialog}
							>
								Save
							</Button>
						</Box>
					)}
				</Box>

				{/* We'll add flashcard display here */}
			</Container>

			<Dialog open={dialogOpen} onClose={handleCloseDialog}>
				<DialogTitle>Save Flashcard Set</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter a name for your flashcard set.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						label="Set Name"
						type="text"
						fullWidth
						value={setName}
						onChange={(e) => setName(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Cancel</Button>
					<Button onClick={saveFlashcards} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
