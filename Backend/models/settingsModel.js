import mongoose from 'mongoose';

const settingsSchema = mongoose.Schema({
  deliveryTime: {
    type: String,
    default: '10–15 mins',
  },
  freeDeliveryThreshold: {
    type: Number,
    default: 199,
  },
  deliveryFee: {
    type: Number,
    default: 25,
  },
  gstPercentage: {
    type: Number,
    default: 5, // 5%
  },
  handlingFee: {
    type: Number,
    default: 2,
  },
  platformFee: {
    type: Number,
    default: 0,
  },
  cancellationPolicyTitle: {
    type: String,
    default: 'Cancellation Policy',
  },
  cancellationPolicyText: {
    type: String,
    default: 'Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.',
  }
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
