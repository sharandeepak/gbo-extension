//Map of all subjects
var ArrayOfSubjects;
//List of all the subject Names :)
var subjectName = [];
//List of all the respective links
var subjectLink = [];

var subjectList;

//makes updation and stuff easier
var subjectModelList;

var timingModelList;

window.onload = () => {
  if (JSON.parse(localStorage.getItem("sub-array")) != null)
    ArrayOfSubjects = JSON.parse(localStorage.getItem("sub-array"));
  //the list of subjects
  subjectList = document.getElementById("subject");

  //the list of timing
  timingList = document.getElementById("timing");

  updateSubject();

  // //loading subjects at the start
  // eel.getSubject();

  // eel.getTiming(1);
};

//Function for storing the datas into the database
function addSubject(e) {
  e.preventDefault();

  if (
    document.getElementById("subject-name").value.trim() != "" &&
    document.getElementById("url").value.trim() != ""
  ) {
    // subjectName.push(document.getElementById("subject-name").value.trim());
    // subjectLink.push(document.getElementById("url").value.trim());
    storeMap.set("name", document.getElementById("subject-name").value.trim());
    storeMap.set("url", document.getElementById("url").value.trim());
    ArrayOfSubjects.push(storeMap);
    localStorage.setItem("sub-array", JSON.stringify(ArrayOfSubjects)); //store the map of subjects

    updateSubject();
  }
}

//Updates the List on adding/deleting the data
function updateSubject() {
  subjectList.innerHTML = "";

  for (var i = 0; i < subjectName.length; i++) {
    var li = document.createElement("li");
    li.className = "list-group-item";

    //link
    let link = document.createElement("a");
    link.setAttribute("href", subjectLink[i]);
    link.innerHTML = String(subjectLink[i]);

    //edit button
    let editButton = document.createElement("button");
    editButton.className = "btn-success btn btn-sm float-right edit edit-btn";
    editButton.innerHTML = "Edit";
    editButton.setAttribute("onclick", "editSubject(event)");

    //delete button
    let deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger btn btn-sm float-right delete del-btn";
    deleteButton.innerHTML = "Delete";
    deleteButton.setAttribute("onclick", "removeSubject(event)");

    li.appendChild(document.createTextNode(subjectName[i]));
    li.appendChild(link);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    li.setAttribute("id", i); //using index as id

    subjectList.appendChild(li);
  }
}

function editSubject(e) {
  e.preventDefault();

  var li = e.target.parentNode;
  var index = li.id;

  li.innerHTML = "";

  var row = document.createElement("div");
  row.className = "row";

  var nameFieldContainer = document.createElement("div");
  nameFieldContainer.className = "col-lg-5 col-md-5 col-sm-5";

  var nameField = document.createElement("input");
  nameField.setAttribute("id", "name");
  nameField.value = subjectModelList[index]["name"];
  nameFieldContainer.appendChild(nameField);

  var urlFieldContainer = document.createElement("div");
  urlFieldContainer.className = "col-lg-5 col-md-5 col-sm-5";

  var urlField = document.createElement("input");
  urlField.setAttribute("id", "url");
  urlField.value = subjectModelList[index]["url"];
  urlFieldContainer.appendChild(urlField);

  var saveButton = document.createElement("button");
  saveButton.className = "btn-success btn btn-sm float-right edit edit-btn";
  saveButton.innerHTML = "Save";
  saveButton.setAttribute(
    "class",
    "generated_save_btn btn-success btn btn-sm float-right edit edit-btn"
  );
  saveButton.onclick = function (e) {
    e.preventDefault();
    var name = nameField.value;
    var url = urlField.value;
    if (
      name.trim() == "" ||
      name.trim() == null ||
      url.trim() == "" ||
      url.trim() == null
    ) {
    } else {
      eel.updateSubject(
        {
          name: name,
          url: url,
        },
        subjectModelList[index]
      );
    }
  };

  var cancelButton = document.createElement("button");
  cancelButton.className = "btn-danger btn btn-sm float-right delete del-btn";
  cancelButton.innerHTML = "Cancel";
  cancelButton.setAttribute(
    "class",
    "generated_cancel_btn btn-danger btn btn-sm float-right delete del-btn"
  );
  cancelButton.onclick = function (e) {
    e.preventDefault();
    updateSubject(subjectModelList);
  };

  row.appendChild(nameFieldContainer);
  row.appendChild(document.createTextNode(" "));
  row.appendChild(urlFieldContainer);
  row.appendChild(saveButton);
  row.appendChild(cancelButton);

  li.appendChild(row);
}

function toggleButton(btnID) {
  document.getElementById(btnID).disabled = false;
}
