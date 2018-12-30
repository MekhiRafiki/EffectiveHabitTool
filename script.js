function loadRoleGoals() {
  currRGs = [];
  if (!localStorage.RG) {
    // default to empty array
    localStorage.RG = JSON.stringify(currRGs)
  } else {
    // Populate Roles and Goals
    currRGs = JSON.parse(localStorage.RG);
    populateRGs(currRGs);
  }
  /* Roles -> Goals Area */
  const rolesPane = document.getElementById("roles");
  rolesPane.addEventListener("click", event=>{
    event.preventDefault();

    if(event.target.id === "goalSubmit"){
      currRGs = JSON.parse(localStorage.RG);
      const newGoal = event.path[2].getElementsByTagName('textarea')[0].value;
      // find and Add to localStorage
      roleName = event.path[2].getElementsByTagName('h3')[0].innerHTML;
      role = currRGs.find(function(element){
        return roleName == element.role;
      });
      role.goals.push(newGoal);
      localStorage.RG = JSON.stringify(currRGs);

      // ADD TO SCREEN
      const goalList = event.path[2].getElementsByTagName('ul')[0];


      var node = document.createElement("LI");
      var textnode = document.createTextNode(newGoal);
      node.appendChild(textnode);
      goalList.appendChild(node);
      event.path[2].getElementsByTagName('textarea')[0].value ='';
    }
  });
}


function loadWeeklyPriority() {
  currWPs = [];
  if (!localStorage.WP) {
    // default to empty array
    localStorage.WP = JSON.stringify([])
  } else {
    currWPs = JSON.parse(localStorage.WP);
    populateWPs(currWPs);
  }
  /* Weekly Priority Area */
  const prioritySubmitBtn = document.getElementById("prioritySubmit");

  prioritySubmitBtn.addEventListener("click", event =>{
    event.preventDefault();
    if(event.target.type === "submit"){
        const priorityInput = document.getElementById("newPriorityText");

        /* Add to Local Storage */
        var newWP = {
          wp: priorityInput.value
        }
        currWPs.push(newWP);
        localStorage.WP = JSON.stringify(currWPs);

        priorityInput.value = "";
        populateWPs(currWPs);
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
        const taskPriority = document.getElementById("newTaskPriority");
        /* Add to Local Storage */
        var newTask = {
          task: tasksInput.value,
          priority: taskPriority.value
        }
        currTasks.push(newTask);
        // Sort by priority
        currTasks.sort(function(a,b){
          return a.priority - b.priority;
        });
        localStorage.T = JSON.stringify(currTasks);

        tasksInput.value = ""; // Clear the screen
        taskPriority.value ="";

        populateCurrTasks(currTasks);
    }
  });

  /* Specific Task Action Area */
  const taskList = document.getElementById("TaskListDiv");
  taskList.addEventListener("click", event =>{
    event.preventDefault();
    const taskName = event.path[1].getElementsByTagName('h4')[0].innerHTML;
    currTasks = JSON.parse(localStorage.T);
    for (var i = 0; i < currTasks.length; i++){
      if (currTasks[i].task === taskName){
        currTasks.splice(i, 1);
        break;
      }
    }
    localStorage.T = JSON.stringify(currTasks);
    populateCurrTasks(currTasks);
  });
}

function populateCurrTasks(currTasks){
  const tasksList = document.getElementById("taskList");
  taskList.innerHTML = "";
  currTasks.forEach(function(element){
    var node = createTaskElement(element.task)
    // document.createElement("LI");
    // var textnode = document.createTextNode(element.task);
    // node.appendChild(textnode);
    tasksList.appendChild(node);
  });
}

function populateWPs(currWPs){
  const priorityList = document.getElementById("priorityList");
  priorityList.innerHTML = "";
  currWPs.forEach(function(element){
    var node = document.createElement("LI");
    var textnode = document.createTextNode(element.wp);
    node.appendChild(textnode);
    priorityList.appendChild(node);
  });
}

function populateRGs(currRGs){
  const RGList = document.getElementById("Roles2GoalsList");
  RGList.innerHTML = "";

  currRGs.forEach(function(element){
    RGList.appendChild(createRGElement(element))
  });

}
function createRGElement(element){
  return tag("div", {class: "RoleGoal"}, [
    tag("h3", {}, element.role),
    tag("ul", {id: "goalsForRole"}, createGoals(element.goals)),
    tag("div", {class: "roleGoalAdd"}, [
      tag("textarea", {id:"newGoal", type: "text", style: "width:80%"}, []),
      tag("input", {id:"goalSubmit", type: "submit", class:"btn"}, [])
    ])
  ])
}
function createTaskElement(task){
  return tag("div", {class: "specificTask"}, [
    tag("h4", {}, task),
    tag("input", {type: "submit", class: "btn"}, [])
  ])
}

function createGoals(goals){
  toReturn = [];
  goals.forEach(function(goal){
    var node = document.createElement("LI");
    var textnode = document.createTextNode(goal);
    node.appendChild(textnode);
    toReturn.push(node);
  });
  return toReturn;
}

function load() {
  // localStorage.clear(); // Testing Purposes
  loadRoleGoals();
  loadWeeklyPriority();
  loadTaskSubmit();
}

window.onload = load;

/*


  Code from W3

*/
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function newRole(){
  const newRoleName = document.getElementById("NewRoleField").value;
  document.getElementById("NewRoleField").value = "";
  let roles = JSON.parse(localStorage.RG);

  var newRole = {
    role: newRoleName,
    goals: []
  };
  roles.push(newRole);

  localStorage.RG = JSON.stringify(roles);

  populateRGs(roles);
}

/* Credit to CS42 Piazza Assignment*/
/* Creates and returns an HTMLElement representing a tag of the given name.
 * attrs is an object, where the key-value pairs represent HTML attributes to
 * set on the tag. contents is an array of strings/HTMLElements (or just
 * a single string/HTMLElement) that will be contained within the tag.
 *
 * Examples:
 * tag('p', {}, 'A simple paragraph') => <p>A simple paragraph</p>
 * tag('a', {href: '/about'}, 'About') => <a href="/about">About</a>
 *
 * tag('ul', {}, tag('li', {}, 'First item')) => <ul><li>First item</li></ul>
 *
 * tag('div', {}, [
 *   tag('h1', {'class': 'headline'}, 'JavaScript'),
 *   ' is awesome, ',
 *   tag('span', {}, 'especially in CS42.')
 * ])
 * => <div>
 *      <h1 class="headline">JavaScript</h1>
 *      is awesome,
 *      <span>especially in CS42.</span>
 *    </div>
 */
function tag(name, attrs, contents) {
  const element = document.createElement(name)
  for (const name in attrs) {
    element.setAttribute(name, attrs[name])
  }

  // If contents is a single string or HTMLElement, make it an array of one
  // element; this guarantees that contents is an array below.
  if (!(contents instanceof Array)) {
    contents = [contents]
  }

  contents.forEach(piece => {
    if (piece instanceof HTMLElement) {
      element.appendChild(piece)
    } else {
      // must create a text node for a raw string
      element.appendChild(document.createTextNode(piece))
    }
  })

  return element
}
