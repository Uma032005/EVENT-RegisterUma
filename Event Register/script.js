document.addEventListener("DOMContentLoaded", loadEvents);
document.getElementById("addEvent").addEventListener("click", addEvent);

function addEvent() {
    const title = document.getElementById("eventTitle").value;
    const date = document.getElementById("eventDate").value;
    const description = document.getElementById("eventDescription").value;

    if (!title || !date) {
        alert("Title and Date are required!");
        return;
    }

    const event = { title, date, description };
    saveEvent(event);
    document.getElementById("eventTitle").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById("eventDescription").value = "";
}

function saveEvent(event) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvents();
}

function displayEvents() {
    const eventList = document.getElementById("eventList");
    eventList.innerHTML = "";
    const events = JSON.parse(localStorage.getItem("events")) || [];

    events.forEach((event, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div>
                <strong>${event.title}</strong>
                <p>${event.date}</p>
                <small>${event.description}</small>
            </div>
            <button class="delete-btn" onclick="deleteEvent(${index})">❌</button>
        `;
        eventList.appendChild(li);
    });
}

function deleteEvent(index) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    displayEvents();
}

function loadEvents() {
    displayEvents();
}
