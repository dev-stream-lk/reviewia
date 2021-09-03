import {
  Box,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import { CallReceived } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import Controls from "../components/Controls";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useForm, Form } from "../components/useForm";
import Phone from "../static/img/j7.jpg";
import Rating from "@material-ui/lab/Rating";
import AddIcon from "@material-ui/icons/Add";
import { Skeleton } from "@material-ui/lab";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CompleteImage from "../static/img/complete.png";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { initialUserData, UserContext } from "../context/UserContext";
import { getCategoryWithSubCategory } from "../services/category";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {requiredField} from '../components/Validators'

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
}));

function getSteps() {
  return ["Basic Details", "Upload Images", "Preview", "Finished"];
}

const SimillarProductCard = (props) => {
  const classes = useStyles();
  let { value = 4.75 } = props;

  return (
    <Controls.Card className={classes.similarProductCard}>
      <CardHeader title="Samsung J7 nxt" subheader="34 Aug, 2021"></CardHeader>
      <CardMedia title="Samsung Galaxy j7 Nxt">
        <img src={Phone} />
      </CardMedia>
      <CardContent>
        <Rating
          name="phone"
          value={value}
          precision={0.25}
          getLabelText={(val) => `${val} Heart${val !== 1 ? "s" : ""}`}
          readOnly
        />
        <Box>{value}</Box>
      </CardContent>
      <CardActions></CardActions>
    </Controls.Card>
  );
};

