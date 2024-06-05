document.addEventListener('DOMContentLoaded', function () {
// Fetch and display GitHub repositories
fetch('https://api.github.com/users/SAMMY-HM/repos')
  .then(response => response.json())
  .then(repos => {
    const projectGallery = document.getElementById('project-gallery');
    projectGallery.innerHTML = ''; // Clear any existing content

    repos.forEach(repo => {
      // Create a div element to display the fetched repository
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project');

      projectDiv.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;

      projectGallery.appendChild(projectDiv);
    });
  })
  .catch(error => console.error('Error fetching GitHub repos:', error));


  
  // Combined form validation and submission handling
  document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();  // Prevent the default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (!name || !email || !message) {
    alert('All fields are required!');
    return;
  }

  fetch('http://localhost:8000/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Message sent successfully!');
      document.getElementById('contact-form').reset();
    } else {
      alert('Failed to send message.');
    }
  })
  .catch(error => console.error('Error:', error));
  });

  // Add event listener for download resume button
  document.getElementById('download-resume').addEventListener('click', function () {
    fetch('http://localhost:8000/api/download-resume')
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'resume.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error downloading resume:', error));
  });
  })
// THE SCROLL TO TOP BUTTON
  // Get the button:
  let mybutton = document.getElementById("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};
  
  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  
  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  } 
  