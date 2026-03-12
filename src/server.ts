import app from './app'


const PORT: number = parseInt(process.env.PORT || "8000")


app.post("/send", (req, res) => {
  console.log("POST /send was called")

  res.send("OK")
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server started on port ${PORT}`)
})