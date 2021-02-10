

const buildMemeCard = meme => {

}

fetch("http://localhost:8081/memes") 
    
// Converting received data to JSON 
.then(response => response.json()) 
.then(json => {   
    // Loop through each meme
    console.log(json);
    //json.forEach(meme => {buildMemeCard(meme)}); 
}); 