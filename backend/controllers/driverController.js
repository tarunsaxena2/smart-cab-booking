const { createDriver, findDriverByUserId, updateAvailability } = require("../models/Driver");

const registerDriver = async (req, res) => {
  try {
    const { licenseNumber, experience } = req.body;

    const existingDriver = await findDriverByUserId(req.user.id);

    if (existingDriver) {
      return res.status(400).json({
        success: false,
        message: "Driver profile already exists",
      });
    }

    const driver = await createDriver(req.user.id, licenseNumber, experience);

    res.status(201).json({
      success: true,
      message: "Driver profile created successfully",
      driver,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getDriverProfile = async (req, res) => {
  try {
    const driver = await findDriverByUserId(req.user.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver profile not found",
      });
    }

    res.status(200).json({
      success: true,
      driver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const changeAvailability = async (req, res) => {
  try {
    const { availability } = req.body;

    const driver = await findDriverByUserId(req.user.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver profile not found",
      });
    }

    const updatedDriver = await updateAvailability(driver.id, availability);

    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      driver: updatedDriver,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const getDriverDashboard = async (req, res) => {
  try {
    const driver = await findDriverByUserId(req.user.id);

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver profile not found",
      });
    }

    res.status(200).json({
      success: true,
      dashboard: {
        driverId: driver.id,
        availability: driver.availability,
        rating: driver.rating,
        experience: driver.experience,
        licenseNumber: driver.license_number,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  registerDriver,
  getDriverProfile,
  changeAvailability,
  getDriverDashboard,
};