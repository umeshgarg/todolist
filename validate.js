function addActivity(e) {
    e.preventDefault()
    console.log('run')
    
    var activity = document.forms["toDoList"]["activity"].value;
    var activityId = getUuid();
    
    document.forms["toDoList"]["activity"].value = "";

    addRow({"activity":activity,"id":activityId});
}

function searchActivity(e) {
    e.preventDefault()
    
    var activity = document.forms["searchResults"]["search"].value;
    document.forms["searchResults"]["search"].value = "";

    search(activity);
}

var rows = localStorage.getItem("rows") || [];

function getUuid() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  

window.onload = function() {

    if (rows.length > 0) {
        rows = JSON.parse(localStorage.getItem("rows"));
        var table = document.getElementById("table");

        for (let index = 0; index < rows.length; index++) {
            const indexItem = rows[index]
            table.insertRow(index + 1).outerHTML = "<tr id='row" + index + "'><td id='activity" + index + "'>" + indexItem['activity'] + "</td><td><input type='button' id='edit_button" + index + "' value='Edit' class='edit' onclick='editRow(" + index + ")'> <input type='button' id='save_button" + index + "' value='Save' class='save' onclick='saveRow(\"" + index + "\",\"" + indexItem['id'] + "\")'> <input type='button' id='delete_button" + index + "' value='Delete' class='delete' onclick='deleteRow(\"" + index + "\",\"" + indexItem['id'] + "\")'></td></tr>";

            document.getElementById("edit_button" + index).style.display = "block";
            document.getElementById("save_button" + index).style.display = "none";
        }
    }
};

function addRow(data) {
    var table = document.getElementById("table");
    table.insertRow(rows.length + 1).outerHTML = "<tr id='row" + rows.length + "'><td id='activity" + rows.length + "'>" + data['activity'] + "</td><td><input type='button' id='edit_button" + rows.length + "' value='Edit' class='edit' onclick='editRow(" + rows.length + ")'> <input type='button' id='save_button" + rows.length + "' value='Save' class='save' onclick='saveRow(\"" + rows.length + "\",\"" + data['id'] + "\")'> <input type='button' id='delete_button" + rows.length + "' value='Delete' class='delete' onclick='deleteRow(\"" + rows.length + "\",\"" + data['id'] + "\")'></td></tr>";
    document.getElementById("edit_button" + rows.length).style.display = "block";
    document.getElementById("save_button" + rows.length).style.display = "none";
    rows.push(data);
    localStorage.setItem('rows', JSON.stringify(rows))
}

function editRow(index) {

    document.getElementById("edit_button" + index).style.display = "none";
    document.getElementById("save_button" + index).style.display = "block";

    var activity = document.getElementById("activity" + index);

    var activity_data = activity.innerHTML;

    activity.innerHTML = "<input type='text' id='activity_text" + index + "' value='" + activity_data + "'>";

}

function deleteRow(index, id) {

    document.getElementById("row" + index + "").outerHTML = "";

    rows = rows.filter(item => (item["id"] != id))

    localStorage.setItem('rows', JSON.stringify(rows))
}

function saveRow(index, id) {
    var activity_val = document.getElementById("activity_text" + index).value;
    document.getElementById("activity" + index).innerHTML = activity_val;

    document.getElementById("edit_button" + index).style.display = "block";
    document.getElementById("save_button" + index).style.display = "none";

    objIndex = rows.findIndex((item => (item["id"] == id)));
    rows[objIndex]["activity"] = activity_val;

    localStorage.setItem('rows', JSON.stringify(rows))
}

function search(input) {
    items = rows.filter((row)=>row["activity"].toLowerCase().includes(input.toLowerCase()));
    // items = rows.filter((row)=>row["activity"].toLowerCase().startWith(input.toLowerCase()));
    var finalText = "";
    if (items.length == 0){
        finalText = 'No results found';
    }
    else{
        finalText += 'Results:';
        items.map((item)=> finalText+=("<br>"+item["activity"]));
    }
    document.getElementById("searchResults").innerHTML = finalText;
}


