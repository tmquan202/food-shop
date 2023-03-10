import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Typography } from '@mui/material';
import { checkUserAsync } from '../../components/login/slices'
import { useDispatch, useSelector } from 'react-redux';

export default function GoogleLogin() {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.loginUser.login)
    console.log(user)
    const navigate = useNavigate()

    useEffect(() => {
        /* global google*/
        const handleCredentialResponse = (response) => {
            var decoded = jwt_decode(response.credential)
            //Get logged in Google account, send to redux action
            const user = {
                name: decoded.name,
                avatar: decoded.picture,
                email: decoded.email,
                role: 'USER',
                login: true
            }
            dispatch(checkUserAsync(user))
            navigate("/")
        }
        //Use registered id to run google login api
        google.accounts.id.initialize({
            client_id: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
            callback: handleCredentialResponse,
        });
        //Google login button
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        window.google.accounts.id.prompt(); //Display the One Tap dialog
    }, [dispatch]);

    return (
        <>
            <div className='login-container' style={{ textAlign: 'center' }}>
                <b>
                    <Typography
                        variant="h4"
                        component="a"
                        href="/"
                        sx={{
                            fontFamily: 'monospace',
                            color: 'orange',
                            textDecoration: 'none',
                        }}
                    >
                        MY SHOP
                    </Typography>
                </b>
                <p className='small-paragraph'>"My Shop" is a place where you can buy snacks, tools and ingredients for your daily dish or being creative</p>
                <p className='small-paragraph'>Sign in with your google account and go shopping!</p>
                <p style={{ color: '#FF5353', fontWeight: 'bold' }}>Sign in with google</p>
                <div id='buttonDiv'></div>
                <hr />
                <p className='small-paragraph'>This is a small project made by <span style={{ color: '#FF8A8A', fontWeight: 'bold' }}>TMQUAN</span> using React and Redux</p>
            </div>
        </>
    )
}
