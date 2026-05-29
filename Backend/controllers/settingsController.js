import Settings from '../models/settingsModel.js';

// @desc    Get platform settings
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update platform settings
// @route   PUT /api/settings
// @access  Private/Admin
export const updateSettings = async (req, res) => {
  try {
    const {
      deliveryTime,
      freeDeliveryThreshold,
      deliveryFee,
      gstPercentage,
      handlingFee,
      platformFee,
      cancellationPolicyTitle,
      cancellationPolicyText
    } = req.body;

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings();
    }

    if (deliveryTime !== undefined) settings.deliveryTime = deliveryTime;
    if (freeDeliveryThreshold !== undefined) settings.freeDeliveryThreshold = Number(freeDeliveryThreshold);
    if (deliveryFee !== undefined) settings.deliveryFee = Number(deliveryFee);
    if (gstPercentage !== undefined) settings.gstPercentage = Number(gstPercentage);
    if (handlingFee !== undefined) settings.handlingFee = Number(handlingFee);
    if (platformFee !== undefined) settings.platformFee = Number(platformFee);
    if (cancellationPolicyTitle !== undefined) settings.cancellationPolicyTitle = cancellationPolicyTitle;
    if (cancellationPolicyText !== undefined) settings.cancellationPolicyText = cancellationPolicyText;

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
