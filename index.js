
let list = []; // list which store all the pending tasks to perform
let compeletedList = []; // list which store all the completed tasks
let deletedList = []; // list which store all the deleted tasks
let totalCount = 0;

const button = document.getElementById("addButton");
const ul = document.getElementById("myList");

button.addEventListener("click", () => {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();

  if (taskName !== "") {
    ++totalCount;
    // console.log(totalCount);
    const li = document.createElement("li");
    li.classList.add("list-group-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `task-${totalCount}`; // Use the totalCount variable to generate a unique id for each checkbox
    checkbox.classList.add("form-check-input");

    const label = document.createElement("label");
    label.classList.add("form-check-label");
    label.setAttribute("for", `task-${totalCount}`); // Use the totalCount variable to generate a unique id for each checkbox
    label.textContent = taskName;

    const removeButton = document.createElement("i");
    removeButton.classList.add("fa-solid", "fa-xmark", "fa-beat", "ml-4");
    removeButton.setAttribute("title", "delete");

    // Add a click event listener to the remove button
    removeButton.addEventListener("click", () => {
      ul.removeChild(li); // Remove the list item from the ul
      // Optionally, remove the task from your list array
      const index = list.indexOf(taskName);
      if (index !== -1) {
        list.splice(index, 1);
      }
      updateTaskCount();
    });

    // Add a click event listener to the checkbox
    checkbox.addEventListener("click", () => {
      const taskId = checkbox.id;
      const taskName = label.textContent;

      // Check if the checkbox is checked or unchecked
      if (checkbox.checked) {
        // Add the task to the completedTask array if it's checked
        compeletedList.push(taskName);
      } else {
        // Remove the task from the completedTask array if it's unchecked
        const index = compeletedList.indexOf(taskName);
        if (index !== -1) {
          compeletedList.splice(index, 1);
        }
      }

      // You can now work with the updated `completedTask` array as needed
      // console.log(compeletedList);
      updateTaskCount();
    });

    li.appendChild(checkbox);
    li.appendChild(label);
    li.appendChild(removeButton);

    ul.appendChild(li);

    taskInput.value = "";

    list.push(taskName);
    updateTaskCount();
  }
});

//Complete all task button functionality

function completeAllTasks() {
  const checkboxes = document.querySelectorAll(".form-check-input");

  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });

  // Update the completedTask array with all tasks
  compeletedList = list.slice();
  // console.log(list);
  // console.log(compeletedList);

  updateTaskCount();
}

// Function to clear completed tasks
function clearCompletedTasks() {
  const checkboxes = document.querySelectorAll(".form-check-input");
  const completedTaskIndices = [];

  checkboxes.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const taskId = checkbox.id;
      const taskName = document.querySelector(
        `label[for='${taskId}']`
      ).textContent;

      // Remove the task from the completedTask array
      const index1 = compeletedList.indexOf(taskName);
      const index2 = list.indexOf(taskName);
      if (index1 !== -1) {
        compeletedList.splice(index1, 1);
      }
      if (index2 !== -1) {
        list.splice(index2, 1);
      }

      // Mark the index for removal
      completedTaskIndices.push(index);

      // Uncheck the checkbox
      checkbox.checked = false;
    }
  });

  // Remove completed tasks from the DOM by index
  completedTaskIndices.reverse().forEach((index) => {
    const listItem = ul.children[index];
    if (listItem) {
      ul.removeChild(listItem);
    }
  });

  updateTaskCount();
}

//taskLeft count

function updateTaskCount() {
  const taskLeft = document.getElementById("taskLeftCount");
  const span = document.createElement("span");
  taskLeft.innerHTML = "";
  span.textContent = `Task left: ${list.length - compeletedList.length}`;
  taskLeft.appendChild(span);
  // console.log(span.textContent);
}

/*function to show all the tasks*/
allTaskButton.addEventListener("click", () => {
  const allTaskList = document.getElementById("modalAllTaskBody");
  allTaskList.innerHTML = "";
  const ul = document.createElement("ul");
  list.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  allTaskList.appendChild(ul);
});

/*function to show all the completed tasks*/
completedTaskButton.addEventListener("click", () => {
  const completedList = document.getElementById("modalCompletedTaskBody");
  completedList.innerHTML = "";
  const ul = document.createElement("ul");
  // console.log(compeletedList);
  compeletedList.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  // console.log(ul);
  completedList.appendChild(ul);
});

/*function to show all the pending tasks*/
unCompletedTaskButton.addEventListener("click", () => {
  const unCompletedList = document.getElementById("modalUnCompletedTaskBody");
  unCompletedList.innerHTML = "";
  const ul = document.createElement("ul");

  list.forEach((item) => {
    var found = false;
    for (let i = 0; i < compeletedList.length; i++) {
      if (item === compeletedList[i]) {
        found = true;
        break;
      }
    }

    if (!found) {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    }
  });
  unCompletedList.appendChild(ul);
});
