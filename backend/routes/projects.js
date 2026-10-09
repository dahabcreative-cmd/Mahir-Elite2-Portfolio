const express = require("express");

const router = express.Router();

let projects = [];

// GET all projects
router.get("/", (req, res) => {
    res.json({
        success: true,
        count: projects.length,
        projects: projects
    });
});

// POST new project
router.post("/", (req, res) => {
    const { name, description, category, link, image, featured } = req.body;

    if (!name || !description) {
        return res.status(400).json({
            success: false,
            message: "Project name and description are required"
        });
    }

    const newProject = {
        id: Date.now().toString(),
        name,
        description,
        category: category || "other",
        link: link || "",
        image: image || "",
        featured: featured || false,
        createdAt: new Date().toISOString()
    };

    projects.push(newProject);

    res.status(201).json({
        success: true,
        message: "Project created successfully",
        project: newProject
    });
});

// PUT update project
router.put("/:id", (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(
        project => project.id === id
    );

    if (projectIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Project not found"
        });
    }

    projects[projectIndex] = {
        ...projects[projectIndex],
        ...req.body,
        id
    };

    res.json({
        success: true,
        message: "Project updated successfully",
        project: projects[projectIndex]
    });
});

// DELETE project
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const projectExists = projects.some(
        project => project.id === id
    );

    if (!projectExists) {
        return res.status(404).json({
            success: false,
            message: "Project not found"
        });
    }

    projects = projects.filter(
        project => project.id !== id
    );

    res.json({
        success: true,
        message: "Project deleted successfully"
    });
});

module.exports = router;