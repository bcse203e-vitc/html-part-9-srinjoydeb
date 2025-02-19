document.getElementById("booking-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    // Clear previous error messages
    clearErrors();
  
    // Validate inputs
    let isValid = true;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const datetime = document.getElementById("datetime").value;
    const terms = document.getElementById("terms").checked;
  
    if (!name) {
      showError("name-error", "Name is required.");
      isValid = false;
    }
  
    if (!validateEmail(email)) {
      showError("email-error", "Please enter a valid email.");
      isValid = false;
    }
  
    if (!validatePhone(phone)) {
      showError("phone-error", "Phone number must be 10 digits.");
      isValid = false;
    }
  
    if (!datetime || new Date(datetime) < new Date()) {
      showError("datetime-error", "Please select a future date and time.");
      isValid = false;
    }
  
    if (!terms) {
      showError("terms-error", "You must agree to the terms.");
      isValid = false;
    }
  
    if (!isValid) return;
  
    // Save appointment
    const service = document.getElementById("service").value;
    const requests = document.getElementById("requests").value;
  
    const appointment = {
      name,
      email,
      phone,
      service,
      datetime,
      requests,
      status: "Pending",
    };
  
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));
  
    displayAppointments();
    closeBookingForm();
    showConfirmation(name, service, datetime);
  });
  
  function displayAppointments() {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const table = document.getElementById("appointments-list");
  
    // Clear the table and add headers
    table.innerHTML = `<tr><th>Name</th><th>Service</th><th>Date & Time</th><th>Status</th></tr>`;
  
    appointments.forEach((app) => {
      const formattedDate = new Date(app.datetime).toLocaleString();
      const row = `<tr><td>${app.name}</td><td>${app.service}</td><td>${formattedDate}</td><td>${app.status}</td></tr>`;
      table.innerHTML += row;
    });
  }
  
  function openBookingForm(service) {
    document.getElementById("service").value = service;
    document.getElementById("booking-modal").style.display = "block";
  }
  
  function closeBookingForm() {
    document.getElementById("booking-modal").style.display = "none";
  }
  
  function showConfirmation(name, service, datetime) {
    const formattedDatetime = new Date(datetime).toLocaleString();
    document.getElementById("confirmation-message").innerText = `Thank you, ${name}! Your appointment for ${service} on ${formattedDatetime} is confirmed.`;
    document.getElementById("confirmation-popup").style.display = "block";
  }
  
  function closeConfirmationPopup() {
    document.getElementById("confirmation-popup").style.display = "none";
  }
  
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  function validatePhone(phone) {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  }
  
  function showError(id, message) {
    document.getElementById(id).innerText = message;
    document.getElementById(id).style.display = "block";
  }
  
  function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach((error) => {
      error.innerText = "";
      error.style.display = "none";
    });
  }
  
  window.onload = displayAppointments;
