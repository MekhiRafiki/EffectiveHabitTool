

function loadRoleGoals() {
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
  /* Task Submission Area */
  const taskSubmitBtn = document.getElementById("taskSubmit");
  const tasksList = document.getElementById("taskList");

  taskSubmitBtn.addEventListener("click", event =>{
    event.preventDefault();
    if(event.target.type === "submit"){
        const tasksInput = document.getElementById("newTaskText");
        const taskText = tasksInput.value;
        tasksInput.value = "";
        console.log(taskText);

        var node = document.createElement("LI");
        var textnode = document.createTextNode(taskText);
        node.appendChild(textnode);
        tasksList.appendChild(node);
    }
  });
}

function load() {
  loadRoleGoals();
  loadWeeklyPriority();
  loadTaskSubmit();





}


window.onload = load;
