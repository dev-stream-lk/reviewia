import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  FormLabel,
  Grid,
  IconButton,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useForm, Form } from "../components/useForm";
import Rating from "@material-ui/lab/Rating";
import AddIcon from "@material-ui/icons/Add";
import { Skeleton } from "@material-ui/lab";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CompleteImage from "../static/img/complete.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getCategoryWithSubCategory } from "../services/category";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { requiredField } from "../components/Validators";
import { createPost, getPostBySearch } from "../services/posts";
import EditIcon from "@material-ui/icons/Edit";
import { PreLoader } from "../components/basic/PreLoader";
import { getDate } from "../utils/dateTime";
import NotFoundImage from "../assets/not-found.svg";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  addProductWrapper: {
    marginTop: theme.spacing(5),
  },
  stepper: {
    width: "80%",
  },
  steps: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      padding: `${theme.spacing(5)}px ${theme.spacing(2)}px`,
    },
  },
  stepForms: {
    width: "100%",
  },
  formLabel: {
    width: 150,
    wordWrap: "wrap",
  },
  input: {
    width: `calc(100% - 150px)`,
    padding: 5,
  },
  similarProductCard: {
    cursor: "pointer",
  },
  step2AddImage: {
    maxWidth: 200,
    maxHeight: 200,
    width: 200,
    height: 200,
    backgroundColor: "#aaa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  step2AddImageLabel: {
    width: "100%",
    height: "100%",
  },
  step2AddImageButton: {
    width: "100%",
    height: "100%",
  },
  uploadImagePreveiwImage: {
    maxHeight: 100,
    maxWidth: 100,
  },
  notFoundImage: {
    width: "100%",
    maxWidth: "150px",
  },
  similarCard: {
    cursor: "pointer",
    "& .MuiCardHeader-title": {
      fontSize: 20,
    },
    "& .MuiCardHeader-subheader": {
      fontSize: 14,
    },
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

function getSteps() {
  return ["Basic Details", "Upload Images", "Preview", "Finished"];
}

const SimillarProductCard = (props) => {
  const classes = useStyles();
  let { postData } = props;

  return (
    <>
      <Link
        to={`/product/view/${postData.postId}`}
        style={{ textDecoration: "none" }}
      >
        <Controls.Card className={classes.similarCard}>
          <CardHeader
            title={postData.title}
            subheader={getDate(postData.createdAt)}
          ></CardHeader>
          <CardMedia title={postData.title}>
            <div style={{ width: 200, height: 200 }}>
              <img
                style={{ maxWidth: 200, maxHeight: 200 }}
                src={`${
                  postData.imgURL.length === 0 ? "" : postData.imgURL[0].url
                }`}
              />
            </div>
          </CardMedia>
          <CardContent>
            <Rating
              name="phone"
              value={postData.rate}
              precision={0.25}
              getLabelText={(val) => `${val} Heart${val !== 1 ? "s" : ""}`}
              readOnly
            />
            <Box>{postData.rate}</Box>
          </CardContent>
          <CardActions></CardActions>
        </Controls.Card>
      </Link>
    </>
  );
};

const Step1 = (props) => {
  const classes = useStyles();
  const { step1Data, setStep1Data, handleNext } = props;

  const [disableSubmit, setDisableSubmit] = useState(true);

  const validate = (fieldValues = step1Data) => {
    let temp = {};

    if ("title" in fieldValues) temp.title = requiredField(fieldValues.title);
    if ("type" in fieldValues) temp.type = requiredField(fieldValues.type);
    if ("category" in fieldValues)
      temp.category = requiredField(fieldValues.category);
    if ("subCategory" in fieldValues)
      temp.subCategory = requiredField(fieldValues.subCategory);
    if ("brand" in fieldValues) temp.brand = requiredField(fieldValues.brand);

    setErrors({
      ...errors,
      ...temp,
    });

    return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } = useForm(
    step1Data,
    true,
    validate
  );

  const [loading, setLoading] = useState(false);
  const [similarPosts, setSimilarPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  var others = {};
  const [loadingCat, setLoadingCat] = useState(true);

  // get all categories, subCategories and brands only one time
  useEffect(async () => {
    setLoadingCat(true);
    console.log(step1Data);
    let data = await getCategoryWithSubCategory();
    let products = [];
    let services = [];
    if (data) {
      for (let i in data.products) {
        products.push({
          id: data.products[i].categoryId,
          title: data.products[i].categoryName,
          subCategories: data.products[i].subCategoryList,
        });
      }
      for (let i in data.services) {
        services.push({
          id: data.services[i].categoryId,
          title: data.services[i].categoryName,
          subCategories: data.services[i].subCategoryList,
        });
      }

      setCategories({ products, services });
    }
    setLoadingCat(false);
  }, [setStep1Data]);

  // call when product type changed
  useEffect(() => {
    setValues({
      ...values,
      category: "",
      subCategory: "",
      brand: "",
    });
    setSubCategories([]);
    setBrands([]);
  }, [values.type]);

  // call when category changed
  useEffect(() => {
    setValues({
      ...values,
      subCategory: "",
      brand: "",
    });
    setBrands([]);
    if (values.category !== "" && categories.length !== 0) {
      let type = values.type == "p" ? "products" : "services";
      categories[`${type}`].forEach((item, index) => {
        if (values.category == item.id) {
          setValues({ ...values, categoryName: item.title });
          others["category"] = item.title;
          console.log("cat", values);
          let subCategories = [];
          for (let i in item.subCategories) {
            subCategories.push({
              id: item.subCategories[i].subCategoryId,
              title: item.subCategories[i].subCategoryName,
              brands: item.subCategories[i].brandList,
            });
          }
          setSubCategories(subCategories);
        }
      });
    }
  }, [values.category, categories]);

  // call when subCategory changed
  useEffect(() => {
    if (values.subCategory != "" && subCategories.length !== 0) {
      subCategories.forEach((item, index) => {
        if (values.subCategory == item.id) {
          values["subCategoryName"] = item.title;
          others["subCategory"] = item.title;
          console.log("sub", values);
          let brands = [];
          for (let i in item.brands) {
            brands.push({
              id: item.brands[i].id,
              title: item.brands[i].name,
            });
          }
          setBrands(brands);
        }
      });
    }
  }, [values.subCategory, subCategories]);

  useEffect(() => {
    // brands.map((item, i) => {
    //   if (item.id == values.brand) {
    values["brandName"] = values.brand;
    others["brand"] = values.brand;
    //   }
    // });
  }, [values.brand, brands]);

  const validateFields = () => {
    let errors = {};
    if ("title" in values) errors["title"] = requiredField(values.title);
    if ("type" in values) errors["type"] = requiredField(values.type);
    if ("category" in values)
      errors["category"] = requiredField(values.category);
    if ("subCategory" in values)
      errors["subCategory"] = requiredField(values.subCategory);

    console.log(errors);

    let isValid = Object.values(errors).every((x) => x == "");
    setDisableSubmit(!isValid);
    return isValid;
  };

  // get similar posts
  useEffect(async () => {
    setLoading(true);
    validateFields();
    if (!others.category) {
      others["category"] = "";
    }
    if (!others.subCategory) {
      others["subCategory"] = "";
    }
    if (!others.brand) {
      others["brand"] = "";
    }
    let d = { ...values, ...others };
    let res = await getPostBySearch(d, 0, 4);
    console.log(res);
    if (res) {
      setSimilarPosts(res.posts);
    }
    setLoading(false);
  }, [values]);

  // set form data to global scope
  const handleStep1Next = (e) => {
    let a = {};
    if (values.brandName === "" || values.brandName === undefined) {
      a = { ...values, brandName: "Others" };
    } else {
      a = values;
    }
    setValues(a);
    setStep1Data(a);
    handleNext(e);
  };

  return (
    <>
      <Grid container className={classes.steps}>
        <Grid item xs={12}>
          <Form className={classes.stepForms}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Controls.Paper style={{ position: "relative" }}>
                  <PreLoader loading={loadingCat} />
                  <Grid container>
                    <Grid container alignItems="center">
                      <FormLabel className={classes.formLabel}>Title</FormLabel>
                      <Controls.Input
                        required={true}
                        value={values.title}
                        onChange={handleInputChange}
                        className={classes.input}
                        size="small"
                        name="title"
                        error={errors.title}
                      ></Controls.Input>
                    </Grid>
                    <Grid container alignItems="center">
                      <FormLabel className={classes.formLabel}>Type</FormLabel>
                      <Controls.Select
                        size="small"
                        name="type"
                        inputProps={{ size: "small", background: "red" }}
                        className={classes.input}
                        value={values.type}
                        onChange={handleInputChange}
                        options={[
                          { id: "p", title: "Product" },
                          { id: "s", title: "Service" },
                        ]}
                      />
                    </Grid>

                    <Grid container alignItems="center">
                      <FormLabel className={classes.formLabel}>
                        Category
                      </FormLabel>
                      <Controls.Select
                        value={values.category}
                        onChange={handleInputChange}
                        className={classes.input}
                        name="category"
                        options={
                          categories.length != 0
                            ? values.type === "p"
                              ? categories.products.length !== 0
                                ? categories.products
                                : [{ id: "none", title: "Not Found" }]
                              : categories.services.length !== 0
                              ? categories.services
                              : [{ id: "none", title: "Not Found" }]
                            : [{ id: "none", title: "Not Found" }]
                        }
                      />
                    </Grid>

                    <Grid container alignItems="center">
                      <FormLabel className={classes.formLabel}>
                        Sub Category
                      </FormLabel>
                      <Controls.Select
                        value={values["subCategory"]}
                        onChange={handleInputChange}
                        className={classes.input}
                        name="subCategory"
                        options={
                          subCategories.length != 0
                            ? subCategories
                            : [{ id: "none", title: "Not Found" }]
                        }
                      />
                    </Grid>
                    {/* <Grid container alignItems="center">
                      <FormLabel className={classes.formLabel}>
                        Product Year
                      </FormLabel>
                      <Controls.Input className={classes.input} type="date" />
                    </Grid> */}
                    {/* <Grid container alignItems="center">
                      <FormLabel className={classes.formLabel}>Brand</FormLabel>
                      <Controls.Select
                        value={values.brand}
                        onChange={handleInputChange}
                        className={classes.input}
                        name="brand"
                        options={
                          brands.length != 0
                            ? brands
                            : [{ id: "none", title: "Not Found" }]
                        }
                      />
                    </Grid> */}
                    <Grid container alignItems="center">
                      <FormLabel className={classes.formLabel}>Brand</FormLabel>
                      <Autocomplete
                        freeSolo
                        id="brand"
                        size="small"
                        className={classes.input}
                        disableClearable
                        value={values.brand}
                        options={brands.map((option) => option.title)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            margin="normal"
                            variant="outlined"
                            name="brand"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                            onChange={(e) =>
                              handleInputChange({
                                target: {
                                  name: "brand",
                                  value: e.target.value,
                                },
                              })
                            }
                          />
                        )}
                        onChange={(e, val) =>
                          handleInputChange({
                            target: { name: "brand", value: val },
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </Controls.Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Controls.Paper>
                  <Grid container>
                    <Grid container alignItems="center">
                      <FormLabel className={classes.formLabel}>
                        Description
                      </FormLabel>
                      <Controls.Input
                        className={classes.input}
                        multiline
                        value={values.description}
                        name="description"
                        onChange={handleInputChange}
                        rows={10}
                        size="small"
                      ></Controls.Input>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                      <Controls.Button
                        disabled={disableSubmit}
                        text="Next"
                        onClick={handleStep1Next}
                      >
                        Next <ArrowForwardIosIcon />
                      </Controls.Button>
                    </Grid>
                  </Grid>
                </Controls.Paper>
              </Grid>
            </Grid>
          </Form>
        </Grid>
        <Grid item xs={12}>
          <Controls.Paper style={{ minHeight: "40vh", position: "relative" }}>
            <PreLoader loading={loading} />
            <Grid container spacing={2}>
              <Grid
                container
                justifyContent="center"
                style={{ marginBottom: 24 }}
              >
                <Typography variant="h4" component="div">
                  Similar Products/Services
                </Typography>
              </Grid>
              {similarPosts.length !== 0 ? (
                similarPosts.map((post, i) => (
                  <Grid key={i} item xs={6} sm={4} lg={3}>
                    <SimillarProductCard postData={post} />
                  </Grid>
                ))
              ) : (
                <Grid
                  container
                  alignItems="center"
                  style={{ marginTop: 20, flexDirection: "column" }}
                >
                  {/* <Typography>
                      Updates not found.
                    </Typography> */}
                  <img src={NotFoundImage} className={classes.notFoundImage} />
                </Grid>
              )}
            </Grid>
          </Controls.Paper>
        </Grid>
      </Grid>
    </>
  );
};

const DummyImage = (props) => {
  return (
    <>
      <Controls.Card style={{ paddingTop: 10 }}>
        <CardMedia>
          <Grid container justifyContent="center">
            <Skeleton
              width={100}
              variant="rect"
              height={100}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No Image Selected
            </Skeleton>
          </Grid>
        </CardMedia>
        <CardContent>
          {/* <Grid container justifyContent="center">
            <Skeleton style={{ marginTop: 10 }} width={100} variant="rect">
              Title
            </Skeleton>
          </Grid>
          <Grid container justifyContent="center">
            <p>
              <Skeleton width={100} variant="rect">
                {" "}
                Desctiption{" "}
              </Skeleton>
            </p>
          </Grid> */}
        </CardContent>
      </Controls.Card>
    </>
  );
};

const ImageCard = (props) => {
  const classes = useStyles();
  const { cardData, removeImage, index } = props;

  return (
    <Controls.Card style={{ paddingTop: 10 }}>
      <CardMedia>
        {removeImage ? (
          <IconButton color="secondary" onClick={(e) => removeImage(index)}>
            <HighlightOffIcon />
          </IconButton>
        ) : null}
        <Grid container justifyContent="center">
          <img
            src={URL.createObjectURL(cardData.imageObj)}
            className={classes.uploadImagePreveiwImage}
          />
        </Grid>
      </CardMedia>

      <CardContent>
        {/* <Typography variant="subtitle1">{cardData.title}</Typography>
        <Grid container justifyContent="center">
          <p>{cardData.description}</p>
        </Grid> */}
      </CardContent>
    </Controls.Card>
  );
};

const ImageInfo = (props) => {
  const { selectedImages, handleImageAdd } = props;
  const [localTitle, setLocalTitle] = useState("");
  const [localDescription, setLocalDescription] = useState("");

  const handleLocalImageAdd = () => {
    handleImageAdd(localTitle, localDescription);
    setLocalTitle("");
    setLocalDescription("");
  };

  return (
    <>
      <Grid container>
        <Controls.Input
          name="altText"
          onChange={(e) => setLocalTitle(e.target.value)}
          value={localTitle}
          placeholder="Title. max 20 characters"
        />
      </Grid>
      <Grid container>
        <Controls.Input
          multiline
          rows={5}
          onChange={(e) => setLocalDescription(e.target.value)}
          value={localDescription}
          placeholder="Short Description. max 50 characters"
        />
      </Grid>
      <Grid container justifyContent="flex-end"></Grid>
    </>
  );
};

const Step2 = (props) => {
  const classes = useStyles();
  const { selectedImages, setSelectedImages, handleNext, handleBack } = props;
  const [newSelectedImage, setNewSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const [lastRemoved, setLastRemoved] = useState(null);

  const handleNewImage = (e) => {
    let file = e.target.files[0];
    setNewSelectedImage(file);
  };

  const handleImageAdd = () => {
    if (!newSelectedImage) {
      setError("Please select image");
      return;
    }
    if (error != "") {
      setError("");
    }
    let images = Array.from(selectedImages);
    images.push({
      imageObj: newSelectedImage,
    });
    setNewSelectedImage(null);
    setSelectedImages(images);
  };

  const removeImage = (index) => {
    let images = selectedImages;
    let remImg = images.splice(index, 1);
    setLastRemoved(remImg);
    setSelectedImages(images);
  };

  return (
    <>
      <Grid container className={classes.steps}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Controls.Paper>
                <Typography variant="h6" style={{ marginBottom: 20 }}>
                  You should add at least one photo before publishing your post.
                </Typography>
                <Grid container>
                  {error ? (
                    <Grid container justifyContent="center">
                      <span
                        style={{
                          textAlign: "center",
                          color: "red",
                          paddingBottom: 10,
                        }}
                      >
                        {error}
                      </span>
                    </Grid>
                  ) : null}
                  <Grid item xs={12}>
                    <Grid container justifyContent="center">
                      <div className={classes.step2AddImage}>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          name="image"
                          onChange={handleNewImage}
                          accept="images/*"
                          id="image"
                        />
                        <label
                          htmlFor="image"
                          style={{
                            backgroundSize: "cover",
                            backgroundImage: newSelectedImage
                              ? `url(${URL.createObjectURL(newSelectedImage)})`
                              : null,
                          }}
                          className={classes.step2AddImageLabel}
                        >
                          <Controls.Button
                            className={classes.step2AddImageButton}
                            variant="text"
                            text="+ Add a Photo"
                            onClick={(e) => e.target.parentNode.click()}
                          />
                        </label>
                      </div>
                    </Grid>
                    <Grid container xs={12} justifyContent="flex-end">
                      <Controls.Button
                        disabled={selectedImages.length == 3 ? true : false}
                        onClick={handleImageAdd}
                      >
                        <AddIcon /> Add
                      </Controls.Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Controls.Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Controls.Paper>
                <Typography variant="h6">Preview</Typography>
                <Grid container spacing={2}>
                  {[1, 2, 3].map((i) => {
                    if (selectedImages.length - i >= 0) {
                      return (
                        <Grid item xs={4}>
                          <ImageCard
                            index={i - 1}
                            removeImage={removeImage}
                            cardData={selectedImages[i - 1]}
                          />
                        </Grid>
                      );
                    } else {
                      return (
                        <Grid index={i - 1} item xs={4}>
                          <DummyImage />
                        </Grid>
                      );
                    }
                  })}
                  {/* {
                    selectedImages.lenght != 0 ? selectedImages.map((imgObj, i)=> 
                      (
                        <Grid item xs={4}>
                          <ImageCard index={i} removeImage={removeImage} cardData={imgObj} />
                        </Grid>
                      )
                    ) :
                      (3 - selectedImages.lenght > 0) ? Array.from(Array(3 - selectedImages.lenght).keys()).map( j => 
                        (
                          <Grid index={j+ selectedImages.lenght} item xs={4}>
                            <DummyImage />
                          </Grid>
                        )
                      ) : null 
                  } */}
                </Grid>
                <Grid
                  container
                  style={{ marginTop: 16 }}
                  justifyContent="flex-end"
                >
                  <Controls.Button
                    style={{ marginRight: 10 }}
                    onClick={handleBack}
                  >
                    <ArrowBackIosIcon /> Back
                  </Controls.Button>
                  <Controls.Button
                    disabled={selectedImages.length === 0 ? true : false}
                    onClick={handleNext}
                  >
                    Next <ArrowForwardIosIcon />
                  </Controls.Button>
                </Grid>
              </Controls.Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const Step3 = (props) => {
  const classes = useStyles();
  const {
    setStep1Data,
    setSelectedImages,
    userData,
    step1Data,
    selectedImages,
    handleNext,
    handleBack,
    setActiveStep,
    setNewPostId,
  } = props;
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const addPost = async () => {
    console.log(step1Data);
    setLoading(true);
    let data = {
      email: userData.email,
      title: step1Data["title"],
      type: step1Data["type"],
      subCategoryId: step1Data.subCategory,
      brandName: step1Data.brandName || "Others",
      description: step1Data.description,
      selectedImages,
    };
    console.log("add", step1Data);
    let res = await createPost(data);
    if (res) {
      setStep1Data([]);
      setSelectedImages([]);
      setNewPostId(res["postId"]);
      handleNext();
    } else {
      console.log("error");
    }
    setLoading(false);
  };

  return (
    <>
      <Grid container style={{ position: "relative" }}>
        <PreLoader loading={loading} />
        <Grid item xs={12}>
          <Controls.Paper>
            <Typography
              style={{ marginTop: 20, marginBottom: 20 }}
              variant="h4"
            >
              Preview Your Post
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                <Grid container justifyContent="center">
                  <Grid item xs={12} sm={10} md={8}>
                    <Controls.Paper>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        style={{ position: "relative" }}
                      >
                        <Typography variant="h6">Basic Information</Typography>
                        <Controls.ActionButton
                          color="default"
                          onClick={() => setActiveStep(0)}
                          style={{
                            fontSize: 25,
                            position: "absolute",
                            right: 20,
                          }}
                        >
                          <EditIcon color="primary" />
                        </Controls.ActionButton>
                      </Grid>
                      <Grid container>
                        <Grid container>
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid container alignItems="center">
                                <FormLabel className={classes.formLabel}>
                                  Title
                                </FormLabel>
                                <Typography>{step1Data.title}</Typography>
                              </Grid>
                              <Grid container alignItems="center">
                                <FormLabel className={classes.formLabel}>
                                  Type
                                </FormLabel>
                                <Typography>
                                  {step1Data.type === "p"
                                    ? "Product"
                                    : "Service"}
                                </Typography>
                              </Grid>

                              <Grid container alignItems="center">
                                <FormLabel className={classes.formLabel}>
                                  Category
                                </FormLabel>
                                <Typography>
                                  {step1Data["categoryName"]}
                                </Typography>
                              </Grid>
                              <Grid container alignItems="center">
                                <FormLabel className={classes.formLabel}>
                                  Sub Category
                                </FormLabel>
                                <Typography>
                                  {step1Data["subCategoryName"]}
                                </Typography>
                              </Grid>
                              {/* <Grid container alignItems="center">
                                <FormLabel className={classes.formLabel}>
                                  Product Year
                                </FormLabel>
                                <Typography>14/07/2021</Typography>
                              </Grid> */}
                              <Grid container alignItems="center">
                                <FormLabel className={classes.formLabel}>
                                  Brand
                                </FormLabel>
                                <Typography>
                                  {step1Data["brandName"]}
                                </Typography>
                              </Grid>
                              <Grid container alignItems="center">
                                <FormLabel className={classes.formLabel}>
                                  Description
                                </FormLabel>
                                <Controls.Input
                                  className={classes.input}
                                  multiline
                                  rows={10}
                                  size="small"
                                  name="titile"
                                  value={
                                    step1Data["description"]
                                      ? step1Data["description"]
                                      : "No description was provided..."
                                  }
                                ></Controls.Input>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Controls.Paper>
                  </Grid>

                  <Grid item xs={12} sm={10} md={8}>
                    <Controls.Paper>
                      <Grid
                        container
                        style={{ position: "relative" }}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography variant="h6">Selected Images</Typography>
                        <Controls.ActionButton
                          color="default"
                          onClick={() => setActiveStep(1)}
                          style={{
                            fontSize: 25,
                            position: "absolute",
                            right: 20,
                          }}
                        >
                          <EditIcon color="primary" />
                        </Controls.ActionButton>
                      </Grid>
                      <Controls.Paper>
                        <Grid container spacing={2}>
                          {[1, 2, 3].map((i) => {
                            if (selectedImages.length - i >= 0) {
                              return (
                                <Grid item xs={4}>
                                  <ImageCard
                                    index={i - 1}
                                    cardData={selectedImages[i - 1]}
                                  />
                                </Grid>
                              );
                            } else {
                              return (
                                <Grid index={i - 1} item xs={4}>
                                  <DummyImage />
                                </Grid>
                              );
                            }
                          })}
                        </Grid>
                      </Controls.Paper>
                    </Controls.Paper>
                  </Grid>

                  <Grid item xs={12} md={10}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Controls.Paper>
                          <Typography variant="h6">
                            Agreement Section
                          </Typography>
                          {/* <Grid container>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 10,
                              }}
                            >
                              <Controls.Checkbox />
                              <Typography align="left" variant="subtitle2">
                                You will not be allowed to edit or delete a
                                product or service post once it is submitted.
                              </Typography>
                            </div>
                          </Grid> */}
                          <Grid container>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 10,
                              }}
                            >
                              <Controls.Checkbox
                                onChange={(e) => setAgreeTerms(!agreeTerms)}
                                checked={agreeTerms}
                              />
                              <Typography align="left" variant="subtitle2">
                                You will agree to follow the{" "}
                                <a target="_blank" href="/TermsOfService">
                                  Terms & Conditions{" "}
                                </a>{" "}
                                and refrain from adding any sort of
                                inapprpriate, plagarized or invalid details.
                              </Typography>
                            </div>
                          </Grid>
                          <Grid
                            container
                            justifyContent="flex-end"
                            style={{ marginTop: 20 }}
                          >
                            <Controls.Button
                              style={{ marginRight: 10 }}
                              onClick={handleBack}
                            >
                              <ArrowBackIosIcon /> Back
                            </Controls.Button>
                            <Controls.Button
                              disabled={agreeTerms ? false : true}
                              onClick={addPost}
                            >
                              Finish <ArrowForwardIosIcon />
                            </Controls.Button>
                          </Grid>
                        </Controls.Paper>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Controls.Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default function AddProduct(props) {
  const initialPostData = {
    title: "",
    type: "",
    category: "",
    subCategory: "",
    categoryName: "",
    producedYear: "",
    brand: "",
    brandName: "",
    description: "",
  };

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const [step1Data, setStep1Data] = useState(initialPostData);
  const [selectedImages, setSelectedImages] = useState([]);
  const [newPostId, setNewPostId] = useState(undefined);

  // useEffect( ()=>{
  //     if(userData){
  //         if(userData.isLoggedIn == false){
  //             history.push("/login")
  //         }
  //     }
  // },[userData])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Header userData={userData} setUserData={setUserData}></Header>
      <Grid
        container
        alignItems="flex-start"
        className={`${classes.addProductWrapper} content`}
      >
        <Grid container alignItems="flex-start" justifyContent="center">
          <Typography variant="h4" component="div">
            Add Your Post to better recommendation
          </Typography>
          <Grid container justifyContent="center" alignItems="center">
            <Stepper
              className={classes.stepper}
              activeStep={activeStep}
              alternativeLabel
            >
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={index}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
          <Grid container>
            {activeStep === 0 ? (
              <>
                <Step1
                  step1Data={step1Data}
                  setStep1Data={setStep1Data}
                  handleNext={handleNext}
                />
              </>
            ) : null}

            {activeStep === 1 ? (
              <>
                <Step2
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              </>
            ) : null}

            {activeStep === 2 ? (
              <>
                <Step3
                  setStep1Data={setStep1Data}
                  setSelectedImages={setSelectedImages}
                  userData={userData}
                  selectedImages={selectedImages}
                  step1Data={step1Data}
                  handleNext={handleNext}
                  handleBack={handleBack}
                  setActiveStep={setActiveStep}
                  setNewPostId={setNewPostId}
                />
              </>
            ) : null}

            {activeStep === 3 ? (
              <>
                <Grid
                  container
                  justifyContent="center"
                  style={{ marginBottom: 30 }}
                >
                  <Grid item xs={6}>
                    <img
                      src={CompleteImage}
                      style={{ width: 100, height: 100 }}
                    />
                    <Typography variant="h4">
                      Post Published Successfully.
                    </Typography>
                    <Link
                      to={{ pathname: `/product/view/${newPostId}` }}
                      style={{ textDecoration: "none" }}
                    >
                      <Controls.Button style={{ marginTop: 20 }}>
                        View Your Post
                      </Controls.Button>
                    </Link>
                  </Grid>
                </Grid>
              </>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      <Footer></Footer>
    </>
  );
}
