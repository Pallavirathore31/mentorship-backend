
export const parentOnly = (req, res, next) => {

  if (req.user.role !== "parent") {
    return res.status(403).json({
      message: "Only parents can perform this action"
    });
  }

  next();

};
export const mentorOnly = (req, res, next) => {

  if (req.user.role !== "mentor") {
    return res.status(403).json({
      message: "Only mentors can perform this action"
    });
  }

  next();

};