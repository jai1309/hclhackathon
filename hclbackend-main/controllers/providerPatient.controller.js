import ProviderPatient from "../models/providerPatient.model.js";
import {
  errorResponseBody,
  successResponseBody,
} from "../utils/responsebody.js";

//assign a patient to a provider
const assignPatient = async (req, res) => {
  try {
    const { patient_id } = req.body;

    const existing = await ProviderPatient.findOne({
      provider_id: req.user._id,
      patient_id,
    });

    if (existing) {
      return res.status(409).json({
        ...errorResponseBody,
        message: "Patient already assigned to this provider",
      });
    }

    const assignment = await ProviderPatient.create({
      provider_id: req.user._id,
      patient_id,
    });

    return res.status(201).json({
      ...successResponseBody,
      message: "Patient assigned successfully",
      data: assignment,
    });
  } catch (error) {
    return res.status(500).json({ ...errorResponseBody, err: error.message });
  }
};


//get patients assigned to a provider
const getPatientsByProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId || req.user._id;
    const assignments = await ProviderPatient.find({
      provider_id: providerId,
    }).populate("patient_id", "name email");

    return res.status(200).json({
      ...successResponseBody,
      message: "Patients fetched",
      data: assignments,
    });
  } catch (error) {
    return res.status(500).json({ ...errorResponseBody, err: error.message });
  }
};

//get providers assigned to a patient
const getProvidersByPatient = async (req, res) => {
  try {
    const patientId = req.params.patientId || req.user._id;
    const assignments = await ProviderPatient.find({
      patient_id: patientId,
    }).populate("provider_id", "name email");

    return res.status(200).json({
      ...successResponseBody,
      message: "Providers fetched",
      data: assignments,
    });
  } catch (error) {
    return res.status(500).json({ ...errorResponseBody, err: error.message });
  }
};

//remove patient assignment
const removeAssignment = async (req, res) => {
  try {
    const assignment = await ProviderPatient.findOneAndDelete({
      _id: req.params.id,
      provider_id: req.user._id,
    });

    if (!assignment) {
      return res
        .status(404)
        .json({ ...errorResponseBody, message: "Assignment not found" });
    }

    return res
      .status(200)
      .json({ ...successResponseBody, message: "Assignment removed" });
  } catch (error) {
    return res.status(500).json({ ...errorResponseBody, err: error.message });
  }
};

export {
  assignPatient,
  getPatientsByProvider,
  getProvidersByPatient,
  removeAssignment,
};
