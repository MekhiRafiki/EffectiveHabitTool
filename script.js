

function loadRoleGoals() {
  if (!localStorage.RG) {
    // default to empty array
    localStorage.RG = JSON.stringify([])
  }
  /* Roles -> Goals Area */
  const rolesPane = document.getElementById("roles");
  rolesPane.addEventListener("click", event=>{
    event.preventDefault();
    if(event.target.type === "submit"){
      const goalList = event.path[2].getElementsByTagName('ul')[0];
      const newGoal = event.path[2].getElementsByTagName('textarea')[0].value;

      var node = document.createElement("LI");
      var textnode = document.createTextNode(newGoal);
      node.appendChild(textnode);
      goalList.appendChild(node);
      event.path[2].getElementsByTagName('textarea')[0].value ='';
    }
  });
}
function loadWeeklyPriority() {
  if (!localStorage.WP) {
    // default to empty array
    localStorage.WP = JSON.stringify([])
  }
  /* Weekly Priority Area */
  const prioritySubmitBtn = document.getElementById("prioritySubmit");
  const priorityList = document.getElementById("priorityList");

  prioritySubmitBtn.addEventListener("click", event =>{
    event.preventDefault();
    if(event.target.type === "submit"){
        const priorityInput = document.getElementById("newPriorityText");
        const priorityText = priorityInput.value;
        priorityInput.value = "";
        console.log(priorityText);

        var node = document.createElement("LI");
        var textnode = document.createTextNode(priorityText);
        node.appendChild(textnode);
        priorityList.appendChild(node);
    }
  });
}
function loadTaskSubmit(){
  currTasks = [];
  if (!localStorage.T) {
    // default to empty array
    localStorage.T = JSON.stringify(currTasks)
  } else {
    // Populate the UL
    currTasks = JSON.parse(localStorage.T);
    populateCurrTasks(currTasks);
  }
  
  /* Task Submission Area */
  const taskSubmitBtn = document.getElementById("taskSubmit");
  taskSubmitBtn.addEventListener("click", event =>{
    event.preventDefault();
    if(event.target.type === "submit"){
        const tasksInput = document.getElementById("newTaskText");
        /* Add to Local Storage */
        var newTask = {
          task: tasksInput.value
        }
        currTasks.push(newTask);
        localStorage.T = JSON.stringify(currTasks);

        tasksInput.value = ""; // Clear the screen

        populateCurrTasks(currTasks);
    }
  });
}

function load() {
  // localStorage.clear(); // Testing Purposes
  loadRoleGoals();
  loadWeeklyPriority();
  loadTaskSubmit();
}

function populateCurrTasks(currTasks){
  const tasksList = document.getElementById("taskList");
  taskList.innerHTML = "";
  currTasks.forEach(function(element){
    var node = document.createElement("LI");
    var textnode = document.createTextNode(element.task);
    node.appendChild(textnode);
    tasksList.appendChild(node);
  });
}


window.onload = load;
