import Lesson from "../models/Lesson.js";

// Create lesson
export const createLesson = async (req, res) => {

  try {

    const { title, description } = req.body;

    const lesson = await Lesson.create({
      title,
      description,
      mentorId: req.user._id
    });

    res.status(200).json({
      message: "Lesson created",
      lesson
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// Get all lessons
export const getLessons = async (req, res) => {

  try {

    const lessons = await Lesson.find().populate("mentorId", "name email");

    res.json(lessons);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};