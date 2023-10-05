import * as assignmentService from "../services/assignmentService.js";
import { getCredentials } from "../services/auth.js";
//get all

export const getAllAssignments = async (req, res) => {
  try {
    // Fetch all assignments
    const assignments = await assignmentService.getAllAssignments();

    // Return a 200 OK response with the assignments
    res.status(200).json(assignments);
  } catch (error) {
    // Handle any other errors and return a 403 Forbidden or 500 Internal Server Error response
    if (error.message === "Forbidden") {
      res.status(403).json({ error: "Forbidden" });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const createAssignment = async (req, res) => {
  const assignmentData = req.body;

  try {
    assignmentData.createdBy = getCredentials(req)[0];

    // Create the assignment
    const assignment = await assignmentService.createAssignment(assignmentData);

    // Return a 201 Created response with the created assignment
    res.status(201).json(assignment);
  } catch (error) {
    // Handle any other errors and return a 500 Internal Server Error response
    res.status(400).json({ error: error.message });
  }
};



export const getAssignmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const assignment = await assignmentService.getAssignmentById(id);

    if (!assignment) {
      // If assignment is not found, return a 404 Not Found response
      res.status(404).json({ error: "Assignment not found" });
      return;
    }

    // If the assignment was successfully retrieved and the user is authorized, return a 200 OK response with the assignment data
    res.status(200).json(assignment);
  } catch (error) {
    // Handle any other errors and return a 500 Internal Server Error response
    res.status(400).json({ error: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  const { id } = req.params;

  const email = getCredentials(req)[0];
  try {
    if (await assignmentService.deleteAssignmentById(id, email)) {
      res.status(204).send();
    } else {
      res.status(403).send();
    }
    // If the assignment was successfully deleted, return a 204 No Content response
  } catch (error) {
    // Handle any other errors and return a 500 Internal Server Error response
    res.status(400).json({ error: error.message });
  }
};

export const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const assignmentData = req.body;
  const email = getCredentials(req)[0];
  
  try {
    if (await assignmentService.updateAssignmentById(id, assignmentData, email)) {
      res.status(204).send();
    } else {
      res.status(403).send();
    }
  } catch (error) {
    // Handle any other errors and return a 500 Internal Server Error response
    res.status(400).json({ error: error.message });
  }
};
