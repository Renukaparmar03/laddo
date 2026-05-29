import Banner from '../models/Banner.js';

// @desc    Get all banners
// @route   GET /api/banners
// @access  Public/Admin
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({}).sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get active banners for public view
// @route   GET /api/banners/active
// @access  Public
export const getActiveBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ status: 'Active' }).sort({ createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new banner
// @route   POST /api/banners
// @access  Admin
export const createBanner = async (req, res) => {
  try {
    const { title, image, images, location, link, startDate, endDate, status } = req.body;

    const banner = new Banner({
      title,
      image,
      images: images || [],
      location,
      link,
      startDate,
      endDate,
      status,
    });

    const createdBanner = await banner.save();
    res.status(201).json(createdBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a banner (status or details)
// @route   PUT /api/banners/:id
// @access  Admin
export const updateBanner = async (req, res) => {
  try {
    const { title, image, images, location, link, startDate, endDate, status } = req.body;
    const banner = await Banner.findById(req.params.id);

    if (banner) {
      banner.title = title !== undefined ? title : banner.title;
      banner.image = image !== undefined ? image : banner.image;
      if (images !== undefined) banner.images = images;
      banner.location = location !== undefined ? location : banner.location;
      banner.link = link !== undefined ? link : banner.link;
      banner.startDate = startDate !== undefined ? startDate : banner.startDate;
      banner.endDate = endDate !== undefined ? endDate : banner.endDate;
      banner.status = status !== undefined ? status : banner.status;

      const updatedBanner = await banner.save();
      res.json(updatedBanner);
    } else {
      res.status(404).json({ message: 'Banner not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a banner
// @route   DELETE /api/banners/:id
// @access  Admin
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (banner) {
      await banner.deleteOne();
      res.json({ message: 'Banner removed' });
    } else {
      res.status(404).json({ message: 'Banner not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
