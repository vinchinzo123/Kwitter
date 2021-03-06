import axios from "axios";

class API {
  axiosInstance = null;

  constructor() {
    /* 
      🚨1 point EXTRA CREDIT 🚨 👉🏿 get the baseURL from the environment
      https://create-react-app.dev/docs/adding-custom-environment-variables/
    */
    const axiosInstance = axios.create({
      baseURL: "https://kwitter-api.herokuapp.com/",
      timeout: 30000,
      headers: { Authorization: `Bearer ${getToken()}` },
    });

    // Add a request interceptor to attach a
    axiosInstance.interceptors.request.use(
      (config) => ({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    axiosInstance.interceptors.response.use(
      ({ data }) => data,
      (error) => Promise.reject(error)
    );

    this.axiosInstance = axiosInstance;
  }

  ////////////////   Create a new user template

  async createUser(user) {
    try {
      const result = await this.axiosInstance.post("/users", user);
      return result;
    } catch (err) {
      helpMeInstructor(err);
      return err;
    }
  }

  async deleteUser(user) {
    try {
      const result = await this.axiosInstance.delete(`/users/${user}`);
      return result;
    } catch (err) {
      helpMeInstructor(err);
      return err;
    }
  }

  async login({ username, password }) {
    try {
      const result = await this.axiosInstance.post("/auth/login", {
        username,
        password,
      });
      return result;
    } catch (err) {
      // Instructor is logging you out because this failed
      helpMeInstructor(err);
      return err;
    }
  }

  async logout() {
    try {
      await this.axiosInstance.get("/auth/logout");
    } catch (err) {
      helpMeInstructor(err);
      return err;
    }
  }

  ////////////////    get a user template

  async getUser(username) {
    try {
      const result = await this.axiosInstance.get(`/users/${username}`);
      return result;
    } catch (err) {
      helpMeInstructor(err);
      return err;
    }
  }

  ////////////////   update a get user list template
  async getUserList(number) {
    try {
      const result = await this.axiosInstance.get(
        `/users?limit=${number}&offset=0`
      );
      return result;
    } catch (err) {
      helpMeInstructor(err);
      return err;
    }
  }
  ////////////////   update a user template
  async updateUser(user) {
    try {
      const result = await this.axiosInstance.patch(
        `/users/${user.username}`,
        user.requestBody
      );
      return result;
    } catch (err) {
      helpMeInstructor(err);
      return err;
    }
  }

  async getUserPicture(username) {
    try {
      await this.axiosInstance.get(`/users/${username}/picture`);
      return true;
    } catch (err) {
      helpMeInstructor(err);
      return false;
    }
  }

  async putUserPicture({ userPicture, username }) {
    try {
      const result = await this.axiosInstance.put(
        `/users/${username}/picture`,
        userPicture
      );
      return result;
    } catch (err) {
      helpMeInstructor(err);
    }
  }

  ////////////////   Create a message template

  async createMessage(text) {
    try {
      const result = await this.axiosInstance.post("/messages", text);
      return result;
    } catch (err) {
      helpMeInstructor(err);
      return err;
    }
  }

  ////////////////   get a message template

  async getMessages(number) {
    try {
      const result = await this.axiosInstance.get(
        `/messages?limit=${number}&offset=0`
      );
      return result;
    } catch (err) {
      helpMeInstructor(err);
      return err;
    }
  }

  ////////////////   delete a message template

  async deleteMessage(messageId) {
    try {
      let result = await this.axiosInstance.delete(`/messages/${messageId}`);
      return result;
    } catch (err) {
      helpMeInstructor(err);
      return err;
    }
  }

  ////////////////   add a like template

  async addLike(likeId) {
    try {
      let result = await this.axiosInstance.post("/likes", likeId);
      return result;
    } catch (err) {
      helpMeInstructor(err);
      return err;
    }
  }

  ////////////////   remove a like template

  async removeLike(likeId) {
    try {
      let result = await this.axiosInstance.delete(`/likes/${likeId}`);
      return result;
    } catch (err) {
      helpMeInstructor(err);
      return err;
    }
  }
}

// WARNING.. do not touch below this line if you want to have a good day =]

function helpMeInstructor(err) {
  console.info(
    `
    Did you hit CORRECT the endpoint?
    Did you send the CORRECT data?
    Did you make the CORRECT kind of request [GET/POST/PATCH/DELETE]?
    Check the Kwitter docs 👉🏿 https://kwitter-api.herokuapp.com/docs/#/
    Check the Axios docs 👉🏿 https://github.com/axios/axios
    TODO: troll students
  `,
    err
  );
}

function getToken() {
  try {
    const storedState = JSON.parse(localStorage.getItem("persist:root"));
    return JSON.parse(storedState.auth).isAuthenticated;
  } catch {
    return "";
  }
}

export default new API();
