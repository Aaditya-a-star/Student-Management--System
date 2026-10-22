const form = document.querySelector("#student-form");
const nameInput = document.querySelector("#student-name");
const rollInput = document.querySelector("#roll-number");
const studentList = document.querySelector("#student-list");
const studentCount = document.querySelector("#student-count");
const emptyState = document.querySelector("#empty-state");
const message = document.querySelector("#message");

let students = [];

function renderStudents() {
  studentList.replaceChildren();

  students.forEach((student) => {
    const item = document.createElement("li");
    item.className = "student-item";

    const details = document.createElement("div");

    const name = document.createElement("span");
    name.className = "student-name";
    name.textContent = student.name;

    const roll = document.createElement("span");
    roll.className = "student-roll";
    roll.textContent = `Roll number: ${student.roll}`;

    details.append(name, roll);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${student.name}`);

    deleteButton.addEventListener("click", () => {
      students = students.filter((item) => item.id !== student.id);
      renderStudents();
      message.textContent = `${student.name} was removed.`;
    });

    item.append(details, deleteButton);
    studentList.append(item);
  });

  emptyState.hidden = students.length > 0;
  studentCount.textContent = `${students.length} ${students.length === 1 ? "student" : "students"}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const roll = rollInput.value.trim();

  if (!name || !roll) {
    message.textContent = "Please enter both a name and roll number.";
    return;
  }

  const rollAlreadyExists = students.some(
    (student) => student.roll.toLowerCase() === roll.toLowerCase()
  );

  if (rollAlreadyExists) {
    message.textContent = "That roll number is already in the list.";
    return;
  }

  students.push({
    id: crypto.randomUUID(),
    name,
    roll
  });

  renderStudents();
  form.reset();
  nameInput.focus();
  message.textContent = `${name} was added successfully.`;
});

renderStudents();
