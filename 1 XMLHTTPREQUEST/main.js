const btn = document.querySelector(".titels > div");
const titelsDiv = document.querySelector(".titels");
const contentDiv = document.querySelector(".content");

getUsers();
getPosts(1);

function getUsers() {
  titelsDiv.innerHTML = '<div class="loading">Loading...</div>';
  const request = new XMLHttpRequest();
  request.open("GET", "https://jsonplaceholder.typicode.com/users");
  request.responseType = "json";
  request.send();
  request.onload = () => {
    titelsDiv.innerHTML = "";
    showUsers(request.response);
  };
  request.onerror = () => {
    titelsDiv.innerHTML = '<div class="error">Sorry! Their Is An Error"</div>';
  };
}

function getPosts(id) {
  contentDiv.innerHTML = '<div class="loading">Loading...</div>';
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  request.responseType = "json";
  request.send();
  request.onload = () => {
    contentDiv.innerHTML = "";
    showPosts(request.response);
  };
  request.onerror = () => {
    contentDiv.innerHTML = '<div class="error">Sorry! Their Is An Error"</div>';
  };
}

function showUsers(users) {
  titelsDiv.innerHTML = "";
  for (let user of users) {
    titelsDiv.innerHTML += `
      <div onClick="handelClick(this, ${user.id})">
        <h3>${user.name}</h3>
        <p>${user.email}</p>
      </div>
    `;
  }
  titelsDiv.firstElementChild.classList.add("active");
}

function showPosts(posts) {
  for (let post of posts) {
    contentDiv.innerHTML += `
      <div>
        <h3>${post.title}</h3>
        <p>${post.body}</p>
      </div>
    `;
  }
}

function handelClick(el, userId) {
  document.querySelectorAll(".titels > div.active").forEach((div) => {
    div.classList.remove("active");
  });
  el.classList.add("active");
  getPosts(userId);
}
