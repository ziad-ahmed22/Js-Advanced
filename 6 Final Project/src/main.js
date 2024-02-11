const postsContainer = document.getElementById("posts-container");

const api = axios.create({
  baseURL: "https://tarmeezacademy.com/api/v1",
});

// Handel Nav Btns
setNavUI();

// Get User Info From Storage
getUserInfo();

// Login
document
  .querySelector('.login-form input[type="submit"]')
  .addEventListener("click", LoginHandler);

// Logout
document.getElementById("logout").addEventListener("click", () => {
  logOut();
  setNavUI();
});

// Register
document
  .querySelector('.register-form input[type="submit"]')
  .addEventListener("click", registerHandler);

// Create Post
document
  .querySelector('.addPost-form input[type="submit"]')
  .addEventListener("click", createPostHandler);

// Get Posts
const postsLimit = 5;
getPosts();

// Infinite Scroll
let currentPage = 1;
let lastPage = 1;
window.addEventListener("scroll", () => {
  // window.innerHeight + window.scrollY === document.body.offsetHeight
  const endOfPage =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
  if (endOfPage && currentPage < lastPage) {
    currentPage++;
    getPosts(currentPage);
  }
});

// Functions Area
function getPosts(currentPage = 1) {
  showLoading(true);
  api
    .get(`/posts?limit=${postsLimit}&page=${currentPage}`)
    .then((res) => {
      const posts = res.data.data;
      showPosts(posts);
      lastPage = res.data.meta.last_page;
      showLoading(false);
    })
    .catch((err) => showError(err));
}

function showPosts(posts) {
  // postsContainer.innerHTML = "";
  for (item of posts) {
    postsContainer.innerHTML += post(item);
  }
}

function post(postItem) {
  return `
    <div class="post mb-4 shadow-sm">
      <div class="card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <div>
          ${
            typeof postItem.author.profile_image == "string"
              ? ` <img
              class="border border-4 border-white rounded-circle me-1"
              src=${postItem.author.profile_image}
              style="width: 45px; height: 45px"
              alt="Avatar"
            />`
              : `<img
              class="border border-4 border-white rounded-circle me-1"
              src="images/avatar.png"
              style="width: 45px; height: 45px"
              alt="Avatar"
            />`
          }

            <b>${postItem.author.name}</b>
          </div>
          <small class="text-secondary">${postItem.created_at}</small>
        </div>

        <div class="card-body" style="cursor:pointer"
        data-bs-toggle="modal" data-bs-target="#postDetailsModal"
        onclick="getPost(${postItem.id})">
        ${
          typeof postItem.image == "string"
            ? ` <img
            src=${postItem.image}
            alt="post-image"
            style="max-height: 300px; object-fit: cover"
            class="w-100"
          />`
            : ` `
        }

          <h5 class="mt-3">${postItem.title ? postItem.title : ""}</h5>
          <p>
          ${postItem.body}
          </p>
          <div class="border-top pt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pen"
              viewBox="0 0 16 16"
            >
              <path
                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
              />
            </svg>
            <span class="mx-2">${postItem.comments_count} Comments</span>
          </div>
        </div>
      </div>
    </div>
    `;
}

function showError(err) {
  postsContainer.innerHTML = `<h3 class="text-danger text-center">
  ${err.response.data?.message || err.message}
  </h3>`;
}

function showLoading(show) {
  if (show) {
    document.querySelector(".loading").innerHTML = `<h3>Loading...</h3>`;
  } else {
    document.querySelector(".loading").innerHTML = "";
  }
}

function LoginHandler(e) {
  e.preventDefault();
  const username = document.querySelector('.login-form input[type="text"]');
  const password = document.querySelector('.login-form input[type="password"]');
  const params = { username: username.value, password: password.value };

  api
    .post("/login", params)
    .then((res) => {
      username.value = "";
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // hide login modal
      const modal = document.getElementById("loginModal");
      bootstrap.Modal.getInstance(modal).hide();

      setNavUI();
      getUserInfo();
      alert("Login Succefullely");
    })
    .catch((err) => {
      alert(err.response.data?.message);
    })
    .finally(() => {
      password.value = "";
    });
}

function setNavUI() {
  const registerBtn = document.getElementById("register");
  const loginBtn = document.getElementById("login");
  const logoutBtn = document.getElementById("logout");
  const addPostBtn = document.getElementById("add-post-container");
  const userInfoDiv = document.getElementById("user-info");

  if (localStorage.getItem("token") === null) {
    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";
    registerBtn.style.display = "block";
    addPostBtn.style.display = "none";
    userInfoDiv.setAttribute("style", "display: none !important");
  } else {
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
    registerBtn.style.display = "none";
    addPostBtn.style.display = "block";
    userInfoDiv.setAttribute("style", "display: flex !important");
  }
}

function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

