//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
  dragText = dropArea.querySelector("header"),
  button = dropArea.querySelector("button"),
  input = dropArea.querySelector("input");

let file; //this is a global var and we'll use it inside multiple functions

button.onclick = () => {
  input.click(); //if user click on the btn then the input also clicked
  dropArea.classList.add("active");
};

input.addEventListener("change", function () {
  file = this.files[0]; // select file [0] first of many files
  showFile(); //calling function
});

//if user drag file over DropArea
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault(); //preventing from default behaviour
  // console.log("File is over DropArea");
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//if user leave  dragged file from DropArea
dropArea.addEventListener("dragleave", () => {
  // console.log("File is outside from DropArea");
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//if user drops file on DropArea
dropArea.addEventListener("drop", (e) => {
  e.preventDefault(); //preventing from default behaviour
  // console.log("File is dropped on DropArea");
  file = e.dataTransfer.files[0]; // select file [0] first of many files
  showFile(); //calling function
});
function showFile() {
  let fileType = file.type;
  console.log(fileType);

  let validExtentions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image exten in array
  if (validExtentions.includes(fileType)) {
    // console.log("this is an image file");
    let fileReader = new FileReader(); //creating new fileReader object
    fileReader.onload = () => {
      let fileURL = fileReader.result; //passing user file source in fileURL var
      // console.log(fileURL);
      let imgTag = `<img src="${fileURL}" alt="">`; //creating image tag and passing user selected file source inside src attribute
      dropArea.innerHTML = imgTag; //adding that created img tag in droparea
    };
    fileReader.readAsDataURL(file);
  } else {
    // console.log("this is not image file");
    alert("this is not image file");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
