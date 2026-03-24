function showQuote() {
    document.getElementById("quote").innerHTML =
        "Readers lives a thousand lives before they dies.";
}
function filterBooks(category) {
    let books = document.querySelectorAll(".book");

    books.forEach(function(book) {
        if (category === "all") {
            book.style.display = "block";
        } else {
            if (book.classList.contains(category)) {
                book.style.display = "block";
            } else {
                book.style.display = "none";
            }
        }
    });
}
let accordions = document.getElementsByClassName("accordion");

for (let i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener("click", function () {
        let panel = this.nextElementSibling;

        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}
function searchBooks() {
    let query = document.getElementById("searchInput").value;
    let results = document.getElementById("results");

    if (query === "") {
        results.innerHTML = "<p>Please enter a book title.</p>";
        return;
    }

    let url = "https://openlibrary.org/search.json?title=" + query;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            results.innerHTML = "";

            if (data.docs.length === 0) {
                results.innerHTML = "<p>No books found.</p>";
                return;
            }

            for (let i = 0; i < 6 && i < data.docs.length; i++) {
                let book = data.docs[i];

                let title = book.title ? book.title : "No title available";
                let author = book.author_name ? book.author_name[0] : "Unknown author";
                let coverId = book.cover_i;
                let coverUrl = coverId
                    ? "https://covers.openlibrary.org/b/id/" + coverId + "-M.jpg"
                    : "https://via.placeholder.com/200x300?text=No+Cover";

                results.innerHTML += `
                    <div class="result-book">
                        <img src="${coverUrl}" alt="${title} cover">
                        <h3>${title}</h3>
                        <p><strong>Author:</strong> ${author}</p>
                    </div>
                `;
            }
        })
        .catch(error => {
            results.innerHTML = "<p>Something went wrong. Please try again.</p>";
        });
}
function validateForm() {
    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let genre = document.getElementById("genre").value;
    let author = document.getElementById("author").value;
    let message = document.getElementById("message").value;
    let formMessage = document.getElementById("formMessage");

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (fullname === "" || email === "" || genre === "" || author === "" || message === "") {
        formMessage.innerHTML = "Please complete all required fields.";
        formMessage.style.color = "red";
        return;
    }

    if (!email.match(emailPattern)) {
        formMessage.innerHTML = "Please enter a valid email address.";
        formMessage.style.color = "red";
        return;
    }

    formMessage.innerHTML = "Form submitted successfully!";
    formMessage.style.color = "green";
}