const btn = document.querySelector(".titels > div");
const titelsDiv = document.querySelector(".titels");
const contentDiv = document.querySelector(".content");

getUsers().then(() => {
  getPosts(1);
});

function getUsers() {
  titelsDiv.innerHTML = '<div class="loading">Loading...</div>';
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (res.ok) {
          resolve();
          return res.json();
        }
        if (res.status === 404) {
          titelsDiv.innerHTML = `<div class="error">Not Found</div>`;
        }
      })
      .then((data) => {
        if (data) showUsers(data);
      })
      .catch((error) => {
        titelsDiv.innerHTML = `<div class="error">${error.message}</div>`;
      });
  });
}

function getPosts(id) {
  contentDiv.innerHTML = '<div class="loading">Loading...</div>';
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then((res) => {
      if (res.ok) return res.json();
      if (res.status === 404) {
        contentDiv.innerHTML = `<div class="error">Not Found</div>`;
      }
    })
    .then((data) => {
      if (data) showPosts(data);
    })
    .catch((error) => {
      contentDiv.innerHTML = `<div class="error">${error.message}</div>`;
    });
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
  contentDiv.innerHTML = "";
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
