import ActivityLog from "../models/activityLog.model.js";
import {
  errorResponseBody,
  successResponseBody,
} from "../utils/responsebody.js";

const createActivityLog = async (req, res) => {
  try {
    const { action, resource } = req.body;
    const log = await ActivityLog.create({
      user_id: req.user._id,
      action,
      resource,
    });
    return res.status(201).json({
      ...successResponseBody,
      message: "Activity logged",
      data: log,
    });
  } catch (error) {
    return res.status(500).json({ ...errorResponseBody, err: error.message });
  }
};

const getActivityLogsByUser = async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    const logs = await ActivityLog.find({ user_id: userId }).sort({
      created_at: -1,
    });
    return res.status(200).json({
      ...successResponseBody,
      message: "Activity logs fetched",
      data: logs,
    });
  } catch (error) {
    return res.status(500).json({ ...errorResponseBody, err: error.message });
  }
};

const deleteActivityLog = async (req, res) => {
  try {
    const log = await ActivityLog.findByIdAndDelete(req.params.id);
    if (!log) {
      return res
        .status(404)
        .json({ ...errorResponseBody, message: "Activity log not found" });
    }
    return res
      .status(200)
      .json({ ...successResponseBody, message: "Activity log deleted" });
  } catch (error) {
    return res.status(500).json({ ...errorResponseBody, err: error.message });
  }
};

export { createActivityLog, getActivityLogsByUser, deleteActivityLog };
