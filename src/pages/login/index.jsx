import React, { useCallback, useEffect, useState } from "react";
import {
  LoginSocialGoogle,
  LoginSocialAmazon,
  LoginSocialFacebook,
  LoginSocialGithub,
  LoginSocialInstagram,
  // LoginSocialLinkedin,
  LoginSocialMicrosoft,
  LoginSocialPinterest,
  LoginSocialTwitter,
  LoginSocialApple,
  IResolveParams,
} from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  GithubLoginButton,
  AmazonLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
  MicrosoftLoginButton,
  TwitterLoginButton,
  AppleLoginButton,
} from "react-social-login-buttons";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import IMAGES from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { CgEyeAlt } from "react-icons/cg";
import { PulseLoader } from "react-spinners";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { FieldError } from "../../components/errorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../utils/path";
import { Notification } from "../../components/genericActions";
import { LoginUserAction } from "../../redux/actions/userAction";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = useSelector((state) => state?.user);
  //  const editorConfiguration = {
  //   toolbar: {
  //     items: [
  //       "heading",
  //       "|",
  //       "bold",
  //       "italic",
  //       "|",
  //       "bulletedList",
  //       "numberedList",
  //       "|",
  //       "insertTable",
  //       "|",
  //       "uploadImage",
  //       "blockQuote",
  //       "|",
  //       "undo",
  //       "redo",
  //     ],
  //   },
  //   image: {
  //     toolbar: [
  //       "imageStyle:full",
  //       "imageStyle:side",

  //       "|",
  //       "imageTextAlternative",
  //     ],
  //   },
  //   table: {
  //     contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  //   },
  //   language: "en",
  //   };

  const dispatch = useDispatch();
  const onSuccess = async (res) => {

    localStorage.setItem("pms_user", JSON.stringify(res));
    res?.userRole === "Admin"
      ? navigate(PATH.DASHBOARD)
      : res?.userRole === "TeamLead"
        ? navigate(PATH.TEAM_LEAD_DASHBOARD)
        : res?.userRole === "Resource"
          ? navigate(PATH.RESOURCE_DASHBOARD)
          : res?.userRole === "ProjectManager"
            ? navigate(PATH.RESOURCE_DASHBOARD)
            : res?.userRole === "HumanResource" ? navigate(PATH.ALL_QUERY_REQUESTS) : navigate(PATH.LOGIN);
  };
  function onSubmit(data) {
    dispatch(LoginUserAction(data, onSuccess, Notification));

    // if (
    //   initial_state.admin.includes(data.email) &&
    //   initial_state.admin.includes(data.password)
    // ) {
    //   let data = { userType: "Admin" };

    //   data = { ...data, token: "token" };
    //   setCookies("pms_user", data);
    //   if (data) {
    //     navigate(PATH.DASHBOARD);
    //   }
    // } else if (
    //   initial_state.user.includes(data.email) &&
    //   initial_state.admin.includes(data.password)
    // ) {
    //   let data = { userType: "User" };
    //   data = { ...data, token: "token" };
    //   setCookies("pms_user", data);
    //   if (data) {
    //     navigate(PATH.USER_DASHBOARD);
    //   }
    // } else {
    //   Notification("Invalid Email or Password", "error");
    // }
  }
  const MY_DATA_ARRAY = [200, 110, 20, 30, 40, 50, 60]
  const MY_DATA_ARRAY2 = [70, 80, 90, 100]
  let MY_DATA_ARRAY3 = []

  const [findValue, setFindValue] = useState()
  const handleSorting = () => {
    for (let i = 0; i < MY_DATA_ARRAY.length; i++) {
      if (MY_DATA_ARRAY[i] > MY_DATA_ARRAY[i + 1]) {
        let temp = MY_DATA_ARRAY[i + 1]
        MY_DATA_ARRAY[i + 1] = MY_DATA_ARRAY[i]
        MY_DATA_ARRAY[i] = temp
      }
      ("MY_DATA_ARRAY3 ", MY_DATA_ARRAY)

    }
  }

 
  useEffect(() => {
    handleSorting()
    // handleMergeArrays()
  }, [])
  const [editor, setEditor] = useState(null);

  const handleImageUpload = async (file) => {
    try {
      // Simulate image upload (replace this with your actual upload logic)
      const imageUrl = await uploadImageToServer(file);
      // Insert the image into CKEditor
      editor.model.change((writer) => {
        const imageElement = writer.createElement('image', {
          src: imageUrl,
        });
        editor.model.insertContent(imageElement, editor.model.document.selection);
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const uploadImageToServer = async (file) => {
    return new Promise((resolve, reject) => {
      // Simulate server upload (replace this with your actual upload logic)
      setTimeout(() => {
        const imageUrl = 'https://via.placeholder.com/150'; // Replace with actual image URL
        resolve(imageUrl);
      }, 2000); // Simulating 2 seconds delay for upload
    });
  };
  return (
    <div class="login-component">
      <Row className=" h-100 m-0">
        <Col sm={12} md={6} lg={6} xl={6} className="p-0 bg-white">
          <div className="">
            <div className="login-page">
              <img
                src={IMAGES.ADMIN_IMAGE}
                alt="HEAlogo"
                className="img-fluid"
              />

            </div>
          </div>
        </Col>
        <Col
          sm={12}
          md={6}
          lg={6}
          xl={6}
          className="d-flex align-items-center py-4"
        >
          <div className="login-content">
            <Card className="border-0">
              <Card.Body>
                <Form className="p-3" onSubmit={handleSubmit(onSubmit)}>
                  <div className="login-heading">Sign In</div>

                  <Form.Group className="mb-3 ">
                    <Form.Label className="label-primary">Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      size="sm"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <FieldError message={"This Field is Required"} />
                    )}
                  </Form.Group>
                  <Form.Group
                    className=" position-relative"
                    controlId="formBasicPassword"
                  >
                    <Form.Label className="label-primary">Password</Form.Label>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      // value={"Password@2"}
                      size="sm"
                      name="password"
                      {...register("password", { required: true })}
                    />
                    <div onClick={handleClickShowPassword} className="eye-icon">
                      {showPassword ? <CgEyeAlt /> : <AiFillEyeInvisible />}
                    </div>
                  </Form.Group>
                  {errors.password && (
                    <FieldError message={"This Field is Required"} />
                  )}
                  <Button className="w-100 py-2 mt-4" type="submit" disabled={user?.userLoginLoading}>
                    {user?.userLoginLoading ? <PulseLoader color="#39b6fe" size={5} /> : "Login"}
                  </Button>
                </Form>

              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}
{/* <GitHubLoginComponent />
                <MicrosoftLoginButtonData /> */}
const MicrosoftLoginButtonData = () => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();

  const onLoginStart = useCallback(() => {
  }, []);

  const onLogout = useCallback(() => { }, []);
  const fetchMicrosoftUserInfo = async (accessToken) => {
    try {
      // Replace the following with the actual API endpoint to fetch Microsoft user info
      const response = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setProfile(userData);
      } else {
        console.error(
          "Error fetching Microsoft user info:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching Microsoft user info:", error);
    }
  };
  return (
    <LoginSocialMicrosoft
      client_id="3c775eee-b0a8-4de9-a600-12918652bed6"
      redirect_uri="http://localhost:3000/"
      onLoginStart={onLoginStart}
      onResolve={({ provider, data }) => {
        setProvider(provider);
        setProfile(data);
        fetchMicrosoftUserInfo(data.access_token);
      }}
      onReject={(err) => {
      }}
      scope="user.read"
    >
      <MicrosoftLoginButton />
    </LoginSocialMicrosoft>
  );
};
const GitHubLoginComponent = () => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState();

  const onResolveHandler = ({ provider, data }) => {
    // Here, 'data' contains the user information, including the access token
    ;
    // Set the provider and user profile in your state
    setProvider(provider);
    setProfile(data);

    // Now you can use the access token to fetch additional user information
    // For example, you can make a request to the GitHub API
    fetchGithubUserInfo(data.access_token);
  };

  const fetchGithubUserInfo = async (accessToken) => {
    ;
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();

        // Extract the user's name and profile picture from the userData object
        const userName = userData.name;
        const userProfilePic = userData.avatar_url;

        // Do something with the user information (e.g., update UI)
       
      } else {
        console.error("Error fetching user info from GitHub:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  return (
    <LoginSocialGithub
      clientId="162003d23285a9fab066"
      redirectUri={"https://pms.xeventechnologies.com/"}
      onResolve={onResolveHandler}
      onFailure={(error) => console.error("GitHub login failed:", error)}
    >
      <GithubLoginButton />
    </LoginSocialGithub>
  );
};
