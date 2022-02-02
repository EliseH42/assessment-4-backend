

document.getElementById("complimentButton").onclick = function () {
axios.get("http://localhost:4000/api/compliment/")
    .then(function (response) {
        const data = response.data;
        alert(data);
    });
};

document.querySelector("#fortuneButton").addEventListener("click", () => {
axios.get("http://localhost:4000/api/fortune/")
    .then(function (response) {
        const data = response.data;
        alert(data);
    });
});

document.querySelector("#submitBtn").addEventListener("click",submitAffirmation)
    
    
function submitAffirmation(e){
    console.log("affirmation submitted")
    e.preventDefault()
    const affirmation = document.querySelector("#affirmation").value
    axios.post("http://localhost:4000/api/affirmation",{affirmation})
        .then(function(response){
            render(response.data)
        })

}


function newAffirmCard(affirmation, ID, likeCount) {
    const affirmCard = document.createElement('div')
    
    affirmCard.innerHTML = `<p>${affirmation}<p>
    <div>
        <button onclick="deleteAffirm(${ID})">X</button>
        <button onclick="like(${ID},${likeCount})">${likeCount}+</button>
    </div>
    `

    const affirmationContainer = document.querySelector("#affirmation-container")
    affirmationContainer.appendChild(affirmCard)
}

function like (ID, likeCount){
axios.put("http://localhost:4000/api/affirmation",{ID})
    .then(response => {
    render(response.data)

    })
}

function deleteAffirm (ID){
    axios.delete("http://localhost:4000/api/affirmation",{ID})
    .then(response => {
        render(response.data)
    })

}



function render(affirmations){
    affirmationContainer = document.querySelector("#affirmation-container")
    affirmationContainer.innerHTML = ''
    for(i=0;i<affirmations.length;i++){
        let {affirmation, ID, likeCount} = affirmations[i]
        newAffirmCard(affirmation, ID, likeCount)
    }
}
 

window.onload = () => {
    axios.get("http://localhost:4000/api/affirmation")
    .then(response =>{
    render(response.data)

    })
}
