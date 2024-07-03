import { BLOGS } from "../actions/utilities";

const INITIAL_STATE = {
  getAllBlogLoading: false,
  getAllBlogSuccess: false,
  getAllBlogFailure: false,
  getAllBlogError: null,
  blogList: [
    {
      id: 1,
      userName: "Jhon",
      userID: "UM-5456",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Lorem Ipsum is simply dummy text of the printing",
      Status: "Delivered",
      view: "",
    },
    {
      id: 2,
      userName: "Jhon",
      userID: "UM-5456",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Lorem Ipsum is simply dummy text of the printing",
      Status: "Delivered",
      view: "",
    },
    {
      id: 3,
      userName: "Jhon",
      userID: "UM-5456",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Lorem Ipsum is simply dummy text of the printing",
      Status: "Delivered",
      view: "",
    },
    {
      id: 4,
      userName: "Jhon",
      userID: "UM-5456",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Lorem Ipsum is simply dummy text of the printing",
      Status: "Delivered",
      view: "",
    },
    {
      id: 5,
      userName: "Jhon",
      userID: "UM-5456",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Lorem Ipsum is simply dummy text of the printing",
      Status: "Delivered",
      view: "",
    },
    {
      id: 6,
      userName: "Jhon",
      userID: "UM-5456",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Lorem Ipsum is simply dummy text of the printing",
      Status: "Delivered",
      view: "",
    },
    {
      id: 7,
      userName: "Jhon",
      userID: "UM-5456",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Lorem Ipsum is simply dummy text of the printing",
      Status: "Delivered",
      view: "",
    },
    {
      id: 8,
      userName: "Jhon",
      userID: "UM-5456",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Lorem Ipsum is simply dummy text of the printing",
      Status: "Delivered",
      view: "",
    },
    {
      id: 9,
      userName: "Jhon",
      userID: "UM-5456",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Lorem Ipsum is simply dummy text of the printing",
      Status: "Delivered",
      view: "",
    },
    {
      id: 10,
      userName: "Jhon",
      userID: "UM-5456",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Lorem Ipsum is simply dummy text of the printing",
      Status: "Delivered",
      view: "",
    },
    {
      id: 11,
      userName: "Jhon",
      userID: "UM-5456",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Lorem Ipsum is simply dummy text of the printing",
      Status: "Delivered",
      view: "",
    },
  ],
  requestBlogLoading: false,
  requestBlogSuccess: false,
  requestBlogFailure: false,
  requestBlogError: null,
  requestBlog: [],

  getRequestedBlogLoading: false,
  getRequestedBlogSuccess: false,
  getRequestedBlogFailure: false,
  getRequestedBlogError: null,
  getRequestedBlog: [
    {
      id: 1,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Requested",
      view: "",
    },
    {
      id: 2,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Requested",
      view: "",
    },
    {
      id: 3,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Requested",
      view: "",
    },
    {
      id: 4,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Requested",
      view: "",
    },
    {
      id: 5,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Requested",
      view: "",
    },
    {
      id: 6,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Requested",
      view: "",
    },
    {
      id: 7,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Requested",
      view: "",
    },
    {
      id: 8,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Requested",
      view: "",
    },
    {
      id: 9,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Requested",
      view: "",
    },
    {
      id: 10,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Requested",
      view: "",
    },
    {
      id: 11,
      blogType: "Sports",
      blogTitle: "Sports AI",
      email: "John@abc.com",
      requestedDate: "10/02/2023",
      description: "Health and Fintess",
      Status: "Requested",
      view: "",
    },
  ],
};
export const blogsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BLOGS.GET_ALL_BLOG_LOADING:
      return {
        ...state,
        getAllBlogLoading: true,
        getAllBlogSuccess: false,
        getAllBlogFailure: false,
        getAllBlogError: null,
      };
    case BLOGS.GET_ALL_BLOG_SUCCESS:
       
      return {
        ...state,
        getAllBlogLoading: false,
        getAllBlogSuccess: true,
        getAllBlogFailure: false,
        getAllBlogError: null,
        blogList: action.payload,
      };
    case BLOGS.GET_ALL_BLOG_FAILURE:
      return {
        ...state,
        getAllBlogLoading: false,
        getAllBlogSuccess: false,
        getAllBlogFailure: true,
        getAllBlogError: action.payload,
      };

    case BLOGS.REQUEST_BLOG_LOADING:
      return {
        ...state,
        requestBlogLoading: true,
        requestBlogSuccess: false,
        requestBlogFailure: false,
        requestBlogError: null,
      };
    case BLOGS.REQUEST_BLOG_SUCCESS:
      return {
        ...state,
        requestBlogLoading: false,
        requestBlogSuccess: true,
        requestBlogFailure: false,
        requestBlogError: null,
        requestBlog: action.payload,
      };
    case BLOGS.REQUEST_BLOG_FAILURE:
      return {
        ...state,
        requestBlogLoading: false,
        requestBlogSuccess: false,
        requestBlogFailure: true,
        requestBlogError: action.payload,
      };

    case BLOGS.GET_REQUESTED_BLOG_LOADING:
      return {
        ...state,
        getRequestedBlogLoading: true,
        getRequestedBlogSuccess: false,
        getRequestedBlogFailure: false,
        getRequestedBlogError: null,
      };
    case BLOGS.GET_REQUESTED_BLOG_SUCCESS:
      return {
        ...state,
        getRequestedBlogLoading: false,
        getRequestedBlogSuccess: true,
        getRequestedBlogFailure: false,
        getRequestedBlogError: null,
        getRequestedBlog: action.payload,
      };
    case BLOGS.GET_REQUESTED_BLOG_FAILURE:
      return {
        ...state,
        getRequestedBlogLoading: false,
        getRequestedBlogSuccess: false,
        getRequestedBlogFailure: true,
        getRequestedBlogError: action.payload,
      };
    default:
      return state;
  }
};
