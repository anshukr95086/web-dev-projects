let box = document.querySelectorAll(".box");
let start = document.querySelector(".start");
let images = ["assets/x.png", "assets/o.png"];
let turnX = true;
let patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const imageSrc = () => {
  if (turnX) {
    turnX = false;
    return images[0];
  } else {
    turnX = true;
    return images[1];
  }
};

const reset = () => {
  box.forEach((item) => {
    item.classList.remove("used");
    item.getElementsByTagName("img")[0].src = "";
    start.innerHTML = "Start";
    turnX = true;
  });
};

const checkWinner = () => {
  for (let pattern of patterns) {
    let pos1 = box[pattern[0]].getElementsByTagName("img")[0].src;
    let pos2 = box[pattern[1]].getElementsByTagName("img")[0].src;
    let pos3 = box[pattern[2]].getElementsByTagName("img")[0].src;

    // Extract just the filename (x.png or o.png) from the full path
    pos1 = pos1.split("/").pop();
    pos2 = pos2.split("/").pop();
    pos3 = pos3.split("/").pop();

    if (pos1 && pos2 && pos3) {
      // Check if positions are not empty
      if (pos1 === pos2 && pos2 === pos3) {
        setTimeout(() => {
          if (pos1 === "x.png") {
            alert("X wins");
          } else if (pos1 === "o.png") {
            alert("O wins");
          }
        }, 250);
      }
    }
  }
};

box.forEach((item) => {
  item.addEventListener("click", () => {
    if (!item.classList.contains("used")) {
      item.classList.add("used");
      console.log("Box with class: " + item.classList[1]);
      item.getElementsByTagName("img")[0].src = imageSrc();
      start.innerHTML = "Reset";
      checkWinner();
    }
  });
});

//Reset button
start.addEventListener("click", () => {
  console.log("reset");
  reset();
});
