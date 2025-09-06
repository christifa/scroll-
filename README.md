# Scroll Application

[![CI Status](https://github.com/christifa/scroll-/actions/workflows/ci.yml/badge.svg)](https://github.com/christifa/scroll-/actions/workflows/ci.yml)
[![GitHub stars](https://img.shields.io/github/stars/christifa/scroll-?style=social)](https://github.com/christifa/scroll-/stargazers)

This is a simple web application for posting and browsing gigs, built with HTML, JavaScript, PHP and Node. Originally prototyped in StackBlitz, it provides basic user authentication and CRUD functionality.

## Features

- User registration and login pages
- Post new gigs through a form
- Browse and search gigs
- Basic API endpoint (`api.php`) for data handling

## Getting Started

Clone the repository and install dependencies:

```
git clone https://github.com/christifa/scroll-.git
cd scroll-
npm install
```

To start a development server:

```
npm start
```

Alternatively, you can serve the `index.html` file with any static server.

## Project Structure

```
scroll-/
├── index.html          # Home page
├── browse-gigs.html    # Page to browse gigs
├── post-gig.html       # Form to create a gig
├── login.html          # Login page
├── register.html       # Registration page
├── api.php             # Simple PHP API endpoint
├── script.js           # Client-side JavaScript
├── package.json        # Node dependencies
└── README.md           # Project documentation
```

## Contributing

Contributions are welcome! Please open an issue to discuss your ideas or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
