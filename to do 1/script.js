document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.getElementById("add-task");
  const taskInput = document.getElementById("task-input");
  const pendingList = document.getElementById("pending-list");
  const completedList = document.getElementById("completed-list");
  const removedList = document.getElementById("removed-list");
  const removedTasksList = document.getElementById("removed-tasks");
  const completedTasks = document.getElementById("completed-tasks");
  const pendingTasks = document.getElementById("pending-tasks");
  const removedTasksCount = document.getElementById("removed-tasks-count");
  const totalTasks = document.getElementById("total-tasks");

  let taskCount = 0;
  let removedCount = 0;

  addTaskButton.addEventListener("click", function () {
      if (taskInput.value.trim() !== "") {
          taskCount++;
          const li = document.createElement("li");
          li.innerHTML = `
              <span class="task">${taskCount}. ${taskInput.value}</span>
              <span class="buttons button-container">
                  <button class="remove-button">Remove</button>
                  <!-- Change the "Complete" button text color to black -->
                  <button class="complete-button">Complete</button>
              </span>
          `;
          pendingList.appendChild(li);
          taskInput.value = "";

          updateTaskCounts();
      }
  });

  function updateTaskCounts() {
      const pendingTasksElements = pendingList.querySelectorAll("li");
      const completedTasksElements = completedList.querySelectorAll("li");
      const removedTasksElements = removedTasksList.querySelectorAll("li");

      completedTasks.textContent = completedTasksElements.length;
      pendingTasks.textContent = pendingTasksElements.length;
      removedTasksCount.textContent = removedTasksElements.length;
      totalTasks.textContent = taskCount;
  }

  document.addEventListener("click", function (event) {
      if (event.target.classList.contains("remove-button")) {
          const taskItem = event.target.closest("li");
          taskItem.remove();
          removedCount++;
          removedTasksCount.textContent = removedCount;
          removedTasksList.appendChild(taskItem);
          updateTaskCounts();
      }
      if (event.target.classList.contains("complete-button")) {
          const taskItem = event.target.closest("li");
          taskItem.querySelector(".task").classList.toggle("completed");
          if (taskItem.querySelector(".task").classList.contains("completed")) {
              completedList.appendChild(taskItem);
              taskItem.querySelector(".button-container").innerHTML = '';
          } else {
              pendingList.appendChild(taskItem);
          }
          updateTaskCounts();
      }
  });
});
