import Box from "@mui/material/Box";
import WidgetsIcon from "@mui/icons-material/Widgets";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
// import { UserAuth } from "../context/ExtensionAuthContext";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import LoginIcon from "@mui/icons-material/Login";

const actions = [
  { icon: <SettingsIcon />, name: "Settings", path: "/settings" },
  { icon: <SpaceDashboardIcon />, name: "Dashboard", path: "/dashboard" },
  { icon: <LoginIcon />, name: "Sign In", path: "/signin" },
];

export default function SpeedDailNavigation() {
  const navigate = useNavigate();

  const changeRoute = (path: string) => navigate(path);

  const handleSignOut = async () => {
    try {
      // logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ position: "fixed", bottom: 0, right: 0, mb: 2, mr: 2 }}>
      <SpeedDial
        ariaLabel="Speed Dial Navigation"
        hidden={false}
        icon={<WidgetsIcon />}
        // icon={<img src="/assets/icons/icon48.png" alt="Navigation" />}
        direction={"up"}
        sx={{
          zIndex: 9999,
          backgroundColor: "transparent",
          position: "absolute",
          bottom: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2),
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => changeRoute(action.path)}
            tooltipOpen
            sx={{
              zIndex: 9999,
              backgroundColor: "transparent",
            }}
          />
        ))}

        {/* <SpeedDialAction
          key={"Account"}
          icon={<AccountCircleIcon />}
          tooltipTitle={user?.given_name}
          onClick={() => changeRoute("/account")}
          tooltipOpen
        /> */}

        <SpeedDialAction
          key={"Logout"}
          icon={<LogoutIcon />}
          tooltipTitle={"Logout"}
          onClick={handleSignOut}
          tooltipOpen
        />
      </SpeedDial>
    </Box>
  );
}
