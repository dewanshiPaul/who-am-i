import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { EditorState, convertToRaw } from "draft-js";
import { EditorDesc, Input, RippleButton } from "../../../../test";
import { isEmpty } from "../../../../../middleware/validation";
import './index.scss';

export function EducationDetails({eData, setData, total, setTotal}) {
    const handleChange = (field, e, i) => {
        const newData = [...eData];
        newData[i][field] = e.target.value;
        setData(newData);
    }

    const handleAdd = () => {
        setData(arr => [...arr, {
            'name': '',
            'start': '',
            'end': '',
            'degree': '',
            'city': '',
            'description': EditorState.createEmpty(),
        }])
        setTotal(total+1);
    }

    const handleRemove = () => {
        if(total !== 1) {
            eData.pop();
            setData(eData);
            setTotal(total-1);
        }
    }

    // console.log(draftToHtml(convertToRaw(eData[0].description.getCurrentContent())));

    return (
        <div className="e-container">
            {
                [...Array(total)].map((d,i) => {
                    return (
                        <div className="container" key={i}>
                            <Typography variant="subtitle1">
                                Education {i+1}
                            </Typography>
                            <div className="line" />
                            <div className="fields">
                                <div>
                                    <Input 
                                        type={"text"}
                                        value={eData[i].name}
                                        placeholder={"eg: VIT Chennai"}
                                        text={"Institute"}
                                        handleChange={(e) => handleChange("name",e,i)}
                                        id={"education-name"}
                                        validate={isEmpty(eData[i].name, "Institute") === ''}
                                    />
                                    <Typography 
                                        variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            color: 'rgb(245, 80, 80)'
                                        }}
                                    >
                                        {isEmpty(eData[i].name, "Institute")}
                                    </Typography>
                                </div>
                                <div>
                                    <Input 
                                        type={"text"}
                                        value={eData[i].degree}
                                        placeholder={"eg: Btech"}
                                        text={"Degree"}
                                        handleChange={(e) => handleChange("degree",e,i)}
                                        id={"education-degree"}
                                        validate={isEmpty(eData[i].degree, "Degree") === ''}
                                    />
                                    <Typography 
                                        variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            color: 'rgb(245, 80, 80)'
                                        }}
                                    >
                                        {isEmpty(eData[i].degree, "Degree")}
                                    </Typography>
                                </div>
                                <div>
                                    <Input 
                                        type={"text"}
                                        value={eData[i].city}
                                        placeholder={"eg: Chennai"}
                                        text={"City"}
                                        handleChange={(e) => handleChange("city",e,i)}
                                        id={"education-city"}
                                        validate={isEmpty(eData[i].city, "City") === ''}
                                    />
                                    <Typography 
                                        variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            color: 'rgb(245, 80, 80)'
                                        }}
                                    >
                                        {isEmpty(eData[i].city, "City")}
                                    </Typography>
                                </div>
                                <div>
                                    <Input 
                                        type={"month"}
                                        value={eData[i].start}
                                        placeholder={"eg: September, 2020"}
                                        text={"Joining"}
                                        handleChange={(e) => handleChange("start",e,i)}
                                        id={"education-start"}
                                        validate={isEmpty(eData[i].start, "Joining") === ''}
                                    />
                                    <Typography 
                                        variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            color: 'rgb(245, 80, 80)'
                                        }}
                                    >
                                        {isEmpty(eData[i].start, "Joining")}
                                    </Typography>
                                </div>
                                <div>
                                    <Input 
                                        type={"month"}
                                        value={eData[i].end}
                                        placeholder={"eg: July, 2024"}
                                        text={"Ending"}
                                        handleChange={(e) => handleChange("end",e,i)}
                                        id={"education-end"}
                                        validate={isEmpty(eData[i].end, "Ending") === ''}
                                    />
                                    <Typography 
                                        variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            color: 'rgb(245, 80, 80)'
                                        }}
                                    >
                                        {isEmpty(eData[i].end, "Ending")}
                                    </Typography>
                                </div>
                            </div>
                            <div className="description">
                                <Typography 
                                    variant="body1"
                                    style={{
                                        color: '#726d6d'
                                    }}
                                >
                                    Do you want to add some description? Put in the editor!
                                </Typography>
                                <EditorDesc
                                    editor={eData[i].description}
                                    setEditor={(e) => {
                                        const newData = [...eData];
                                        newData[i].description = e;
                                        setData(newData);
                                    }}
                                />
                            </div>
                        </div>
                    )
                })
            }
            <div className="add-footer">
                <RippleButton 
                    onClick={handleAdd}
                >
                    <AddIcon />
                </RippleButton>
                {
                    total === 1 ?
                    null
                    :
                    <RippleButton 
                        onClick={handleRemove}
                    >
                        <RemoveIcon />
                    </RippleButton>
                }
            </div>
        </div>
    )
}

