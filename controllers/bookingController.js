import Booking from "../models/Booking.js";

// Create booking
export const createBooking = async (req, res) => {

  try {

    const { studentId, lessonId } = req.body;

    const booking = await Booking.create({
      studentId,
      lessonId
    });

    res.status(200).json({
      message: "Booking created",
      booking
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};