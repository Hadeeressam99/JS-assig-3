var bookmarkArr=[];
var bookmarkInput=document.getElementById("sn");
var siteUrlInput= document.getElementById("su");
var updateBtn= document.getElementById("updateBtn");
var addBtn=document.getElementById("addBtn");
var updatedIndex;

function clear(){
    bookmarkInput.value="";
    siteUrlInput.value="";
}

if(localStorage.getItem("bookmarks") != null){
    bookmarkArr=JSON.parse(localStorage.getItem("bookmarks"));
    displaySite();
}

function displaySite(){

    var container="";

    for(i=0; i<bookmarkArr.length; i++){
        container+=`<tr>
        <td>`+(i+1)+`</td>
        <td>`+bookmarkArr[i].name+`</td>
        <td><button class="btn pe-2 visit" onclick="visit(${i})"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
        <td><button class="btn pe-2 delete" onclick="deleteElement(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        <td><button class="btn pe-2 bg-primary update" onclick="updateForm(${i})">Update</button></td>

    </tr>`

    }
    document.getElementById("table-data").innerHTML= container;
}

function addBookmark(){
    
    if(validation()){
    var site={
        name: document.getElementById("sn").value,
        url: document.getElementById("su").value
    }
    bookmarkArr.push(site);
    clear();
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkArr));
    displaySite();
    }
    else{
        alert("Make sure the name starts with uppercase and the url starts with https");
    }
}

function deleteElement(idex){
    bookmarkArr.splice(idex,1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkArr));
    displaySite();
}

function updateForm(index){
    addBtn.classList.add("d-none");
    updateBtn.classList.replace("d-none", "d-block");
    bookmarkInput.value=bookmarkArr[index].name;
    siteUrlInput.value=bookmarkArr[index].url;
    updatedIndex=index;
}

function updateElement(){

    var website={
        name: bookmarkInput.value,
        url: siteUrlInput.value
    }
    bookmarkArr.splice(updatedIndex,1,website);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkArr));
    clear();
    displaySite();
    addBtn.classList.remove("d-none");
    updateBtn.classList.replace("d-block", "d-none",);
}

function visit(index){
    open(bookmarkArr[index].url);
}

function search(element){

    var cartona="";

    for(i=0; i<bookmarkArr.length; i++){

        if(bookmarkArr[i].name.toLowerCase().includes(element.toLowerCase())){

            cartona+=`<tr>
            <td>`+(i+1)+`</td>
            <td>`+bookmarkArr[i].name+`</td>
            <td><button class="btn pe-2 visit" onclick="visit(${i})"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
            <td><button class="btn pe-2 delete" onclick="deleteElement(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            <td><button class="btn pe-2 bg-primary update" onclick="updateForm(${i})">Update</button></td>
    
        </tr>`
    
        }
        document.getElementById("table-data").innerHTML= cartona;  
    }   
 }

 function validation(){
    let nameRegex=/^[A-Z][a-z]{1,}$/;
    let urlRegex=/^(https)/;

    return nameRegex.test(bookmarkInput.value)&& urlRegex.test(siteUrlInput.value);
 }