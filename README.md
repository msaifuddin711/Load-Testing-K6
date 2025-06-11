# Load Testing Project with k6 and Express.js

This project demonstrates how to perform load testing using **k6** on a simulated backend built with **Express.js**.

---

## Project Structure

```
.
├── test2.js               # k6 load testing script
├── server.js              # Express server for file simulation
├── README.md              # Project documentation
```

---

## How It Works

- The Express server provides endpoints that return files of various sizes: `10kb`, `100kb`, and `1mb`.
- The server also randomly fails 20% of requests to simulate real-world unreliability.
- The k6 script (`test2.js`) sends requests to this server and tracks metrics like:
  - Success/failure rate
  - HTTP response duration
  - Custom error rate metric

---

## Getting Started

### 1. Install dependencies and run the server

```bash
npm install express
node server.js
```

Server will run at: `http://localhost:3000`

---

### 2. Install and run k6 test

Make sure [k6](https://k6.io/) is installed on your system.

```bash
k6 run test2.js
```

---

## Example Endpoint

```
GET http://localhost:3000/file/100kb?format=txt
```

Query Parameters:
- `size`: `10kb`, `100kb`, or `1mb`
- `format`: `html` (default) or `txt`

---

## Output Sample (k6)

- 80% successful responses
- 20% simulated server errors (status 500)
- Response duration metrics
- Custom `errors` rate shown in summary

---

## Built With

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [k6](https://k6.io/)

---

## License

MIT - Free for use, learning, and modification.
