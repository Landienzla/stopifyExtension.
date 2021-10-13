let getFollowers = document.getElementById("getFollowers");
let getFollowing = document.getElementById("getFollowing");
let loginSpotify = document.getElementById("loginSpotify");
// let testButton = document.getElementById("testBackend");
let stalkButton = document.getElementById("stalk");

// testButton.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: testBackend,
//   });
// });

// function testBackend() {
//   const Http = new XMLHttpRequest();
//   const url = "http://localhost:5000/users/w0ad442gt75h5s867w15g4eq7";
//   Http.open("GET", url, true);
//   Http.send();
//   Http.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       console.log(JSON.parse(Http.responseText));
//       console.log(JSON.parse(Http.responseText).userId);
//       // textArea.innerText=JSON.parse(Http.responseText).userId
//       alert(JSON.parse(Http.responseText));
//     }
//   };
// }
stalkButton.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: stalkFunction,
  });
});
loginSpotify.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: loginSpotifyFunction,
  });
});

getFollowers.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getFollowersFunction,
  });
});
getFollowing.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getFollowingFunction,
  });
});

function loginSpotifyFunction() {
  if (window.location.hostname !== "open.spotify.com") {
    window.location.href = "https://open.spotify.com";
  } else {
    if (!document.querySelector('[data-testid="user-widget-link"]')) {
      alert("Once Spotify'a Giris Yap Bakm");
    } else {
      document.querySelector('[data-testid="user-widget-link"]').click();
      document.querySelectorAll('[role= "menuitem"]').item(1).click();
      if(document.location.pathname.includes('user')){
        alert("DAHA NEREYE GIRICEN")
      }
    }
  }
}

