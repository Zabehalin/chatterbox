const path = require("path");
module.exports = function (formidable, Group) {
  return {
    SetRouting: function (router) {
      router.get("/dashboard", this.adminPage);

      router.post("/uploadFile", this.uploadFile);
      router.post("/dashboard", this.adminPostPage);
    },

    adminPage: function (req, res) {
      res.render("admin/dashboard");
    },

    adminPostPage: function (req, res) {
      const form = new formidable.IncomingForm();
      form.uploadDir = path.join(__dirname, "../public/uploads");
      form.on("file", (field, file) => {});
      form.on("error", (err) => {});
      form.on("end", () => {});

      form.parse(req, (error, fields, files) => {
        var imgName = files.upload.path.split("\\");
        imgNameLen = imgName.length;
        imgName = imgName[imgNameLen - 1];
        console.log("Files ", files.upload.path);
        console.log(imgName);
      });

      const newGroup = new Group();
      console.log("BODY -> ", req.body);
      newGroup.name = req.body.group;
      newGroup.description = req.body.description;
      newGroup.image = req.body.upload;
      newGroup.save((err) => {
        res.render("admin/dashboard");
      });
    },

    uploadFile: function (req, res) {
      // const form = new formidable.IncomingForm();
      // form.uploadDir = path.join(__dirname, "../public/uploads");
      // console.log("form", form);
      // form.on("file", (field, file) => {});
      // form.on("error", (err) => {});
      // form.on("end", () => {});
      // form.parse(req);
    },
  };
};
