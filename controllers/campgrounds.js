const Campground = require("../models/campground");
const Review = require("../models/review");
const Reservation = require("../models/reservation");
const getCategories = require("../Utils/categoryHelper");
const formatTimeDifference = require("../Utils/timeHelper");
//== mapbox for our maps inegration-
// installation--> npm install @mapbox/mapbox-sdk
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
// const mapBoxToken = process.env.MAPBOX_TOKEN;
// const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");

//index page
module.exports.index = async (req, res) => {
  try {
    // Fetch campgrounds with their authors and reviews
    const campgrounds = await Campground.find({})
      .populate("author")
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      });

    // Calculate average rating for each campground
    const updatedCampgrounds = campgrounds.map((campground) => {
      const ratings = campground.reviews.map((review) => review.rating);
      const averageRating = ratings.length
        ? (
            ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
          ).toFixed(1)
        : 0;
      return { ...campground.toObject(), averageRating };
    });

    res.render("campgrounds/index", {
      campgrounds: updatedCampgrounds,
      formatTimeDifference,
    });
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong!");
    res.redirect("/campgrounds");
  }
};

//new and create page
module.exports.renderNewForm = (req, res) => {
  const categories = getCategories();
  res.render("campgrounds/new", { categories });
};

// module.exports.createCampground = async (req, res, next) => {
//   const geoData = await geocoder
//     .forwardGeocode({
//       query: req.body.campground.location,
//       limit: 1,
//     })
//     .send();
//   const campground = new Campground(req.body.campground);
//   campground.geometry = geoData.body.features[0].geometry;
//   campground.images = req.files.map((f) => ({
//     url: f.path,
//     filename: f.filename,
//   }));
//   campground.author = req.user._id;

//   // Ensure manualUnavailableDates is properly initialized
//   campground.manualUnavailableDates = req.body.campground.manualUnavailableDates
//     ? req.body.campground.manualUnavailableDates.map((date) => new Date(date))
//     : [];

//   await campground.save();
//   req.flash("success", "Successfully made a new campground!");
//   res.redirect(`/campgrounds/${campground._id}`);
// };

module.exports.showCampground = async (req, res) => {
  const { id } = req.params;
  const today = new Date();

  // Fetch the campground along with reviews, author, and reservations
  const campground = await Campground.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate({
      path: "reservations",
      populate: {
        path: "user",
        select: "username",
      },
    })
    .populate("author");

  if (!campground) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/campgrounds");
  }

  // Calculate average rating
  const ratings = campground.reviews.map((review) => review.rating);
  const totalRatings = ratings.reduce((sum, rating) => sum + rating, 0);
  const averageRating = ratings.length
    ? (totalRatings / ratings.length).toFixed(1)
    : 0;

  // Review analysis
  const reviewAnalysis = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  campground.reviews.forEach((review) => {
    reviewAnalysis[review.rating]++;
  });

  // Fetch reservations and manual unavailable dates
  const reservations = await Reservation.find({
    campground: id,
    endDate: { $gte: today },
  }).populate("user", "username");

  // Debugging
  console.log("Reservations:", reservations);
  console.log("Manual Unavailable Dates:", campground.manualUnavailableDates);

  // Convert manualUnavailableDates to valid Date objects
  const allUnavailableDates = [
    ...reservations.map((res) => ({
      startDate: new Date(res.startDate).toISOString().split("T")[0],
      endDate: new Date(res.endDate).toISOString().split("T")[0],
    })),
    ...campground.manualUnavailableDates
      .map((date) => {
        // Ensure date is a valid Date object
        const startDate = new Date(date.startDate);
        const endDate = new Date(date.endDate);

        // Check if dates are valid
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          console.error("Invalid date:", date);
          return { startDate: null, endDate: null };
        }
        return {
          startDate: startDate.toISOString().split("T")[0],
          endDate: endDate.toISOString().split("T")[0],
        };
      })
      .filter((range) => range.startDate && range.endDate), // Filter out invalid dates
  ];

  console.log("All Unavailable Dates:", allUnavailableDates);

  const { startDate, endDate } = req.query;
  let isAvailable = true;
  if (startDate && endDate) {
    isAvailable = !allUnavailableDates.some(
      (dateRange) =>
        new Date(startDate) < new Date(dateRange.endDate) &&
        new Date(endDate) > new Date(dateRange.startDate)
    );
  }

  // Check if the logged-in user is the host
  const isHost = req.user && campground.author.equals(req.user._id);

  res.render("campgrounds/show", {
    campground,
    allUnavailableDates,
    isAvailable,
    averageRating,
    reviewAnalysis,
    formatTimeDifference,
    reservations,
    isHost,
  });
};

//edit page
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "cannot find that campground!");
    return res.redirect("/campgrounds");
  }

  const categories = getCategories();
  res.render("campgrounds/edit", { campground, categories });
};

module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });

  campground.set(req.body.campground);
  const imgs = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  campground.images.push(...imgs);

  // Handle manual unavailable dates
  if (req.body.campground.manualUnavailableDates) {
    campground.manualUnavailableDates =
      req.body.campground.manualUnavailableDates.map((date) => new Date(date));
  }

  await campground.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      //to remove it from cloudinary
      await cloudinary.uploader.destroy(filename);
    }
    //removing from mongo
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash("success", "Successfully updated campground!");
  res.redirect(`/campgrounds/${campground._id}`);
};

//delete page
module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted campground!");
  res.redirect("/campgrounds");
};