function getFollowersFunction() {
  if (window.location.pathname.includes("user")) {
    let user = window.location.pathname.replace("/user/", "");
    if (window.location.pathname.includes("followers")) {
      let user = window.location.pathname.split("/")[2];
      let userName = document.querySelector(
        '[data-testid="user-widget-name"]'
      ).outerText;
      let playlistsName = [].slice.call(
        document.getElementsByClassName(
          "vQ8EkR_krbAi5mYmmpCn IAK6xuovwdsi5JG9DSTx"
        )
      );
      let playlistsUrl = document.getElementsByClassName(
        "standalone-ellipsis-one-line mnhCDMSoY7L0E85V51mj"
      );
      let playlistsData = [];
      playlistsName.map((playlist, index) => {
        playlistsData.push({
          playlistName: playlist.outerText,
          playlistUrl: playlistsUrl[index].getAttribute("href"),
        });
      });
      fetch(
        `https://stopifyExtension.landienzla.repl.co/users/${user}/${userName}/addData/playlists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playlistsData),
        }
      )
        .then((response) => {
          response.text;
        })
        .catch((err) => {
          console.log(err);
        });
      let followers = document.getElementsByClassName(
        "RTMaUOOWPswmV1oG8f1S OVe33QZtu7pqMRtApCfF"
      );
      let followersArray = [].slice.call(followers);
      let followerData = [];
      followersArray.map((x) => {
        followerData.push({
          followerName: x.outerText,
          followerId: document
            .querySelector(`[title="${x.outerText}"]`)
            .getAttribute("href")
            .replace("/user/", ""),
          updatedAt: new Date().toLocaleString(),
        });
      });
      fetch(
        `https://stopifyExtension.landienzla.repl.co/users/${user}/${userName}/addData/followers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(followerData),
        }
      )
        .then((response) => {
          if (response.status == 200) {
            alert("ANNE BITTIII");
          } else {
            alert("Tekrar Dener misin Hata yedim de (yalvaran emoji)");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Tekrar Dener misin Hata yedim de (yalvaran emoji)");
        });
    } else {
      if (window.location.pathname.includes("following")) {
        // window.location.href = "https://open.spotify.com";
        let user = window.location.pathname.split("/")[2];
        window.location.href = `https://open.spotify.com/user/${user}/followers`;
      } else {
        window.location.href = `https://open.spotify.com/user/${user}/followers`;
      }
    }
  } else {
    document.querySelector('[data-testid="user-widget-link"]').click();
    document.querySelectorAll('[role= "menuitem"]').item(1).click();
  }
}
function getFollowingFunction() {
  if (window.location.pathname.includes("user")) {
    let user = window.location.pathname.replace("/user/", "");
    if (window.location.pathname.includes("following")) {
      let userName = document.querySelector(
        '[data-testid="user-widget-name"]'
      ).outerText;

      let user = window.location.pathname.split("/")[2];
      let playlistsName = [].slice.call(
        document.getElementsByClassName(
          "vQ8EkR_krbAi5mYmmpCn IAK6xuovwdsi5JG9DSTx"
        )
      );
      let playlistsUrl = document.getElementsByClassName(
        "standalone-ellipsis-one-line mnhCDMSoY7L0E85V51mj"
      );
      let playlistsData = [];
      playlistsName.map((playlist, index) => {
        playlistsData.push({
          playlistName: playlist.outerText,
          playlistUrl: playlistsUrl[index].getAttribute("href"),
        });
      });
      fetch(
        `https://stopifyExtension.landienzla.repl.co/users/${user}/${userName}/addData/playlists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(playlistsData),
        }
      )
        .then((response) => {
          response.text;
        })
        .catch((err) => {
          console.log(err);
        });

      let followings = document.getElementsByClassName(
        "RTMaUOOWPswmV1oG8f1S OVe33QZtu7pqMRtApCfF"
      );
      let followingsArray = [].slice.call(followings);
      let followingData = [];
      followingsArray.map((x) => {
        followingData.push({
          followingName: x.outerText,
          followingId: document
            .querySelector(`[title="${x.outerText}"]`)
            .getAttribute("href")
            .replace("/user/", ""),
          updatedAt: new Date().toLocaleString(),
        });
      });
      fetch(
        `https://stopifyExtension.landienzla.repl.co/users/${user}/${userName}/addData/following`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(followingData),
        }
      )
        .then((response) => {
          if (response.status == 200) {
            alert("ANNE BITTIII");
          } else {
            alert("Tekrar Dener misin Hata yedim de (yalvaran emoji)");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Tekrar Dener misin Hata yedim de (yalvaran emoji)");
        });
    } else {
      if (window.location.pathname.includes("followers")) {
        // window.location.href = "https://open.spotify.com";
        let user = window.location.pathname.split("/")[2];
        window.location.href = `https://open.spotify.com/user/${user}/following`;
      } else {
        window.location.href = `https://open.spotify.com/user/${user}/following`;
      }
    }
  } else {
    document.querySelector('[data-testid="user-widget-link"]').click();
    document.querySelectorAll('[role= "menuitem"]').item(1).click();
  }
}
async function stalkFunction() {
  if (
    window.location.pathname.includes("following") ||
    window.location.pathname.includes("followers")
  ) {
    let user = window.location.pathname.replace("/user/", "");
    await fetch(`https://stopifyExtension.landienzla.repl.co/stalk/${user}`)
      .then((resp) => resp.json())
      .then((data) => {
        dataArray = JSON.parse(JSON.stringify(data));
        if (dataArray === "Kacak Yok") {
          alert("Kacak Yok");
        } else {
          let arr = Object.keys(dataArray).map((key) => [
            String(key),
            dataArray[key],
          ]);
          arr.map((user) => alert(user));
        }
      })

      .catch((err) => console.log(err));
  } else if (window.location.pathname.includes("user")) {
    let user = window.location.pathname.split("/")[2].replace("/followers", "");
    await fetch(`https://stopifyExtension.landienzla.repl.co/stalk/${user}`)
      .then((resp) => resp.json())
      .then((data) => {
        dataArray = JSON.parse(JSON.stringify(data));
        if (dataArray === "Kacak Yok") {
          alert("Kacak Yok");
        } else {
          let arr = Object.keys(dataArray).map((key) => [
            String(key),
            dataArray[key],
          ]);
          arr.map((user) => alert(user));
        }
      })

      .catch((err) => console.log(err));
  } else {
    document.querySelector('[data-testid="user-widget-link"]').click();
    document.querySelectorAll('[role= "menuitem"]').item(1).click();
  }
}
