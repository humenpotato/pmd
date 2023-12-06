export const SetUser = (userData : string) => localStorage.setItem('userData', userData);

export const User = () => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
        return JSON.parse(atob(userDataString));
    } else {
        return null;
    }
};

export const InItAuthInfo = async () =>{
    const user = await chrome.identity.getAuthToken({ interactive: false });
    if (user) {
        fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                let UserInfo = JSON.stringify({ profile_info: data, user_info: user });
                console.log(btoa(UserInfo));
                SetUser(btoa(UserInfo));
            })
            .catch((error) => {
                console.error("Error fetching user info:", error);
            });
    }
}