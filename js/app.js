// LOGIN
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid login");
    }
}

// LOGOUT
function logout() {
    window.location.href = "index.html";
}

// GENERATE ID
function generateID() {
    let year = new Date().getFullYear();
    let random = Math.floor(100 + Math.random() * 900);
    return `NCRS-${year}-${random}`;
}

// SAVE CITIZEN
function saveCitizen() {
    let name = document.getElementById("name").value;
    let dob = document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let place = document.getElementById("place").value;
    let parent = document.getElementById("parent").value;

    if (!name || !dob || !place || !parent) {
    alert("Please fill all fields");
    return;
}

    let citizen = {
        id: generateID(),
        name,
        dob,
        gender,
        place,
        parent
    };

    let records = JSON.parse(localStorage.getItem("citizens")) || [];
    records.push(citizen);
    localStorage.setItem("citizens", JSON.stringify(records));

    alert("Citizen Registered!");
 
    document.getElementById("name").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("place").value = "";
    document.getElementById("parent").value = "";
}


// LOAD RECORDS
if (document.getElementById("recordsTable")) {
    let records = JSON.parse(localStorage.getItem("citizens")) || [];
    let table = document.getElementById("recordsTable");

    records.forEach((c, index) => {
    let row = `<tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.dob}</td>
        <td>
            <button onclick="editCitizen(${index})">✏️ Edit</button>
            <button onclick="deleteCitizen(${index})">🗑️ Delete</button>
        </td>
    </tr>`;
    table.innerHTML += row;
});
}

function deleteCitizen(index) {
    let records = JSON.parse(localStorage.getItem("citizens")) || [];

    if (confirm("Are you sure you want to delete this record?")) {
        records.splice(index, 1);
        localStorage.setItem("citizens", JSON.stringify(records));
        location.reload();
    }
}

function editCitizen(index) {
    let records = JSON.parse(localStorage.getItem("citizens")) || [];

    let citizen = records[index];

    let newName = prompt("Edit Name:", citizen.name);
    let newDob = prompt("Edit Date of Birth:", citizen.dob);

    if (newName && newDob) {
        citizen.name = newName;
        citizen.dob = newDob;

        records[index] = citizen;
        localStorage.setItem("citizens", JSON.stringify(records));

        location.reload();
    }
}
