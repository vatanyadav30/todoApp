const inputBoxRef= document.querySelector('.inputField input'); 
const addButtonRef= document.querySelector('.inputField button');
const todoListRef=document.querySelector('.todoList');
const clearAllButtonRef=document.querySelector('.footer button');
const pendingTasksRef=document.querySelector('.pending');

inputBoxRef.addEventListener('keyup',(e)=>{  //on entering data in input
    const userdata= e.target.value; // getting user data
    if(userdata.trim()!=0){ // if data is not null
        addButtonRef.classList.add('active');   // active the button
    }
    else{
        addButtonRef.classList.remove('active'); //deactivate the button
    }
})

addButtonRef.addEventListener('click',(e)=>{ 
    let userInput= inputBoxRef.value; //get userdata
    let getlocalStorage= localStorage.getItem("NewTodo"); //get from localstorage
    if(getlocalStorage==null){  //if empty initalse with empty array
        listarr=[];

    }
    else{
        listarr = JSON.parse(getlocalStorage); // else get the array and parse it 
    }
    listarr.push(userInput); //push new tasks into array
    localStorage.setItem("NewTodo", JSON.stringify(listarr)); // set into localstorage again -- it stores string
    inputBoxRef.value=""; // make input box empty
    addButtonRef.classList.remove('active'); // to make add button inactive after adding a todo
    showTaks(); // function to render tasks
    

})

function showTaks(){
    let getlocalStorage= localStorage.getItem("NewTodo");  
    if(getlocalStorage==null){
        listarr=[];
    }
    else{
        listarr = JSON.parse(getlocalStorage);
    }
    let newLitag=''; //new variable for creating li tag 
    listarr.forEach( (task, index) => {  //looping through and creating li tags dynamically
        newLitag+=`<li data-id=${index}> ${task}<span><button onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button></span> </li>`;
    });

    todoListRef.innerHTML=newLitag; // added to main todolistRef

    pendingTasksRef.innerText=listarr.length;   // updated the tasks remaining in footer by array length
    if(listarr.length>0){ // if more than 1 tasks
        clearAllButtonRef.classList.add('active'); //add active class to button
    }
    else{
        clearAllButtonRef.classList.remove('active'); //else remove it
    }
   
}

function deleteTask(index){
    let getlocalStorage= localStorage.getItem("NewTodo");
    listarr = JSON.parse(getlocalStorage);
    listarr.splice(index,1); // deleted the tasks from the index which get as an paramter
    localStorage.setItem("NewTodo", JSON.stringify(listarr));
    showTaks();

}

clearAllButtonRef.addEventListener('click',(e)=>{
    listarr=[]; //make emoty array
    localStorage.setItem("NewTodo", JSON.stringify(listarr)); // update the same in local storage
    showTaks(); // fn to render tasks
})


