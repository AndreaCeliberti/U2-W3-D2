class NameName {
  constructor(name) {
    this.eventName = name;
  }
}

let events = [];

const insName = document.getElementById("formName");

const fieldName = document.getElementById("cardName");

const generateField = function (obj) {
  const col = document.createElement("div");

  col.innerHTML = `
     <div class="input-group" id="fieldName">
    <p>${obj.eventName}</p>
      <button class="btn btn-outline-secondary" onclick="removeCard(event, '${obj.eventName}')" id="fieldBtn" type="button">Elimina</button>
    </div>
    `;
  fieldName.appendChild(col);
};

const removeField = function (event, cardName) {
  const button = event.target;

  const col = button.closest(".col");
  col.remove();

  const indexFound = events.findIndex((appointment) => appointment.eventName === cardName);

  if (indexFound !== -1) {
    events.splice(indexFound, 1);

    if (events.length === 0) {
      localStorage.removeItem("events-memory");
    } else {
      localStorage.setItem("events-memory", JSON.stringify(events));
    }
  }
};

const resetFields = function (...rest) {
  rest.forEach((node) => (node.value = ""));
};
insName.onsubmit = function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("yourName");

  const appointment = new NameEvent(nameInput.value);

  events.push(appointment);
  localStorage.setItem("events-memory", JSON.stringify(events));

  generateField(appointment);

  resetFields(nameInput);
};
window.addEventListener("DOMContentLoaded", () => {
  const hasAppointments = localStorage.getItem("events-memory");
  if (hasAppointments) {
    const appointmentsArray = JSON.parse(hasAppointments);
    appointmentsArray.forEach((appointment) => generateField(appointment));

    events = appointmentsArray;

    console.log("has appointments", appointmentsArray);
  }
});

// intervall counter

let counter = 0;

const increment = function () {
  counter++;
};
increment();

const intervalID = setInterval(incrementAndLog, 1000);

function incrementAndLog() {
  if (counter === 10) {
    clearInterval(intervalID);

    return;
  }

  increment();
  console.log(counter);
}
