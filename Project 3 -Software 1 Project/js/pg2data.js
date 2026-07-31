document.addEventListener("DOMContentLoaded", function () {
  // ==================== Initial Row Setup ====================

  // Load the tier list data from localStorage
  const tierListData = JSON.parse(localStorage.getItem("tierListData"));

  if (!tierListData) {
    console.error("Tier list data not found in localStorage.");
    return;
  }

  // Set the tier list name from the data
  const tierListName = tierListData.tierListName;
  document.getElementById("tierListName").textContent = tierListName;

  // Create the rows based on the data
  const tierListRowsContainer = document.getElementById("tierListRows");

  tierListData.rowsData.forEach((rowData) => {
    const row = createRow(rowData);
    tierListRowsContainer.appendChild(row);
  });

  // Error message container
  const errorMessage = document.querySelector(".error-message");

  // ==================== Event Listeners ====================

  const downloadButton = document.getElementById("downloadButton");
  downloadButton.addEventListener("click", function () {
    console.log("Download button clicked");

    // Get the tier-panel container where the content is to be captured
    const tierPanel = document.querySelector(".tier-panel");

    // Ensure the tierPanel exists
    if (!tierPanel) {
      console.error("Tier panel element not found!");
      return;
    }

    // Retrieve tier list data from localStorage
    const tierListData = JSON.parse(localStorage.getItem("tierListData"));
    if (!tierListData) {
      console.error("Tier list data not found in localStorage.");
      return;
    }

    const tierListName = tierListData.tierListName;
    console.log("Tier List Name: ", tierListName);  // Debugging the name

    // Using html2canvas to capture only the tier-panel content
    html2canvas(tierPanel, {
      backgroundColor: null, // Transparent background
      logging: true, // Enable logging to debug the process
      scale: 2, // Higher resolution for better image quality
      x: window.scrollX, // Account for scroll position
      y: window.scrollY, // Account for scroll position
      useCORS: true, // Allow cross-origin resource sharing (if external images are used)
    }).then(function (canvas) {
      console.log(canvas); // Debugging the canvas object

      // Convert the canvas to an image
      const dataUrl = canvas.toDataURL("image/jpeg");
      console.log("Generated image URL: ", dataUrl);

      // Create an anchor element to trigger the download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${tierListName}.jpg`; // Use the tier list name for the download file
      document.body.appendChild(link); // Append the link to the body to ensure the browser allows the download
      link.click(); // Trigger the download

      // Clean up by removing the link
      document.body.removeChild(link);
    }).catch(function (error) {
      console.error("Error generating image:", error);
    });
  });

  const postTierListButton = document.getElementById("postButton");
  postTierListButton.addEventListener("click", function () {
    console.log("Post button clicked");

    // Get the tier-panel container where the content is to be captured
    const tierPanel = document.querySelector(".tier-panel");

    if (!tierPanel) {
      console.error("Tier panel element not found!");
      return;
    }

    html2canvas(tierPanel, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    })
      .then(function (canvas) {
        canvas.toBlob(async function (blob) {
          if (!blob) {
            console.error("Failed to create a blob from the canvas.");
            return;
          }

          const formData = new FormData();
          formData.append("title", tierListName); // Tier list name from localStorage
          formData.append("description", ""); // Add optional description
          formData.append("user_id", "1"); // Example user ID
          formData.append("image", blob, `${tierListName}.jpg`); // Attach the image

          try {
            const response = await fetch("http://localhost:3000/upload", {
              method: "POST",
              body: formData,
            });

            const result = await response.json();
            if (response.ok) {
              alert("Tier list posted successfully! Image URL: " + result.imageUrl);
            } else {
              console.error("Error posting tier list:", result.message);
              alert("Error: " + result.message);
            }
          } catch (error) {
            console.error("Error during post:", error);
            alert("An error occurred while posting the tier list.");
          }
        }, "image/jpeg");
      })
      .catch(function (error) {
        console.error("Error capturing the tier panel:", error);
      });
  });

  // ==================== Functions ====================
  // Function to update the box-shadow dynamically based on body size
  function updateBoxShadow() {
    const body = document.body;
    const width = body.offsetWidth;
    const height = body.offsetHeight;
    // Calculate the box-shadow values (adjust as needed)
    const shadowSize = Math.max(width, height) * 0.05; // 5% of the larger dimension
    body.style.boxShadow = `inset 0 0 ${shadowSize}px rgba(0, 0, 0, 0.5)`;
  }
  // Function to adjust the body size to match the window's scroll window
  function updateBodySize() {
    const pageHeight = document.documentElement.scrollHeight; // Total height including content
    document.body.style.height = `${pageHeight}px`; // Set the body's height
  }




  // ==================== Handle Dynamic Positioning for Image Container ====================

  function updateImageContainerPosition() {
    const tierPanel = document.querySelector(".tier-panel");
    const imageContainer = document.querySelector(".image-container");

    if (!tierPanel || !imageContainer) {
      console.error("Required elements not found!");
      return;
    }

    const tierPanelHeight = tierPanel.offsetHeight;

    // Dynamically set the position of the image container
    imageContainer.style.top = `${tierPanelHeight + 300}px`; // Adjust as needed
  }

  // Update position on DOM load and window resize
  updateImageContainerPosition(); // Set initial position

  window.addEventListener("resize", updateImageContainerPosition); // Update on resize

  // Update box-shadow and body size when the page loads and on resize
  updateBodySize()
  updateBoxShadow();
  window.addEventListener("resize", function () {
    updateBodySize()
    updateBoxShadow();
  });






  // Function to create a row element
  function createRow(rowData) {
    const row = document.createElement("div");
    row.classList.add("tier-row");

    const shapePanel = document.createElement("div");
    shapePanel.classList.add("shape-panel");

    const square = document.createElement("div");
    square.classList.add("square");
    square.style.backgroundColor = rowData.squareColor;

    const rectangle = document.createElement("div");
    rectangle.classList.add("rectangle");
    rectangle.style.backgroundColor = rowData.rectangleColor;
    rectangle.setAttribute("data-max-images", "8");  // Set max images allowed

    const textBox = document.createElement("input");
    textBox.classList.add("text-box");
    textBox.value = rowData.text;
    textBox.style.color = rowData.textColor;

    // Enable drag-and-drop functionality for the rectangle (for row)
    rectangle.addEventListener("dragover", handleDragOver);
    rectangle.addEventListener("drop", handleDrop);

    shapePanel.appendChild(square);
    shapePanel.appendChild(rectangle);
    shapePanel.appendChild(textBox);

    row.appendChild(shapePanel);
    return row;
  }

  // Ensure the image container is set to be a valid drop area
  const imageContainer = document.querySelector(".image-container");

  // Handle drag over event (for both rows and image container)
  imageContainer.addEventListener("dragover", handleDragOver);
  imageContainer.addEventListener("drop", handleDrop);

  // Handle drag over event (for both rows and image container)
  function handleDragOver(event) {
    event.preventDefault();  // Allow the drop
    event.dataTransfer.dropEffect = "move";  // Indicate that the image is being moved
  }

  // Handle drop event when moving images between the container and rows
  function handleDrop(event) {
    event.preventDefault();

    const targetElement = event.currentTarget; // This is the image-container in this case
    const maxImages = 8;
    const currentImages = targetElement.querySelectorAll("img").length;

    // Check if max images exceeded (in case of image-container)
    if (currentImages >= maxImages && targetElement.classList.contains("rectangle")) {
      errorMessage.textContent = "You can add only up to 8 images!";
      errorMessage.style.display = "block";
      return;
    }

    const imageSrc = event.dataTransfer.getData("text/plain");
    const imgElement = document.querySelector(`img[src="${imageSrc}"]`);

    if (!imgElement) return; // If image is not found, exit

    const sourceContainer = imgElement.closest(".image-container");
    const sourceRow = imgElement.closest(".tier-row");

    if (sourceContainer) {
      sourceContainer.removeChild(imgElement);
    }

    // Append the image to the image container
    targetElement.appendChild(imgElement);
    imgElement.addEventListener("dragstart", handleDragStart);

    // Hide error message if valid drop
    errorMessage.style.display = "none";
  }

  // Function to handle drag start and mark the source
  function handleDragStart(event) {
    const image = event.target;
    event.dataTransfer.setData("text/plain", image.src);  // Store the image source to be used on drop
  }

  // Image upload input event listener
  const uploadButton = document.getElementById("uploadButton");
  const fileInput = document.getElementById("fileInput");

  uploadButton.addEventListener("click", function () {
    fileInput.click();
  });

  // Add event listener to the file input for when files are selected
  fileInput.addEventListener("change", function (event) {
    const files = event.target.files;
    const imageContainer = document.querySelector(".image-container");

    // Loop through the selected files
    Array.from(files).forEach((file) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.style.width = "100px";
      img.style.height = "80px";
      img.setAttribute("draggable", "true");
      img.addEventListener("dragstart", handleDragStart);

      // Append the image to the image container
      imageContainer.appendChild(img);
    });

    // Reset the file input to allow re-uploading the same image
    fileInput.value = '';  // Reset the input to allow re-uploading the same image

    updateBodySize();
    updateBoxShadow();
  });
});
