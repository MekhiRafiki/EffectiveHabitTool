



function load() {

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


window.onload = load;
