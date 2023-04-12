import { useState } from "react";
import { EditorDesc, Input } from "../../../../test";
import './index.scss';
import { isEmail, isEmpty, isPhone } from "../../../../../middleware/validation";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import { Typography } from "@mui/material";

export function PersonalDetails({pData, setData, aboutme, setAboutMe}) {
    const handleChange = (val, e) => {
        setData({...pData, [val]: e.target.value});
    }
    
    return (
        <div className="p-container">
            <div className="fields">
                <Input 
                    type={"text"}
                    value={pData.role}
                    placeholder={"eg: Data Analyst"}
                    text={"Job Role"}
                    handleChange={(e)=>handleChange('role', e)}
                    id={'job-role'}
                    validate={true}
                />
                <div>
                    <Input 
                        type={"text"}
                        value={pData.name}
                        placeholder={"eg: John Abraham"}
                        text={"Name"}
                        handleChange={(e)=>handleChange('name', e)}
                        id={'profile-name'}
                        validate={isEmpty(pData.name, "Name") === ''}
                    />
                    <Typography 
                        variant="body1"
                        style={{
                            fontSize: '12px',
                            color: 'rgb(245, 80, 80)'
                        }}
                    >
                        {isEmpty(pData.name, "Name")}
                    </Typography>
                </div>
                <div>
                    <Input 
                        type={"email"}
                        value={pData.email}
                        placeholder={"eg: johnabraham13@gmail.com"}
                        text={"Email"}
                        handleChange={(e)=>handleChange('email', e)}
                        id={'profile-email'}
                        validate={
                            isEmail(pData.email) === '' 
                        }
                    />
                    <Typography 
                        variant="body1"
                        style={{
                            fontSize: '12px',
                            color: 'rgb(245, 80, 80)'
                        }}
                    >
                        {isEmail(pData.email)}
                    </Typography>
                </div>
                <div>
                    <Input 
                        type={"text"}
                        value={pData.phone}
                        placeholder={"eg: +911112223334"}
                        text={"Contact No"}
                        handleChange={(e)=>handleChange('phone', e)}
                        id={'profile-phone'}
                        validate={isPhone(pData.phone, 'Contact No') === ''}
                    />
                    <Typography 
                        variant="body1"
                        style={{
                            fontSize: '12px',
                            color: 'rgb(245, 80, 80)'
                        }}
                    >
                        {isPhone(pData.phone, 'Contact No')}
                    </Typography>
                </div>
                <Input 
                    type={"text"}
                    value={pData.street}
                    placeholder={"eg: XYZ Street"}
                    text={"Street"}
                    handleChange={(e)=>handleChange('street', e)}
                    id={'profile-street'}
                    validate={true}
                />
                <div>
                    <Input 
                        type={"text"}
                        value={pData.city}
                        placeholder={"eg: XYZ"}
                        text={"City"}
                        handleChange={(e)=>handleChange('city', e)}
                        id={'profile-city'}
                        validate={isEmpty(pData.city, "City") === ''}
                    />
                    <Typography 
                        variant="body1"
                        style={{
                            fontSize: '12px',
                            color: 'rgb(245, 80, 80)'
                        }}
                    >
                        {isEmpty(pData.city, "City")}
                    </Typography>
                </div>
                <div>
                    <Input 
                        type={"text"}
                        value={pData.country}
                        placeholder={"eg: ABC"}
                        text={"Country"}
                        handleChange={(e)=>handleChange('country', e)}
                        id={'profile-country'}
                        validate={isEmpty(pData.country, "Country") === ''}
                    />
                    <Typography 
                        variant="body1"
                        style={{
                            fontSize: '12px',
                            color: 'rgb(245, 80, 80)'
                        }}
                    >
                        {isEmpty(pData.country, "Country")}
                    </Typography>
                </div>
                <Input 
                    type={"text"}
                    value={pData.pincode}
                    placeholder={"eg: xxxxxx"}
                    text={"Pincode"}
                    handleChange={(e)=>handleChange('pincode', e)}
                    id={'profile-pincode'}
                    validate={true}
                />
            </div>
            <div className="about-me">
                <Typography 
                    variant="body1"
                    style={{
                        color: '#726d6d'
                    }}
                >
                    About Me
                </Typography>
                <EditorDesc 
                    editor={aboutme}
                    setEditor={(e) => setAboutMe(e)}
                />
            </div>
        </div>
    )
}