import {SetUser} from './UserAuth';
export const GoogleIdentityAuthenticateLogin = async () => {
  try {
    const user = await chrome.identity.getAuthToken({ interactive: true });
    if (user) {
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          let UserInfo = JSON.stringify({ profile_info: data, user_info: user });
          console.log(UserInfo);
            SetUser(btoa(UserInfo));
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    } else {
      // User is not signed in, show the GoogleAPIs One Tap sign-in prompt.
      chrome.identity.launchWebAuthFlow({
        url: "https://accounts.google.com/gsi/iframe.html?client_id=1122315056-j8bp9qss8a6rpd3kni8mh3vo3o0naqu5.apps.googleusercontent.com",
        interactive: true,
      });
    }
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

export const GoogleIdentityAuthenticateLogoff = () => {
  chrome.identity.getAuthToken({ interactive: false }, (token) => {
    if (token) {
      fetch("https://accounts.google.com/o/oauth2/revoke?token=" + token, {
        method: "POST",
      })
        .then(async () => {
          chrome.identity.removeCachedAuthToken({ token: token }, () => {
            console.error("Signed out successfully.");
          });

          chrome.identity.clearAllCachedAuthTokens(() => {
            chrome.storage.local.remove("accessToken", function () {
              alert("Signed out successfully. This window will close now.");
              window.close();
            });
          });
          localStorage.clear();
          console.error("All local Storage items are cleared.");
        })
        .catch((error) => {
          console.error("Error revoking token:", error);
        });
    }
  });
};
