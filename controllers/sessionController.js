import Session from "../models/Session.js";


// Create Session
export const createSession = async (req, res) => {

  try {

    const { lessonId, date, topic, summary } = req.body;

    const session = await Session.create({
      lessonId,
      date,
      topic,
      summary
    });

    res.status(200).json({
      message: "Session created successfully",
      session
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};



// Get sessions by lesson
export const getLessonSessions = async (req, res) => {

  try {

    const lessonId = req.params.id;

    const sessions = await Session.find({ lessonId });

    res.json(sessions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};