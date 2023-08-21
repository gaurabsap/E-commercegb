import CategoryModel from "../../model/productSchema/categorySchema.js";
import ProductModel from "../../model/productSchema/productSchema.js";
import cloudinary from "../cloudinary.js";
// import cloud  from '../cloudinary.js'

const uploadImage = async (img) => {
  const upload = await cloudinary.uploader.upload(img, {
    folder: "ProductImages",
  });
  const data = {
    public_id: upload.public_id,
    url: upload.url,
  };
  return data;
};
// uploadImage()
export const GetProducts = async (resq, resp) => {
  const { limit, sort } = resq.query;
  try {
    const product = await ProductModel.find({})
      .limit(limit)
      .sort({ createdAt: sort });
    if (product) {
      return resp.status(200).json({
        sucess: true,
        message: "All products",
        total: product.length,
        product,
      });
    } else {
      return resp.status(400).json({
        sucess: false,
        message: "No products founds!!",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const CreateProducts = async (resq, resp) => {
  console.log(resq.body.data);
  const { image } = resq.body;
  const { title, desc, price, category, quantity } = resq.body.data;
  if (!title || !desc || !price || !category || !quantity) {
    return resp.status(400).json({
      sucess: false,
      message: "Provide full information",
    });
  }
  try {
    const catid = await CategoryModel.findOne({ _id: category });
    if (!catid) {
      return resp.status(400).json({
        sucess: false,
        message: "Category not found!!",
      });
    }
    const data = await uploadImage(image);
    if (data) {
      const product = await ProductModel.create({
        title,
        desc,
        price,
        category: catid._id,
        quantity,
        image: {
          public_id: data.public_id,
          url: data.url,
        },
      });
      if (product) {
        return resp.status(201).json({
          sucess: true,
          message: "Product created sucessfully!!",
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const UpdateProducts = async (resq, resp) => {
  const { name, description, price, category, rating, image } = resq.body;
  try {
    const catid = await CategoryModel.findOne({ name: resq.body.category });
    const update = await ProductModel.findByIdAndUpdate(
      { _id: resq.body.id },
      {
        name: name || name,
        description: description || description,
        price: price || price,
        category: catid._id,
        rating: rating || rating,
        image: image || image,
      }
    );
    if (update) {
      return resp.status(200).json({
        sucess: true,
        message: "Product updated sucessfully!!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const DeleteProducts = async (resq, resp) => {
  const { id } = resq.body;
  try {
    const del = await ProductModel.deleteOne({ _id: id });
    console.log(del);
    if (del) {
      return resp.status(200).json({
        sucess: true,
        message: "Product deleted sucessfully!!",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getProductData = async (resq, resp) => {
  const { id } = resq.params;
  const search = await ProductModel.findOne({ _id: id });
  if (!search) {
    return resp.status(400).json({
      sucess: false,
      message: "Id is not valid",
    });
  } else {
    return resp.status(200).json({
      sucess: true,
      data: search,
    });
  }
};

export const getRelatedProduct = async (resq, resp) => {
  const { id } = resq.params;
  console.log(resq.params);
  try {
    const related = await ProductModel.find({ category: id });
    console.log(related);
    if (!related) {
      return resp.status(400).json({
        sucess: false,
        message: "Id not found",
      });
    } else {
      return resp.status(200).json({
        sucess: true,
        related,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getSearchProduct = async (resq, resp) => {
  // console.log("hit");
  const { search } = resq.query;
  // console.log(search);
  try {
    const find = await ProductModel.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } },
      ],
    });
    if (!find) {
      return resp.status(400).json({
        sucess: false,
        message: "No Data found",
      });
    } else {
      return resp.status(200).json({
        sucess: true,
        search: find,
      });
    }
    // console.log(find);
  } catch (error) {
    console.log(error.message);
  }
};
