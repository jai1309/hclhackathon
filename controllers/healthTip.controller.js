import HealthTip from "../models/healthTip.model.js";
import {
  errorResponseBody,
  successResponseBody,
} from "../utils/responsebody.js";

const createHealthTip = async (req, res) => {
  try {
    const { tip_id, title, content } = req.body;
    const existing = await HealthTip.findOne({ tip_id });
    if (existing) {
      return res.status(409).json({
        ...errorResponseBody,
        message: "Health tip with this tip_id already exists",
      });
    }
    const tip = await HealthTip.create({ tip_id, title, content });
    return res.status(201).json({
      ...successResponseBody,
      message: "Health tip created",
      data: tip,
    });
  } catch (error) {
    return res.status(500).json({ ...errorResponseBody, err: error.message });
  }
};

const getAllHealthTips = async (req, res) => {
  try {
    const tips = await HealthTip.find().sort({ created_at: -1 });
    return res.status(200).json({
      ...successResponseBody,
      message: "Health tips fetched",
      data: tips,
    });
  } catch (error) {
    return res.status(500).json({ ...errorResponseBody, err: error.message });
  }
};

const getHealthTipById = async (req, res) => {
  try {
    const tip = await HealthTip.findById(req.params.id);
    if (!tip) {
      return res
        .status(404)
        .json({ ...errorResponseBody, message: "Health tip not found" });
    }
    return res.status(200).json({
      ...successResponseBody,
      message: "Health tip fetched",
      data: tip,
    });
  } catch (error) {
    return res.status(500).json({ ...errorResponseBody, err: error.message });
  }
};

const updateHealthTip = async (req, res) => {
  try {
    const { title, content } = req.body;
    const tip = await HealthTip.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true },
    );
    if (!tip) {
      return res
        .status(404)
        .json({ ...errorResponseBody, message: "Health tip not found" });
    }
    return res.status(200).json({
      ...successResponseBody,
      message: "Health tip updated",
      data: tip,
    });
  } catch (error) {
    return res.status(500).json({ ...errorResponseBody, err: error.message });
  }
};

const deleteHealthTip = async (req, res) => {
  try {
    const tip = await HealthTip.findByIdAndDelete(req.params.id);
    if (!tip) {
      return res
        .status(404)
        .json({ ...errorResponseBody, message: "Health tip not found" });
    }
    return res
      .status(200)
      .json({ ...successResponseBody, message: "Health tip deleted" });
  } catch (error) {
    return res.status(500).json({ ...errorResponseBody, err: error.message });
  }
};

export {
  createHealthTip,
  getAllHealthTips,
  getHealthTipById,
  updateHealthTip,
  deleteHealthTip,
};
