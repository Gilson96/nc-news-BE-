const {
  getAllUsers,
  createArticle,
  uploadImage,
} = require("../controllers/users");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const usersRouter = require("express").Router();

usersRouter.get("/", getAllUsers);
usersRouter.post("/article", createArticle);
usersRouter.post(
  "/article/uploadImage",
  upload.single("article_img_url"),
  uploadImage
);

module.exports = usersRouter;
