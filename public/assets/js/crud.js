//Map of all subjects
var ArrayOfSubjects = [];
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

  updateSubject(ArrayOfSubjects);

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
    var storeMap = new Map();
    storeMap.set("name", document.getElementById("subject-name").value.trim());
    storeMap.set("url", document.getElementById("url").value.trim());
    console.log(storeMap);

    ArrayOfSubjects.push(storeMap);
    // console.log("JSON::" + JSON.stringify(ArrayOfSubjects));
    localStorage.setItem("sub-array", JSON.stringify(ArrayOfSubjects)); //store the map of subjects
    if (JSON.parse(localStorage.getItem("sub-array")) != null) {
      ArrayOfSubjects = JSON.parse(localStorage.getItem("sub-array"));
    }

    updateSubject(ArrayOfSubjects);
  }
}

function updateSubject(subjects) {
  // console.log(subjects);
  subjectModelList = subjects;

  subjectList.innerHTML = "";

  for (s in subjects) {
    var li = document.createElement("li");
    li.className = "list-group-item";

    //link
    let link = document.createElement("a");
    link.setAttribute("href", String(subjects[s]["url"]));
    link.innerHTML = String(subjects[s]["url"]);

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

    li.appendChild(document.createTextNode(subjects[s]["name"]));
    li.appendChild(link);
    li.appendChild(deleteButton);
    li.appendChild(editButton);
    li.setAttribute("id", s); //using index as id

    subjectList.appendChild(li);
  }
}
