// LOGIN
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        window.location.href = "dashboard.php";
    } else {
        alert("Invalid login");
    }
}

// LOGOUT
function logout() {
    window.location.href = "index.php";
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

    records.forEach(c => {
        let row = `<tr>
            <td>${c.id}</td>
            <td>${c.name}</td>
            <td>${c.dob}</td>
        </tr>`;
        table.innerHTML += row;
    });
}