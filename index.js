const total = document.getElementById("total");
const notes = document.querySelector(".notes");
const reset = document.querySelector(".btn-reset");
let totalAmount = 0;

function add(btn) {
    // create row for tasks
    const row = document.createElement("div");
    row.classList.add("row", "task");

    // create mini div that contains both name of task and remove button
    const duo = document.createElement("div");
    duo.classList.add("row");

    // create a p element that display only name of the task
    const taskName = document.createElement("p");
    taskName.innerText = `${btn.innerText.slice(0, -5)}`;

    // create a p element that display only cost of the task
    const cost = document.createElement("p");
    cost.innerText = `$${btn.value}`;

    // add cost of task to total cost
    totalAmount += Number(btn.value);

    // update total
    total.innerText = `$${totalAmount}`;

    // create individual task remove button
    const btnRemove = document.createElement("button");
    btnRemove.classList.add("btn-remove");
    btnRemove.id = `${taskName.innerText}`;
    btnRemove.value = `${btn.value}`;
    btnRemove.setAttribute("onclick", "removeTask(this)");
    btnRemove.innerText = "Remove";

    // add name of task, remove button and task cost to the newly created div
    duo.appendChild(taskName);
    duo.appendChild(btnRemove);
    row.appendChild(duo);
    row.appendChild(cost);

    // add the newly created element and its content into the .invoice container
    document.querySelector(".invoice").insertBefore(row, null);

    // prevent the user from selecting the same task multiple times
    btn.classList.add("disabled");

    // make notes visible after ordering first task
    notes.style.visibility = "visible";
}

function removeTask(e) {
    // find closest parent element that contains button, taskName and cost
    let taskChosen = document.getElementById(`${e.id}`).closest(".task");

    // subtract cost of task from total cost and update total
    totalAmount -= Number(e.value);
    total.innerText = `$${totalAmount}`;

    // make button clickable
    const buttons = document.querySelectorAll(".btn");
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].value == e.value) {
            buttons[i].classList.remove("disabled");
        }
    }

    taskChosen.remove();
}

reset.addEventListener("click", function () {
    // remove all rows that have task as a class
    const task = document.querySelectorAll(".task");
    for (let i = 0; i < task.length; i++) {
        task[i].remove();
    }

    // make task buttons clickable
    const buttons = document.querySelectorAll(".btn");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("disabled");
    }

    // reset total amount
    totalAmount = 0;
    total.innerText = `$${totalAmount}`;

    notes.style.visibility = "hidden";
});
