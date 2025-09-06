# 212GiGs Marketplace Showcase

[![CI Status](https://github.com/christifa/scroll-/actions/workflows/ci.yml/badge.svg?branch=212gigs-marketplace-showcase)](https://github.com/christifa/scroll-/actions/workflows/ci.yml)
[![GitHub stars](https://img.shields.io/github/stars/christifa/scroll-?style=social)](https://github.com/christifa/scroll-/stargazers)

**212GiGs is an online marketplace where talent meets opportunity.** This project powers the **Marketplace Showcase** for 212GiGs, letting users explore freelance gigs, post new gigs, and build their profiles. Originally built on the Scroll prototype, this branch tailors the experience for 212GiGs with a bold new look and additional pages for About, Members, and Contact.

## Features

- **Explore gigs** – Browse and search the latest freelance opportunities.
- **Post gigs** – Publish new gigs through a simple form.
- **User accounts** – Register, log in, and manage your profile.
- **Marketplace showcase** – Landing page introducing 212GiGs’ mission ("Where talent meets opportunity") and inviting visitors to Explore, Engage, and Earn.
- **About and Contact pages** – Learn more about the platform and get in touch.
- **Cart and Members areas** – Navigation links for shopping cart and member directory (placeholders for future development).

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/christifa/scroll-.git
cd scroll-
npm install
```

To run locally, start a simple PHP/Node server in the project root:

```bash
# With PHP built in server
php -S localhost:8000

# Or with Node (if you have an Express setup)
npm start
```

## Project Structure

```
├── index.html            # Landing page and gig feed
├── browse-gigs.html      # Page for browsing gigs
├── post-gig.html         # Form to post new gigs
├── register.html         # User registration
├── login.html            # User login
├── members.html          # List of members (future)
├── api.php               # Basic API endpoint for data
├── styles.css            # Basic styling
└── script.js             # Front‑end behaviour
```

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for new features or bug fixes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
