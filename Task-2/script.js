
// ===== CONTACT FORM VALIDATION =====

const contactForm = document.getElementById("contactForm");
const crewMembers = document.getElementById("crewMembers");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const character = document.getElementById("character").value;
    const message = document.getElementById("message").value.trim();

    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");

    errorMessage.textContent = "";
    successMessage.textContent = "";

    // Check empty fields

    if (name === "" || email === "" || character === "" || message === "") {
        errorMessage.textContent = "Please fill in all the fields!";
        return;
    }

    // Validate email format

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Please enter a valid email address!";
        return;
    }

    // Display success message

    successMessage.textContent =
        "Welcome aboard, " + name + "! Your crew registration is successful!";

    const emptyMessage = crewMembers.querySelector(".empty-message");
    if (emptyMessage) {
        emptyMessage.remove();
    }

    const memberCard = document.createElement("article");
    memberCard.className = "crew-member-card";

    const memberDetails = document.createElement("div");
    const memberName = document.createElement("h4");
    memberName.textContent = name;

    const memberCharacter = document.createElement("p");
    memberCharacter.textContent = "Favourite character: " + character;

    const memberDream = document.createElement("p");
    memberDream.textContent = "Dream: " + message;

    memberDetails.append(memberName, memberCharacter, memberDream);
    memberCard.appendChild(memberDetails);
    crewMembers.appendChild(memberCard);

    contactForm.reset();

});


// ===== DYNAMIC TO-DO LIST =====

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Add new task

addTaskBtn.addEventListener("click", function() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        taskInput.focus();
        return;
    }

    const taskCard = document.createElement("article");
    taskCard.className = "task-card";

    const taskDetails = document.createElement("div");
    taskDetails.className = "task-details";

    const taskName = document.createElement("h3");
    taskName.textContent = taskText;

    const taskStatus = document.createElement("p");
    taskStatus.className = "task-status";
    taskStatus.textContent = "Pending";
    taskStatus.setAttribute("aria-live", "polite");

    taskDetails.append(taskName, taskStatus);

    const taskActions = document.createElement("div");
    taskActions.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = "Mark completed";
    completeBtn.addEventListener("click", function() {
        const isCompleted = taskCard.classList.toggle("completed");
        taskStatus.textContent = isCompleted ? "Completed" : "Pending";
        completeBtn.textContent = isCompleted ? "Mark pending" : "Mark completed";
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function() {
        taskCard.remove();
    });

    taskActions.append(completeBtn, deleteBtn);
    taskCard.append(taskDetails, taskActions);
    taskList.appendChild(taskCard);

    document.getElementById("taskMessage").textContent =
        "Set sails, adventure begins!";

    taskInput.value = "";
    taskInput.focus();

});


// Add task using Enter key

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTaskBtn.click();
    }

});


// ===== ADVENTURE MEMORIES =====

const memoryForm = document.getElementById("memoryForm");
const memoryGallery = document.getElementById("memoryGallery");
const memoryMessage = document.getElementById("memoryMessage");

memoryForm.addEventListener("submit", function(event) {

    event.preventDefault();
    memoryMessage.textContent = "";

    const imageInput = document.getElementById("memoryImage");
    const imageFile = imageInput.files[0];
    const title = document.getElementById("memoryTitle").value.trim();
    const description = document.getElementById("memoryDescription").value.trim();

    if (!imageFile || !imageFile.type.startsWith("image/")) {
        memoryMessage.textContent = "Please choose a valid image.";
        return;
    }

    const imageUrl = URL.createObjectURL(imageFile);
    const memoryCard = document.createElement("article");
    memoryCard.className = "saved-memory";

    const memoryImage = document.createElement("img");
    memoryImage.src = imageUrl;
    memoryImage.alt = title;

    const memoryContent = document.createElement("div");
    memoryContent.className = "saved-memory-content";

    const memoryHeading = document.createElement("h3");
    memoryHeading.textContent = title;

    const memoryDescription = document.createElement("p");
    memoryDescription.textContent = description;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-memory-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete memory";
    deleteButton.addEventListener("click", function() {
        URL.revokeObjectURL(imageUrl);
        memoryCard.remove();
    });

    memoryContent.append(memoryHeading, memoryDescription, deleteButton);
    memoryCard.append(memoryImage, memoryContent);
    memoryGallery.prepend(memoryCard);

    memoryMessage.textContent = "Your memory has been added!";
    memoryForm.reset();

});
