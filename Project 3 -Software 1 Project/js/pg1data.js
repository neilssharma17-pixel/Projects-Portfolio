document.addEventListener("DOMContentLoaded", function () {


  // ==================== Variables ====================
  const tierPanel = document.getElementById("tierPanel");
  const colorPicker = document.getElementById("colorPicker");
  const addRowButton = document.getElementById("addRowButton");
  const removeRowButton = document.getElementById("removeRowButton");
  const continueButton = document.getElementById("continueButton");
  let rowCount = 0; // Track the number of rows
  const maxRows = 9; // Limit the number of rows







  // ==================== Initial Row Setup ====================
  addRow(); // Automatically add the first row when the page loads







  // ==================== Event Listeners ====================

  // Add Row Button
  addRowButton.addEventListener("click", function () {
    if (rowCount < maxRows) {
      addRow();
    }
  });

  // Remove Row Button
  removeRowButton.addEventListener("click", function () {
    if (rowCount > 1) {
      removeRow();
    }
  });

  // Continue Button
  continueButton.addEventListener("click", function () {
    const tierListName = document.getElementById("tierNameField").value;
    if (!tierListName.trim()) {
      alert("Please enter a valid name for your tier list.");
      return;
    }
    handleContinueButtonClick(tierListName);
  });











  // ==================== Functions ====================

  // Function to Add Row
  function addRow() {
    rowCount++;
    const row = createRow(rowCount);
    tierPanel.appendChild(row);
    updateButtonStates();
    updateBodyHeight(); // Update body height class
  }


  // Function to Remove Row
  function removeRow() {
    if (tierPanel.children.length > 1) {
      tierPanel.removeChild(tierPanel.lastChild);
      rowCount--;
      updateButtonStates();
      updateBodyHeight(); // Update body height class
    }
  }


  // Update button states based on row count
  function updateButtonStates() {
    addRowButton.disabled = rowCount >= maxRows;
    removeRowButton.disabled = rowCount <= 1;
  }


  // Function to Update Body Height Class
  function updateBodyHeight() {
    if (rowCount < 4) {
      document.body.classList.add('full-height');
      document.body.classList.remove('auto-height');
    } else {
      document.body.classList.add('auto-height');
      document.body.classList.remove('full-height');
    }
  }


  // Function to Create Row
  function createRow(index) {
    const row = document.createElement("div");
    row.classList.add("tier-row");

    const shapePanel = document.createElement("div");
    shapePanel.classList.add("shape-panel");

    const square = document.createElement("div");
    square.classList.add("square");
    const rectangle = document.createElement("div");
    rectangle.classList.add("rectangle");

    const textBox = document.createElement("input");
    textBox.classList.add("text-box");
    textBox.value = String.fromCharCode(65 + index - 1); // Generate letter (A, B, C...)
    textBox.maxLength = 9; 

    shapePanel.appendChild(square);
    shapePanel.appendChild(rectangle);
    shapePanel.appendChild(textBox);

    const buttonPanel = document.createElement("div");
    buttonPanel.classList.add("button-panel");

    const squareColorButton = createColorButton("Choose Square Color", square, "backgroundColor");
    const rectangleColorButton = createColorButton("Choose Rectangle Color", rectangle, "backgroundColor");
    const textColorButton = createColorButton("Choose Text Color", textBox, "color");

    buttonPanel.appendChild(squareColorButton);
    buttonPanel.appendChild(rectangleColorButton);
    buttonPanel.appendChild(textColorButton);

    row.appendChild(shapePanel);
    row.appendChild(buttonPanel);

    return row;
  }




  // Function to Create Color Buttons
  function createColorButton(label, targetElement, property) {
    const button = document.createElement("button");
    button.classList.add("color-button");
    button.textContent = label;

    button.addEventListener("click", function () {
      colorPicker.click();
      colorPicker.oninput = function () {
        targetElement.style[property] = colorPicker.value;
      };
    });

    return button;
  }




  // Function to Handle Continue Button Click
  function handleContinueButtonClick(tierListName) {
    const rowsData = [];
    const rows = document.querySelectorAll(".tier-row");
    rows.forEach(row => {
      const rowData = {
        text: row.querySelector(".text-box").value,
        squareColor: row.querySelector(".square").style.backgroundColor,
        rectangleColor: row.querySelector(".rectangle").style.backgroundColor,
        textColor: row.querySelector(".text-box").style.color
      };
      rowsData.push(rowData);
    });

    // Store the data in localStorage
    const tierListData = {
      tierListName: tierListName,
      rowsData: rowsData
    };

    localStorage.setItem("tierListData", JSON.stringify(tierListData));

    // Redirect to PG2.html after saving the data
    window.location.href = "PG2.html";
  }
});