const Step1 = (props) => {
  const classes = useStyles();
  const { step1Data, setStep1Data, handleNext } = props;

  const validate = (fieldValues= step1Data) => {
      let temp = {}
  
      if('title' in fieldValues)
        temp.title = requiredField(fieldValues.title);
      if('type' in fieldValues)
        temp.type = requiredField(fieldValues.type);
      if('category' in fieldValues)
        temp.category = requiredField(fieldValues.category);
      if('subCategory' in fieldValues)
        temp.subCategory = requiredField(fieldValues.subCategory);
      if('brand' in fieldValues)
        temp.brand = requiredField(fieldValues.brand);
  
      setErrors({
          ...errors,
          ...temp
      })
  
      return Object.values(temp).every(x=> x=="");
  }

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(step1Data,true,validate);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // get all categories, subCategories and brands only one time
  useEffect(async () => {
    if (values.type != "") {
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
          products.push({
            id: data.services[i].categoryId,
            title: data.services[i].categoryName,
            subCategories: data.services[i].subCategoryList,
          });
        }

        setCategories({ products, services });
      }
    }
  }, []);

  // call when product type changed
  useEffect(() => {
    setValues({
      ...values,
      category: "",
      subCategory: "",
      brand: "",
    });
    setSubCategories([]);
  }, [values.type]);

  // call when category changed
  useEffect(() => {
    setValues({
      ...values,
      subCategory: "",
      brand: "",
    });
    // TODO: setBrands([])
    if (values.category != "") {
      let type = values.type == "p" ? "products" : "services";
      categories[`${type}`].forEach((item, index) => {
        if (values.category == item.id) {
          let subCategories = [];
          for (let i in item.subCategories) {
            console.log(item.subCategories);
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
  }, [values.category]);

  // call when subCategory changed
  useEffect(() => {
    setValues({
      ...values,
      brand: "",
    });
    if (values.subCategory != "") {
      subCategories.forEach((item, index) => {
        if (values.subCategory == item.id) {
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
  }, [values.subCategory]);

  // set form data to global scope
  const handleStep1Next = (e) => {
    setStep1Data(values);
    handleNext(e);
  };

  return (
    <>
      <Grid container className={classes.steps}>
        <Grid item xs={12}>
          <Form className={classes.stepForms}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Controls.Paper>
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
                            ? values.type == "p"
                              ? categories.products.length != 0
                                ? categories.products
                                : [{ id: "none", title: "Not Found" }]
                              : categories.services.length != 0
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
                        value={values.subCategory}
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
                    <Grid container alignItems="center">
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
                      <Controls.Button text="Next" onClick={handleStep1Next}>
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
          <Controls.Paper>
            <Grid container spacing={2}>
              <Grid container justifyContent="center">
                <Typography variant="h4" component="div">
                  Similar Products/Services
                </Typography>
              </Grid>
              <Grid item xs={6} sm={4} lg={3}>
                <SimillarProductCard />
              </Grid>
              <Grid item xs={6} sm={4} lg={3}>
                <SimillarProductCard />
              </Grid>
              <Grid item xs={6} sm={4} lg={3}>
                <SimillarProductCard />
              </Grid>
              <Grid item xs={6} sm={4} lg={3}>
                <SimillarProductCard />
              </Grid>
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
              Image
            </Skeleton>
          </Grid>
        </CardMedia>
        <CardContent>
          <Grid container justifyContent="center">
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
          </Grid>
        </CardContent>
      </Controls.Card>
    </>
  );
};

const ImageCard = (props) => {
  const classes = useStyles();
  const { cardData,removeImage, index } = props;

  return (
    <Controls.Card style={{ paddingTop: 10 }}>
      <CardMedia>
        { removeImage ? (
            <IconButton color="secondary" onClick={ e => removeImage(index)} >
              <HighlightOffIcon/>
            </IconButton>
          ): null
        }
        <Grid container justifyContent="center">
          
          <img
            src={URL.createObjectURL(cardData.imageObj)}
            className={classes.uploadImagePreveiwImage}
          />
        </Grid>
      </CardMedia>

      <CardContent>
        <Typography variant="subtitle1">{cardData.title}</Typography>
        <Grid container justifyContent="center">
          <p>{cardData.description}</p>
        </Grid>
      </CardContent>
    </Controls.Card>
  );
};


const ImageInfo = (props) => {

  const {selectedImages, handleImageAdd} = props;
  const [localTitle, setLocalTitle] = useState("");
  const [localDescription, setLocalDescription] = useState("");

  const handleLocalImageAdd = () => {
    handleImageAdd(localTitle, localDescription);
    setLocalTitle("");
    setLocalDescription("");
  }


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
      <Grid container justifyContent="flex-end">
        <Controls.Button disabled={ selectedImages.length == 3 ? true:false} onClick={handleLocalImageAdd}>
          <AddIcon /> Add
        </Controls.Button>
      </Grid>
    </>
  )
}


const Step2 = (props) => {
  const classes = useStyles();
  const { selectedImages, setSelectedImages, handleNext, handleBack } = props;
  const [newSelectedImage, setNewSelectedImage] = useState(null);
  const [error,setError] = useState("");
  const [lastRemoved, setLastRemoved] = useState(null);

  const handleNewImage = (e) => {
    let file = e.target.files[0];
    setNewSelectedImage(file);
  };

  const handleImageAdd = (title, description) => {
    if (!newSelectedImage){
      setError("Please select image")
      return
    }
    if( error != ""){
      setError("")
    }
    let images = Array.from( selectedImages)
    images.push(
      {
        imageObj: newSelectedImage,
        title: title ? title : "New caption",
        description: description ? description : "new Description",
      }
    )
    setNewSelectedImage(null);
    setSelectedImages(
     images 
    );
  };

  const removeImage = (index) => {
    let images = selectedImages;
    let remImg = images.splice(index,1)
    setLastRemoved(remImg)
    setSelectedImages(images)
  }

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
                  { error ? (
                      <Grid container justifyContent="center">
                        <span style={{textAlign:"center", color:"red", paddingBottom:10}} >{error}</span>
                      </Grid>
                    ) : null
                  }
                  <Grid item xs={12} sm={6}>
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ImageInfo selectedImages={selectedImages} handleImageAdd={handleImageAdd} />
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
                          <ImageCard index={i-1} removeImage={removeImage} cardData={selectedImages[i - 1]} />
                        </Grid>
                      );
                    } else {
                      return (
                        <Grid index={i-1} item xs={4}>
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
                  <Controls.Button disabled={selectedImages.length === 0? true:false} onClick={handleNext}>
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
  const { step1Data, selectedImages, handleNext, handleBack } = props;

  return (
    <>
      <Grid container>
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
                      <Typography variant="h6">Basic Information</Typography>
                      <Grid container>
                        <Grid container>
                          <Grid item xs={12}>
                            <Grid container>
                              <Grid container alignItems="center">
                                <FormLabel className={classes.formLabel}>
                                  Title
                                </FormLabel>
                                <Typography>Samsung galaxy J7 Nxt</Typography>
                              </Grid>
                              <Grid container alignItems="center">
                                <FormLabel className={classes.formLabel}>
                                  Type
                                </FormLabel>
                                <Typography>Product</Typography>
                              </Grid>

                              <Grid container alignItems="center">
                                <FormLabel className={classes.formLabel}>
                                  Category
                                </FormLabel>
                                <Typography>
                                  Samsung galaxy J7 Electronics
                                </Typography>
                              </Grid>
                              <Grid container alignItems="center">
                                <FormLabel className={classes.formLabel}>
                                  Product Year
                                </FormLabel>
                                <Typography>14/07/2021</Typography>
                              </Grid>
                              <Grid container alignItems="center">
                                <FormLabel className={classes.formLabel}>
                                  Brand
                                </FormLabel>
                                <Typography>Samsung</Typography>
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
                                  value="
                                                                    NETWORK	Technology	GSM / HSPA / LTE
                                                                    LAUNCH	Announced	2017, July
                                                                    Status	Available. Released 2017, July
                                                                    BODY	Dimensions	152.4 x 78.6 x 7.6 mm (6.00 x 3.09 x 0.30 in)
                                                                    Weight	170 g (6.00 oz)
                                                                    Build	Glass front, plastic back, plastic frame
                                                                    SIM	Dual SIM (Micro-SIM, dual stand-by)
                                                                    DISPLAY	Type	Super AMOLED
                                                                    Size	5.5 inches, 83.4 cm2 (~69.6% screen-to-body ratio)
                                                                    Resolution	720 x 1280 pixels, 16:9 ratio (~267 ppi density)
                                                                    PLATFORM	OS	Android 7.0 (Nougat), upgradable to Android 9.0 (Pie), One UI
                                                                    Chipset	Exynos 7870 Octa (14 nm)
                                                                    CPU	Octa-core 1.6 GHz Cortex-A53
                                                                    GPU	Mali-T830 MP1
                                                                    MEMORY	Card slot	microSDXC (dedicated slot)
                                                                    Internal	16GB 2GB RAM, 32GB 3GB RAM
                                                                         eMMC 5.1
                                                                    MAIN CAMERA	Single	13 MP, f/1.9, 28mm (wide), AF
                                                                    Features	LED flash, panorama
                                                                    Video	1080p@30fps
                                                                    SELFIE CAMERA	Single	5 MP, f/2.2, 23mm (wide)
                                                                    Features	LED flash
                                                                    Video	
                                                                    SOUND	Loudspeaker	Yes
                                                                    3.5mm jack	Yes
                                                                    COMMS	WLAN	Wi-Fi 802.11 b/g/n, Wi-Fi Direct, hotspot
                                                                    Bluetooth	4.1, A2DP, LE
                                                                    GPS	Yes, with A-GPS, GLONASS
                                                                    NFC	No
                                                                    Radio	FM radio, RDS, recording
                                                                    USB	microUSB 2.0
                                                                    FEATURES	Sensors	Accelerometer, proximity
                                                                         ANT+
                                                                    BATTERY	Type	Li-Ion 3000 mAh, removable
                                                                    MISC	Colors	Black, Gold
                                                                    Models	SM-J701F, SM-J701F, SM-J701M, SM-J701MT
                                                                    SAR	0.61 W/kg (head)    
                                                                    SAR EU	0.52 W/kg (head)     1.39 W/kg (body)    
                                                                    "
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
                      <Typography variant="h6">Post Images</Typography>
                      <Controls.Paper>
                        <Grid container spacing={2}>
                        {[1, 2, 3].map((i) => {
                          if (selectedImages.length - i >= 0) {
                            return (
                              <Grid item xs={4}>
                                <ImageCard index={i-1} cardData={selectedImages[i - 1]} />
                              </Grid>
                            );
                          } else {
                            return (
                              <Grid index={i-1} item xs={4}>
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
                          <Grid container>
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
                          </Grid>
                          <Grid container>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 10,
                              }}
                            >
                              <Controls.Checkbox />
                              <Typography align="left" variant="subtitle2">
                                You will agree to follow the{" "}
                                <a href="">Terms & Conditions </a> and refrain
                                from adding any sort of inapprpriate, plagarized
                                or invalid details.
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
                            <Controls.Button onClick={handleNext}>
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
    type: "product",
    category: "",
    subCayegory: "",
    producedYear: "",
    brand: "",
    description: "",
  };

  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);
  const [step1Data, setSet1Data] = useState(initialPostData);
  const [selectedImages, setSelectedImages] = useState([]);

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
                  setStep1Data={setSet1Data}
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
                <Step3 selectedImages={selectedImages} step1Data={step1Data} handleNext={handleNext} handleBack={handleBack} />
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
                      to={{ pathname: "/product/view/1" }}
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
