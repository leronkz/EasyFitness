import { styled } from "@mui/system";
import {OutlinedInput, Button, Typography, Box} from "@mui/material";
import { Link } from "react-router-dom";

export const HelperText = styled(Typography)`
    font-family: 'Lexend';
    font-size: 24px;
    font-weight: 500;
    margin: 0;
`
export const EmailInput = styled(OutlinedInput)`
    margin-bottom: 2ch;
    border-radius: 30px;
    border: 1px solid #000;
    background: #FFFEFE;
    font-size: 16px;
    font-family: Lexend;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: 60%;
`
export const PasswordInput = styled(EmailInput)`
    border: 1px solid #000; 
    border-radius: 30px;
    margin-bottom: 2ch;
    font-family: Lexend;
`
export const SignInButton = styled(Button)`
    margin-bottom: 2ch;
    text-transform: none;
    font-family: Lexend;
    color: white;
    background: #41D4F5;
    font-size: 16px;
    border-radius: 15px;
    width: 60%;
    transition: color 0.5s ease, background 0.5s ease;
    &:hover{
        color: black;
        border: 1px solid #41D4F5;
        background: white;
    }
`
export const ExternalLoginButton = styled(Button)`
    margin-top: 1ch;
    margin-bottom: 1ch;
    display: flex;
    justify-content: space-between;
    font-family: Lexend;
    border: 1px solid black;
    border-radius: 15px;
    color: black;
    fontSize: 12px;
    fontWeight: 400; 
    width: 100%;
`
export const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    cursor: pointer;
    transition: color 0.3s ease;
    &:hover{
        color: #41D4F5;
    }
`
export const Tile = styled(Box)`
    display: flex;
    flex-direction: column;
    margin-bottom: 5em;
    border-radius: 30px;
    padding: 3ch;
    transition: transform 0.3s;
    height: 255px;
    &:hover{
        transform: translateY(-5px);
        box-shadow: -5px 8px 36px -13px rgba(66, 68, 90, 1);
    }
`