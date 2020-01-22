//INSTRUCTIONS FOR PYRAMID WORD EXERCISE
/*------------------------------------------------------------------------------------
Pyramid word: 
Please write a web service that takes in a string and returns 
a boolean to indicate whether a word is a pyramid word.  A word is a ‘pyramid’ word 
if you can arrange the letters in increasing frequency, starting with 1 
and continuing without gaps and without duplicates.

Examples:

banana is a pyramid word because you have 1 'b', 2 'n's, and 3 'a's.

bandana is not a pyramid word because you have 1 'b' and 1 'd'.

You can use any language. When completed, please upload to a public repository, 
such as GitHub, and provide us with the link 
-------------------------------------------------------------------------------------*/
//DEPENDENCIES
const express = require('express')
const app = express()
const Joi = require('joi')

//MIDDLEWARE
app.use(express.json())

//PYRAMID WORD ALGORITHM-------------------------------------------------------------------------------------
this.isPyramid = (word) => {
    //Advanced Input Validation -- Filter out any non-alphabetic characters and set all letters to lowercase.
    let letters = word.trim().toLowerCase().slice(0).split('').sort()
    for (let i in letters){
        if (!letters[i].match(/[a-z]/)) {
            letters.splice(i)
        }
    }

    //Variable Declarations
    let letterCounts = []
    let lettersCounter = 1
    let verdict = true

    //Count the frequency of each letter in the word; add the frequencies to letterCounts
    for (let i = 0; i < letters.length; i++) {
        if (letters[i] === letters[i+1]){
            lettersCounter++
        }
        else {
            letterCounts.push(lettersCounter)
            lettersCounter = 1
        }
    }
    //Sort the frequencies in ascending order
    letterCounts.sort((a,b) => a - b)
    //Check to see if the number sequence follows the (n+1) pattern of a pyramid word
    for (let i = 0; i < letterCounts.length; i++){
        if (letterCounts[i] !== (i+1)){
            verdict = false
        }
    }
    return verdict
}
//-------------------------------------------------------------------------------------------------------------
//ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the Pyramid Word Challenge!')
})

app.post('/', (req, res) => {
    //Basic input validation -- Return an error if the word is under 3 letters long
    const schema = {
        word: Joi.string().min(3).required()
    }
    const result = Joi.validate(req.body, schema)
    if (result.error) return res.status(400).send(result.error.details[0].message)
    
    //Pass the word to be evaluated by the pyramid word test
    const isPyramidWord = this.isPyramid(req.body.word)    

    //Send true or false based on if the word passes the test
    res.send(isPyramidWord)
})

//PORT
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Listening on port ${port}`))