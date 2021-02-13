
//const backend_url = 'http://localhost:8081/memes';
const backend_url = 'https://xmemes-api.herokuapp.com/memes';
const memeForm =  document.querySelector('.add');
const showMemes = document.querySelector('.showMemes');


const getMemes = async() => { 
    const response = await fetch(backend_url);
    const data = await response.json();
    console.log(data);
    return data;
}

const displayUI = () => {

    getMemes()
    .then( data => {
        showMemes.innerHTML=``;
        data.forEach( (meme,index) => {
            console.log(meme.url);
            // update displayMemes template
            showMemes.innerHTML+=
            `<div class="card" id=${meme._id}>
            <h4> ${meme.name} </h4>
            <p>caption : ${meme.caption} </p>
            <img src=${meme.url} />
            <button class ="deletebutton">
                Delete
            </button>
            <button class ="editbutton" >Edit</button>
            <div class="myDiv" style="display:none">
            <form class="editform" onsubmit="return false">
            <label for="name">Name</label>
            <input type="text" name="name" value=${meme.name} readonly>
        
            <label for="caption">Caption</label>
            <input type="text" name="caption"  placeholder="Enter caption.." required>
        
            <label for="url">URL</label>
            <input type="text" name="url"  placeholder="Enter URL.." required>
        
            <input type="submit" value="Update" >
          </form>
            </div>


            </div>`;
        })
    })
    .catch(err => console.log(err));

   
}

const addUI = (meme) => {
    console.log(showMemes.innerHTML);
    showMemes.innerHTML=
            `<div class="card" id=${meme.id}>
            <h4> ${meme.name} </h4>
            <p>caption : ${meme.caption} </p>
            <img src=${meme.url} />
            <button class ="deletebutton">
              Delete
            </button>
            <button class ="editbutton" >Edit</button>
            <div class="myDiv" style="display:none">
            <form class="editform" onsubmit="return false">
            <label for="name">Name</label>
            <input type="text" name="name" value=${meme.name} readonly>
        
            <label for="caption">Caption</label>
            <input type="text" name="caption"  placeholder="Enter caption.." required>
        
            <label for="url">URL</label>
            <input type="text" name="url"  placeholder="Enter URL.." required>
        
            <input type="submit" value="Update" >
          </form>
            </div>
            </div>` + showMemes.innerHTML;
        
            console.log(showMemes.innerHTML);
}

const updateUI = (e, meme) => {
    console.log(meme.name,meme.url,meme.caption);
    e.innerHTML = 
            `<h4> ${meme.name} </h4>
            <p>caption : ${meme.caption} </p>
            <img src=${meme.url} />
            <button class ="deletebutton">
              Delete
            </button>
            <button class ="editbutton" >Edit</button>
            <div class="myDiv" style="display:none">
            <form class="editform" onsubmit="return false">
            <label for="name">Name</label>
            <input type="text" name="name" value=${meme.name} readonly>
        
            <label for="caption">Caption</label>
            <input type="text" name="caption"  placeholder="Enter caption.." required>
        
            <label for="url">URL</label>
            <input type="text" name="url"  placeholder="Enter URL.." required>
        
            <input type="submit" value="Update" >
          </form>
            </div>`;

}

memeForm.addEventListener('submit',async(e) => {
    // prevent default action
 
    e.preventDefault();
    
    // get userName
    const name = memeForm.name.value.trim();
    //get caption
    const caption = memeForm.caption.value.trim();
    //get url
    const url = memeForm.url.value.trim();
    const meme = {name,caption,url};
    console.log(meme);
    memeForm.reset();
  
    // update the db with new Meme
    await fetch(backend_url, {
            method: "POST",
            body: JSON.stringify(meme),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(response => response.json())
            .then(json => {
                meme.id = json.id;
                console.log(meme);
                addUI(meme);
            }
                )
            .catch(err => console.log(err))
  
    // set local storage
    
  });
 
displayUI();

document.addEventListener('click', async(event) => {
    console.log(event.target);
    
    const isButton = event.target.className ;
    console.log(isButton);
    if( isButton === 'editbutton'){
       const Button= event.target.nextElementSibling;
       console.log(Button);
       console.log(Button.style.display);
       if(Button.style.display === "none")
            Button.style.display = "block";
        else
            Button.style.display = "none";
    }   
    if (isButton !== 'deletebutton') {
      return;
   }
   

   const id = event.target.parentElement.id;
   console.log(id);
   await fetch(backend_url + '/' + id, {
    method: 'DELETE'
}).then(response => {
        console.log(response);
        event.target.parentElement.remove();
    })
    .catch(err => {
        console.log(err);
    })

})

document.addEventListener('submit',async(event) => {
   // console.log(event.target.parentElement.parentElement);
    const id= event.target.parentElement.parentElement.id;
    const name = event.target.name.value.trim();
    //get caption
    const caption = event.target.caption.value.trim();
    //get url
    const url = event.target.url.value.trim();
    const meme = {name,caption,url};
    console.log(meme);
    await fetch(backend_url + '/' + id, {
        method: "PATCH",
        body: JSON.stringify({caption,url}),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    }).then(response => response.json())
        .then(json => {
            console.log(json);
          // console.log(event.target.parentElement.parentElement);
            updateUI(event.target.parentElement.parentElement,meme);
        })
        .catch(err => console.log(err));

})