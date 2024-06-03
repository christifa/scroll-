document.addEventListener('DOMContentLoaded', () => {
    let isLoggedIn = false; // Simulate user login status
    const loginBtn = document.getElementById('login-btn');
    const gigList = document.getElementById('gig-list');
    const loading = document.getElementById('loading');
    const browseButton = document.getElementById('browse-button');
    const postButton = document.getElementById('post-button');
    let page = 1;
    let gigs = [];

    const updateLoginButton = () => {
        if (isLoggedIn) {
            loginBtn.textContent = 'Logout';
            loginBtn.onclick = () => {
                isLoggedIn = false;
                updateLoginButton();
            };
        } else {
            loginBtn.textContent = 'Login';
            loginBtn.onclick = () => {
                isLoggedIn = true;
                updateLoginButton();
            };
        }
    };

    updateLoginButton();

    window.navigate = (page) => {
        const content = document.getElementById('content');
        switch(page) {
            case 'home':
                content.innerHTML = `
                    <section id="home">
                        <button id="browse-button" onclick="navigate('browse')">$1<br>New Gig</button>
                        <button id="post-button" onclick="navigate('post')">${gigs.length}<br>Gigs</button>
                    </section>
                `;
                break;
            case 'browse':
                content.innerHTML = `
                    <section id="browse-gigs">
                        <h2>Featured Gigs</h2>
                        <ul id="gig-list"></ul>
                        <div id="loading" style="display:none;">Loading more gigs...</div>
                    </section>
                `;
                loadGigs();
                window.addEventListener('scroll', handleScroll);
                break;
            case 'post':
                content.innerHTML = `
                    <section id="post-gig">
                        <h2>Post a Gig</h2>
                        <form id="post-gig-form">
                            <label for="gig-title">Gig Title:</label>
                            <input type="text" id="gig-title" name="gig-title" required>

                            <label for="gig-description">Description:</label>
                            <textarea id="gig-description" name="gig-description" required></textarea>

                            <label for="gig-category">Category:</label>
                            <select id="gig-category" name="gig-category" required>
                                <option value="category1">Category 1</option>
                                <!-- Add more categories as needed -->
                            </select>

                            <label for="gig-price">Price:</label>
                            <input type="number" id="gig-price" name="gig-price" required>

                            <label for="gig-location">Location:</label>
                            <input type="text" id="gig-location" name="gig-location" required>

                            <label for="gig-image">Upload Images:</label>
                            <input type="file" id="gig-image" name="gig-image">

                            <label for="terms">
                                <input type="checkbox" id="terms" name="terms" required>
                                I agree to the terms and conditions.
                            </label>

                            <button type="submit">Submit Gig</button>
                        </form>
                    </section>
                `;
                document.getElementById('post-gig-form').addEventListener('submit', (event) => {
                    event.preventDefault();
                    createGig();
                });
                break;
            case 'register':
                content.innerHTML = `
                    <section id="register-form">
                        <h2>Register</h2>
                        <form id="register-form">
                            <label for="register-username">Username:</label>
                            <input type="text" id="register-username" name="register-username" required>

                            <label for="register-password">Password:</label>
                            <input type="password" id="register-password" name="register-password" required>

                            <button type="submit">Register</button>
                        </form>
                    </section>
                `;
                document.getElementById('register-form').addEventListener('submit', (event) => {
                    event.preventDefault();
                    registerUser();
                });
                break;
            case 'search':
                content.innerHTML = `
                    <section id="search">
                        <h2>Search</h2>
                        <form>
                            <input type="text" placeholder="Search Gigs">
                            <button type="submit">Search</button>
                        </form>
                    </section>
                `;
                break;
            default:
                content.innerHTML = `<section><h2>Page Not Found</h2></section>`;
        }
    };

    const createGig = () => {
        const gigTitle = document.getElementById('gig-title').value;
        const gigDescription = document.getElementById('gig-description').value;
        const gigCategory = document.getElementById('gig-category').value;
        const gigPrice = document.getElementById('gig-price').value;
        const gigLocation = document.getElementById('gig-location').value;

        // Save gig details in the database
        fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                action: 'postGig',
                title: gigTitle,
                description: gigDescription,
                category: gigCategory,
                price: gigPrice,
                location: gigLocation
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const gigItem = document.createElement('li');
                gigItem.innerHTML = `<a href="#" onclick="navigateToGig('${gigTitle}', '${gigDescription}', '${gigCategory}', '${gigPrice}', '${gigLocation}')">${gigTitle}</a>`;
                document.getElementById('gig-list').prepend(gigItem);
                gigs.unshift({
                    title: gigTitle,
                    description: gigDescription,
                    category: gigCategory,
                    price: gigPrice,
                    location: gigLocation
                });
                updateButtons();
            } else {
                alert('Error: ' + data.message);
            }
        });
    };

    const registerUser = () => {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        // Save user information in the database
        fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                action: 'register',
                username: username,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('User registered successfully');
                navigate('home');
            } else {
                alert('Error: ' + data.message);
            }
        });
    };

    window.navigateToGig = (title, description, category, price, location) => {
        const content = document.getElementById('content');
        content.innerHTML = `
            <section id="gig-detail">
                <h2>${title}</h2>
                <p>${description}</p>
                <p>Category: ${category}</p>
                <p>Price: $${price}</p>
                <p>Location: ${location}</p>
                <button onclick="navigate('browse')">Back to Gigs</button>
            </section>
        `;
    };

    const loadGigs = () => {
        // Fetch gigs from the database
        fetch('api.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                gigs = data.gigs;
                gigs.forEach(gig => {
                    const gigItem = document.createElement('li');
                    gigItem.innerHTML = `<a href="#" onclick="navigateToGig('${gig.title}', '${gig.description}', '${gig.category}', '${gig.price}', '${gig.location}')">${gig.title}</a>`;
                    gigList.appendChild(gigItem);
                });
                updateButtons();
            } else {
                alert('Error: ' + data.message);
            }
        });
    };

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading.style.display) {
            loading.style.display = 'block';
            setTimeout(() => {
                loadGigs();
                loading.style.display = 'none';
            }, 1000);
        }
    };

    const updateButtons = () => {
        postButton.innerHTML = `${gigs.length}<br>Gigs`;
    };

    // Initial navigation to home
    navigate('home');
});
