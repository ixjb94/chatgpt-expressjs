const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const { Configuration, OpenAIApi } = require("openai")
const { API_KEY } = require("./config")

// ####### OpenAI
const configuration = new Configuration({
    apiKey: API_KEY,
})
const openai = new OpenAIApi(configuration)
// ####### OpenAI

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})

app.post("/", async (req, res) => {
	
	try {
		const prompt = req.body.prompt

		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt,
			temperature: 0,
			max_tokens: 4000, 
		})

		let data = response.data.choices[0].text

		res.send(data)

	} catch (error) {
		console.log("Error:", error)
	}
})

app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})