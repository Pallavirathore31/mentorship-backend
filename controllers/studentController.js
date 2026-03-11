import Student from "../models/Student.js";

// Create Student
export const createStudent = async (req, res) => {

  try {

    const { name, age } = req.body;

    const student = await Student.create({
      name,
      age,
      parentId: req.user._id
    });

    res.status(200).json({
      message: "Student created",
      student
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Get Students for Logged Parent
export const getStudents = async (req, res) => {

  try {

    const students = await Student.find({
      parentId: req.user._id
    });

    res.json(students);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};