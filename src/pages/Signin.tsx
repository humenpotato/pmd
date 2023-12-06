import {Button} from "@mui/material";
import {GoogleIdentityAuthenticateLogin, GoogleIdentityAuthenticateLogoff} from "../Services/GoogleAuthServices";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {useState} from "react";
import {SetUser} from '../Services/UserAuth';
import {useNavigate} from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Fragment} from "react";

const Signin = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [ChromeExtUser, setChromeExtUser] = useState('');
    const handleInputChange = (event: any) => setChromeExtUser(event.target.value);
    const handleChromeUserData = () => {
        SetUser(ChromeExtUser);
        navigate("/dashboard")
        handleClose()
    };

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Authenticate with Chrome Ext Code
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Authenticate PMD Extension</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter the code copied from Chrome Extension
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Authentication Code from Chrome Extension"
                            fullWidth
                            variant="standard"
                            onChange={handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleChromeUserData}>Authorize</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>

            <Button variant="contained" onClick={GoogleIdentityAuthenticateLogin}>
                Sign in With Google
            </Button>
            <Button variant="contained" onClick={GoogleIdentityAuthenticateLogoff}>
                Log Off
            </Button>
        </Box>
    );
};

export default Signin;
