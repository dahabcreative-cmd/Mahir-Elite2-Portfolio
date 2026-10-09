const express = require("express");
const projectsRouter = require("./routes/projects");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Home
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Mahir Elite2 Backend is running 🚀"
    });
});

// Projects API
app.use("/api/projects", projectsRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});