function registerHandler(e) {
  e.preventDefault();
  const name = document.getElementById("reg-name");
  const username = document.getElementById("reg-username");
  const password = document.getElementById("reg-password");
  const image = document.getElementById("reg-image");

  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("username", username.value);
  formData.append("password", password.value);
  formData.append("image", image.files[0]);

  if (!image.files[0]) {
    alert("The Image Is Required");
  } else {
    api
      .post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // hide register modal
        const modal = document.getElementById("registerModal");
        bootstrap.Modal.getInstance(modal).hide();

        // show login modal
        const loginModal = document.getElementById("loginModal");
        bootstrap.Modal.getInstance(loginModal).show();

        alert("Registration Succefullely");

        name.value = "";
        username.value = "";
        password.value = "";
      })
      .catch((err) => {
        alert(err.response.data?.message);
      });
  }
}

function createPostHandler(e) {
  e.preventDefault();
  const content = document.querySelector(".addPost-form textarea");
  const image = document.querySelector(".addPost-form [type='file']");

  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("body", content.value);
  formData.append("image", image.files[0]);

  const config = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  if (content.value.trim().length === 0) {
    alert("Please Write Something");
  } else if (!image.files[0]) {
    alert("Please Add An Image");
  } else {
    api
      .post("/posts", formData, config)
      .then((res) => {
        alert("Post Added Succefullely");
        content.value = "";
        const modal = document.getElementById("addPostModal");
        bootstrap.Modal.getInstance(modal).hide();
        getPosts();
      })
      .catch((err) => {
        alert(err.response.data?.message);
      });
  }
}

function getUserInfo() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const name = userData?.name;
  const image = userData?.profile_image;

  document.querySelector("#user-name").innerHTML = name;
  if (typeof image === "string") {
    document.querySelector("#user-image").src = image;
  }
}

function getPost(postId) {
  api
    .get(`/posts/${postId}`)
    .then((res) => showPost(res.data.data))
    .catch((err) => console.log(err));
}

function showPost(postData) {
  modalBody = document.querySelector(".post-details-modal .modal-body");
  modalBody.innerHTML = postDetails(postData);
}

function postDetails(post) {
  const author = post.author;
  const comments = post.comments;
  // if (comments.length) {
  //   showComments(comments);
  // }
  // console.log(comments);
  return `
  <div class="post">
  <div class="card border-0">
    <div class="card-body">
      <div
        class="mb-2 d-flex justify-content-between align-items-center"
      >
        <div>
        ${
          typeof author.profile_image == "string"
            ? `
          <img
            class="border border-4 border-white rounded-circle me-1"
            src=${author.profile_image}
            style="width: 45px; height: 45px"
            alt="Avatar"
          />`
            : `
          <img
            class="border border-4 border-white rounded-circle me-1"
            src="./images/avatar.png"
            style="width: 45px; height: 45px"
            alt="Avatar"
          />`
        }
          <b>${post.author.name}</b>
        </div>
        <small class="text-secondary">${post.created_at}</small>
      </div>
      ${
        typeof post.image == "string"
          ? `
        <img
          src=${post.image}
          alt="post-image"
          style="max-height: 400px; object-fit: cover"
          class="w-100"
        />
        `
          : ``
      }
      <p class="mt-3">
       ${post.body}
      </p>
      <div class="border-top text-end pt-2">
        <span class="mx-2">${post.comments_count} Comments</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-pen"
          viewBox="0 0 16 16"
        >
          <path
            d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
          />
        </svg>
      </div>

      <div class="Comments mt-3">
        ${comments.length > 0 ? showComments(comments) : ""}
        </div>
      </div>

      <form class="write-comment">
        <div class="d-flex mt-2 justify-content-between">
          <input
            class="p-2 border-1 border-primary rounded"
            style="outline: none; width: 80%"
            type="text"
            placeholder="Write A Comment"
          />
          <input
            class="p-2 btn btn-primary"
            style="outline: none; width: 19%"
            type="submit"
            value="Add"
            placeholder="Add"
          />
        </div>
      </form>
    </div>
  </div>
</div>
  `;
}

function showComments(comments) {
  for (let com of comments) {
    return showComment(com);
  }
}

function showComment(comment) {
  console.log(comment);
  return `
  <div class="comment border-top py-2 d-flex">
    ${
      typeof comment.author.profile_image == "string"
        ? `
        <img
          class="border border-4 border-white rounded-circle me-1"
          src=${comment.author.profile_image}
          style="width: 45px; height: 45px"
          alt="Avatar"
        />
          `
        : `
      <img
        class="border border-4 border-white rounded-circle me-1"
        src="./images/avatar.png"
        style="width: 45px; height: 45px"
        alt="Avatar"
      />
      `
    }

      <div class="ms-2">
        <b>${comment.author.username}</b>
        <p>${comment.body}</p>
      </div>
  `;
}
