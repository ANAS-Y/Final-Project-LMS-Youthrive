document.addEventListener("DOMContentLoaded", function() {
    // Assuming user role is available in localStorage
    const userRole= localStorage.getItem("userRole");
    const sidebarLinks = document.getElementById("sidebarLinks");
    const sidebarLinks2 = document.getElementById("sidebarLinks2");
    const sidebarHeading = document.getElementById("sidebarHeading");
    const alertContainer = document.getElementById("alertContainer");

    if (!userRole) {
      const alert = document.createElement("div");
      alert.className = "alert alert-danger";
      alert.textContent = "User role not found. Please log in again.";
      alertContainer.appendChild(alert);
      this.location.href = "../auth/login";
    }
    if (!userRole || userRole !=="admin") {
      sidebarLinks2.style.display ="none";
      sidebarHeading.innerHTML ="";
    }else{
      sidebarLinks2.style.display ="block"; 
      sidebarHeading.style.visibility ="visible";
    }
    const adminLinks = [
      { href: "../auth/dashboard", icon: "home", text: "Dashboard" },
      { href: "../books/add", icon: "file", text: "Add New Books"},
      { href: "../transactions/update", icon: "bar-chart-2", text: "Mark Issued Books"},
      { href: "../transactions/borrowedBooks", icon: "plus-circle", text: "Mark Return Books"},
      { href: "../books/books", icon: "book", text: "Update Book Info"},
      { href: "../books/books", icon: "minus-circle", text: "Delete Books" },
      { href: "../auth/users", icon: "user", text: "Manage Users" }
    ];

    const userLinks = [
      { href: "../auth/dashboard", icon: "home", text: "Dashboard" },
      { href: "../books/userBooks", icon: "file", text: "Available Books" },
      { href: "../transactions/uborrowedBooks", icon: "shopping-cart", text: "Borrowed Books" },
      { href: "../transactions/userOverdue", icon: "shopping-cart", text: "Overdue Books" },
      { href: "../transactions/userRequest", icon: "bar-chart-2", text: "Book Requests" }
    ];

    const links = userRole === "admin" ? adminLinks : userLinks;

    links.forEach(link => {
      const li = document.createElement("li");
      li.className = "nav-item";
      li.innerHTML = `<a class="nav-link" href="${link.href}">
                        <span data-feather="${link.icon}"></span>
                        ${link.text}
                      </a>`;
      sidebarLinks.appendChild(li);
    });

    feather.replace();

    document.getElementById("logoutBtn").addEventListener("click", function() {
      localStorage.removeItem("userRole");
      location.href = "login";
    });
  });
  fetch('header.html')
.then(response => response.text())
.then(html => {
const existingHeaderContent = document.getElementById('header').innerHTML;
document.getElementById('header').innerHTML = html+ existingHeaderContent;
});