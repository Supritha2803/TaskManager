const apiBaseUrl = "http://127.0.0.1:5000/tasks";

const taskContainer = document.getElementById("taskContainer");
const taskNameInput = document.getElementById("taskName");
const taskDescriptionInput = document.getElementById("taskDescription");
const addTaskButton = document.getElementById("addTaskButton");

// Fetch tasks from the API and display them
async function fetchTasks() {
    const response = await fetch(apiBaseUrl);
    const tasks = await response.json();

    taskContainer.innerHTML = ""; // Clear existing tasks
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${task.name} - ${task.description}</span>
            <div>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskContainer.appendChild(taskItem);
    });
}

// Add a new task via the API
addTaskButton.addEventListener("click", async () => {
    const name = taskNameInput.value;
    const description = taskDescriptionInput.value;

    if (name.trim() === "") {
        alert("Task name cannot be empty!");
        return;
    }

    const response = await fetch(apiBaseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description })
    });

    if (response.ok) {
        taskNameInput.value = "";
        taskDescriptionInput.value = "";
        fetchTasks();
    } else {
        alert("Failed to add task.");
    }
});

// Delete a task via the API
async function deleteTask(taskId) {
    const response = await fetch(`${apiBaseUrl}/${taskId}`, { method: "DELETE" });

    if (response.ok) {
        fetchTasks();
    } else {
        alert("Failed to delete task.");
    }
}

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", fetchTasks);
