
function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    db.collection("todo-items").add({
        text: text.value,
        status: "active",
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

    text.value = "";
}

function getItems(){
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data()
            });
        });
        generateItems(items);
    });
}

function generateItems(items){
    let itemsHTML = "";
    items.forEach((item) => {
        itemsHTML += `
        <div class="todo-item">
            <div class="check">
                <div data-id="${item.id}" class="check-mark ${item.status == "completed" ? "checked" : ""}">
                    <img src="./assets/icon-check.svg" alt="">
                </div>
            </div>
            <div class="todo-text ${item.status == "completed" ? "checked" : ""}">
                ${item.text}
            </div>
        </div>
        `;
    });  
    document.querySelector(".todo-items").innerHTML = itemsHTML;
    createEventListeners();
}

getItems();

function createEventListeners(){
    let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
    todoCheckMarks.forEach((checkMark) => {
        checkMark.addEventListener("click", () => {
            markCompleted(checkMark.dataset.id);
        });
    });

    function markCompleted(id){
        let item = db.collection("todo-items").doc(id);
        item.get().then((doc) => {
            if(doc.exists){
                let status = doc.data().status;
                if(status == "active"){
                    item.update({
                        status: "completed"
                    });
                } else if(status == "completed"){
                    item.update({
                        status: "active"
                    });
                }

                console.log("Document successfully updated!");
                console.log(doc.data().status);
            }
        });
    }   
}

function deleteAllItems(){
    db.collection("todo-items").get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            db.collection("todo-items").doc(doc.id).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        });
    });
}


function showAllItems(){
        getItems();
};


function showActiveItems(){
    db.collection("todo-items").get().then((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            if(doc.data().status == "active"){
                console.log(doc.data());
                items.push({
                    id: doc.id,
                    ...doc.data()
                });
                console.log(items);
                generateItems(items);
            }
        });
    });
}

function showCompletedItems(){
    db.collection("todo-items").get().then((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            if(doc.data().status == "completed"){
                console.log(doc.data());
                items.push({
                    id: doc.id,
                    ...doc.data()
                });
                console.log(items);
                generateItems(items);
            }
        });
    });
}

function deleteCompletedItems(){    
    db.collection("todo-items").get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            if(doc.data().status == "completed"){
                db.collection("todo-items").doc(doc.id).delete().then(() => {
                    console.log("Document successfully deleted!");
                    getItems();
                }).catch((error) => {
                    console.error("Error removing document: ", error);
                });
            }
        }
    );
    });
}

let activeButton = document.getElementById("active");
let completedButton = document.querySelector("#completed");
let allButton = document.querySelector("#all");
let clearButton = document.querySelector("#clear");

console.log(activeButton);

activeButton.addEventListener("click", () => {
    showActiveItems();
    activeButton.classList.add("active");
    allButton.classList.remove("active");
    completedButton.classList.remove("active");

});

completedButton.addEventListener("click", () => {
    showCompletedItems();
    completedButton.classList.add("active");
    allButton.classList.remove("active");
    activeButton.classList.remove("active");
});

allButton.addEventListener("click", () => {
    showAllItems();
    allButton.classList.add("active");
    activeButton.classList.remove("active");
    completedButton.classList.remove("active");
}); 

clearButton.addEventListener("click", () => {
    deleteCompletedItems();
});

//show number of active items
function showActiveItemsNumber(){
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            if(doc.data().status == "active"){
                items.push({
                    id: doc.id,
                    ...doc.data()
                });
            }
        });
        document.querySelector(".items-left").textContent = `${items.length} items left`;
    });
}

showActiveItemsNumber();


