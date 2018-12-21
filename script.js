



function load() {
  const taskSubmitBtn = document.getElementById("taskSubmit");
  const tasksList = document.getElementById("taskList");

  taskSubmitBtn.addEventListener("click", event =>{
    event.preventDefault();
    if(event.target.type === "submit"){
      	const tasksInput = document.getElementById("newTaskText");
        const taskText = tasksInput.value;
        tasksInput.innerHTML = "";
        console.log(taskText);

        var node = document.createElement("LI");                 // Create a <li> node
        var textnode = document.createTextNode(taskText);         // Create a text node
        node.appendChild(textnode);                              // Append the text to <li>
        tasksList.appendChild(node);
    }
  });

}


window.onload = load;
