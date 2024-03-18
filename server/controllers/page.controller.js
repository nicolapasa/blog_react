const Page = require("../models/Page.model");

const getOnePage = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Page.findById(id);
    return res.status(201).json({ page: response });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const createPage = async (req, res) => {
  const payload = { ...req.body };

  if (req.file) {
    payload.picture = req.file.path;
  } else {
    delete payload.picture;
  }

  try {
    const response = await Page.create(payload);
    return res.status(201).json({ message: "post Created" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAllPages = async (req, res) => {
  try {
    const response = await Page.find();
    return res.status(201).json({ pages: response });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const deletePage = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Page.findOneAndDelete(id);
    return res.status(200).json({ message: "page deleted" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
module.exports = { getOnePage, createPage, getAllPages, deletePage };
