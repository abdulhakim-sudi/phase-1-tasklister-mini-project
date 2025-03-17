document.addEventListener("DOMContentLoaded", () => {
  // Get the form and input elements
  const form = document.getElementById("create-task-form");
  const taskInput = document.getElementById("new-task-description");
  const taskPriority = document.getElementById("task-priority");  // For priority dropdown

  // Function to create a task element
  function createTaskElement(taskDescription, priority) {
    const taskItem = document.createElement("li");
    taskItem.textContent = taskDescription;

    // Set task color based on priority
    if (priority === "high") {
      taskItem.style.color = "red";
    } else if (priority === "medium") {
      taskItem.style.color = "blue";
    } else {
      taskItem.style.color = "green";
    }

    // Create a delete button for the task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";  // To add space between task and button

    // Add event listener to delete button
    deleteButton.addEventListener("click", function() {
      taskItem.remove(); // Remove the task from the DOM
      removeTaskFromLocalStorage(taskDescription, priority); // Remove the task from localStorage
    });

    // Append the delete button to the task item
    taskItem.appendChild(deleteButton);

    return taskItem;
  }

  // Function to save task to localStorage
  function saveTaskToLocalStorage(taskDescription, priority) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ description: taskDescription, priority: priority });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Function to remove task from localStorage
  function removeTaskFromLocalStorage(taskDescription, priority) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.description !== taskDescription || task.priority !== priority);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load tasks from localStorage and display them
  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
      const taskElement = createTaskElement(task.description, task.priority);
      document.getElementById("tasks").appendChild(taskElement);
    });
  }

  // Load existing tasks when the page is loaded
  loadTasksFromLocalStorage();

  // Listen for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();  // Prevent the form from submitting and refreshing the page
    
    const taskDescription = taskInput.value.trim();
    const priority = taskPriority.value;

    if (taskDescription) {
      const taskElement = createTaskElement(taskDescription, priority);
      document.getElementById("tasks").appendChild(taskElement);

      // Save the task to localStorage
      saveTaskToLocalStorage(taskDescription, priority);
      
      // Clear the input field
      taskInput.value = "";
    }
  });
});
