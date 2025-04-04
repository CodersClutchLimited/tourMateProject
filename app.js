if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// console.log(process.env.SECRET)
// console.log(process.env.API_KEY)

const express = require("express");
// installation - npm install cors:  controls cross-origin requests security
const cors = require("cors");

//installation - npm install cookie-parser: allows easy access to cookie data sent by clients
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
//===npm i ejs-mate===//--> Simplifies layout management in Express apps.==//
const ejsMate = require("ejs-mate");
//===npm i express-session===//--> manages user sessions==//
// stores session data on the server-side, typically using session ID in a cookie
// on the client-side
const session = require("express-session");
// to create mongoDB session store-installation--> npm install connect-mongo@latest
const MongoStore = require("connect-mongo"); //--> Allows to store session data in mongoDB database
// npm i connect-flash -->storing  and displaying temporary messages between requests
const flash = require("connect-flash");
const { campgroundSchema, reviewSchema } = require("./schemas.js");
const ExpressError = require("./Utils/ExpressError");
const methodOverride = require("method-override");
//== plugins for authentication
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user");
const Campground = require("./models/campground");
const Reservation = require("./models/reservation");
const Review = require("./models/review");
//=installation npm i helmet
const helmet = require("helmet"); //enhancing security by setting various HTTP headers

//preventing mongo injection attacks
const mongoSanitize = require("express-mongo-sanitize");

const userRoutes = require("./routes/users");
const campgroundRoutes = require("./routes/campgrounds");
const reservationRoutes = require("./routes/reservations.js");
const carRoutes = require("./routes/cars");
const productRoutes = require("./routes/Product");
const tourRoutes = require("./routes/tours");
const reviewRoutes = require("./routes/reviews");
// const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
const dbUrl =
  "mongodb+srv://kebbawaiga:Howareyoudoing1@eventmanagement.uwtft.mongodb.net/?retryWrites=true&w=majority&appName=EventManagement";
// "mongodb+srv://Ousainou:Jammehbso1$@cluster0.cxpv1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(dbUrl);

const connectDB = async () => {
  try {
    // console.log("mongo_uri: ", process.env.MONGO_URI);
    const conn = await mongoose.connect(dbUrl);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connection to MongoDB: ", error.message);
    process.exit(1); // 1 is failure, 0 status code is success
  }
};
connectDB();

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

//==Server Side Validation==// related to JOI
const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

const secret = process.env.SECRET || "thisshouldbeabettersecret!";

// storing sessions in our mongoDB database
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
  store,
  name: "session", //avoiding session spoofing
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true, // security feature that helps protect against cross-site scripting (XSS) attacks
    secure: process.env.NODE_ENV === "production",
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

//automatically enables all the middlewares built in helmet
// app.use(helmet());
// const scriptSrcUrls = [
//     "https://cdn.jsdelivr.net/",
//     "https://swiperjs.com/",
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://api.mapbox.com/",
//     "https://kit.fontawesome.com/",
//     "https://cdnjs.cloudflare.com/",
//     "https://unpkg.com/"
// ];
// const styleSrcUrls = [
//     "https://cdn.jsdelivr.net/",
//      "https://swiperjs.com/",
//     "https://stackpath.bootstrapcdn.com/",
//     "https://api.mapbox.com/",
//     "https://api.tiles.mapbox.com/",
//     "https://fonts.googleapis.com/",
//     "https://cdnjs.cloudflare.com/",
// ];
// const connectSrcUrls = [
//     "https://api.mapbox.com/",
//     "https://a.tiles.mapbox.com/",
//     "https://b.tiles.mapbox.com/",
//     "https://events.mapbox.com/",
// ];
// const fontSrcUrls = [
//     "https://cdn.jsdelivr.net/",
//     "https://fonts.googleapis.com/",
//     "https://fonts.gstatic.com/",
//     "https://cdnjs.cloudflare.com/"
// ];

// app.use(
//     helmet.contentSecurityPolicy({
//         directives: {
//             defaultSrc: ["'self'"],
//             connectSrc: ["'self'", ...connectSrcUrls],
//             scriptSrc: ["'self'", "'unsafe-inline'", ...scriptSrcUrls],
//             styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
//             workerSrc: ["'self'", "blob:"],
//             objectSrc: ["'none'"],
//             imgSrc: [
//                 "'self'",
//                 "blob:",
//                 "data:",
//                 "https://res.cloudinary.com/darsby1iv/",
//                 "https://img.freepik.com/",
//                 "https://c4.wallpaperflare.com"
//             ],
//             fontSrc: ["'self'", "data:", ...fontSrcUrls],
//         },
//     })
// );

//== used after "app.use(session(sessionConfig))"
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/reservations", reservationRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/cars", carRoutes);
app.use("/products", productRoutes);
app.use("/tours", tourRoutes);
app.get("/", (req, res) => {
  //debugging steps to see if the route being accessed
  // console.log("Home route accessed")
  // res.send('home page is working')
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

// express error handler
app.use((err, req, res, next) => {
  console.error(err.stack); //to log the full error stack
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("SERVING ON PORT 3000!");
});
