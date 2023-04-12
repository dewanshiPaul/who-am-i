import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Input, EditorDesc, RippleButton } from "../../../../test";
import { isEmpty } from "../../../../../middleware/validation";
import { EditorState } from "draft-js";
import './index.scss';

export function WorkExperienceDetails({exData, setData, total, setTotal}) {

    const handleChange = (field, e, i) => {
        const newData = [...exData];
        if(field === 'current')
            newData[i][field] = !exData[i].current;
        else
            newData[i][field] = e.target.value;
        setData(newData);
    }

    const handleAdd = () => {
        setData(arr => [...arr, {
            'name': '',
            'role': '',
            'start': '',
            'end': '',
            'current': false,
            'city': '',
            'description': EditorState.createEmpty()
        }])
        setTotal(total+1);
    }

    const handleRemove = () => {
        if(total !== 1) {
            exData.pop();
            setData(exData);
            setTotal(total-1);
        }
    }

    return (
        <div className="ex-container">
            {
                [...Array(total)].map((d,i) => {
                    return (
                        <div className="container" key={i}>
                            <Typography variant="subtitle1">
                                Work Experience {i+1}
                            </Typography>
                            <div className="line" />
                            <div className="fields">
                                <div>
                                    <Input 
                                        type={"text"}
                                        value={exData[i].name}
                                        placeholder={"eg: Google"}
                                        text={"Company"}
                                        handleChange={(e) => handleChange("name",e,i)}
                                        id={"experience-name"}
                                        validate={isEmpty(exData[i].name, "Company") === ''}
                                    />
                                    <Typography 
                                        variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            color: 'rgb(245, 80, 80)'
                                        }}
                                    >
                                        {isEmpty(exData[i].name, "Company")}
                                    </Typography>
                                </div>
                                <div>
                                    <Input 
                                        type={"text"}
                                        value={exData[i].role}
                                        placeholder={"eg: SWE"}
                                        text={"Job Profile"}
                                        handleChange={(e) => handleChange("role",e,i)}
                                        id={"experience-role"}
                                        validate={isEmpty(exData[i].role, "Job Profile") === ''}
                                    />
                                    <Typography 
                                        variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            color: 'rgb(245, 80, 80)'
                                        }}
                                    >
                                        {isEmpty(exData[i].role, "Job Profile")}
                                    </Typography>
                                </div>
                                <div>
                                    <Input 
                                        type={"text"}
                                        value={exData[i].city}
                                        placeholder={"eg: Hyderabad"}
                                        text={"City"}
                                        handleChange={(e) => handleChange("city",e,i)}
                                        id={"experience-city"}
                                        validate={isEmpty(exData[i].city, "City") === ''}
                                    />
                                    <Typography 
                                        variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            color: 'rgb(245, 80, 80)'
                                        }}
                                    >
                                        {isEmpty(exData[i].city, "City")}
                                    </Typography>
                                </div>
                                <div>
                                    <Input 
                                        type={"month"}
                                        value={exData[i].start}
                                        placeholder={"eg: July, 2020"}
                                        text={"Joining"}
                                        handleChange={(e) => handleChange("start",e,i)}
                                        id={"experience-start"}
                                        validate={isEmpty(exData[i].start, "Joining") === ''}
                                    />
                                    <Typography 
                                        variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            color: 'rgb(245, 80, 80)'
                                        }}
                                    >
                                        {isEmpty(exData[i].start, "Joining")}
                                    </Typography>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    <Typography 
                                        variant="body1" 
                                        style={{
                                            color: '#726d6d'
                                        }}
                                    >
                                        Currently working here
                                    </Typography>
                                    <input 
                                        type="checkbox"
                                        value={"Currently working here"}
                                        checked={exData[i].current}
                                        onChange={(e) => handleChange('current', e, i)}
                                    />
                                </div>
                                {
                                    exData[i].current ?
                                    null
                                    :
                                    <div>
                                        <Input 
                                            type={"month"}
                                            value={exData[i].end}
                                            placeholder={"eg: July, 2020"}
                                            text={"Ending"}
                                            handleChange={(e) => handleChange("end",e,i)}
                                            id={"experience-end"}
                                            validate={isEmpty(exData[i].end, "Ending") === ''}
                                        />
                                        <Typography 
                                            variant="body1"
                                            style={{
                                                fontSize: '12px',
                                                color: 'rgb(245, 80, 80)'
                                            }}
                                        >
                                            {isEmpty(exData[i].end, "Ending")}
                                        </Typography>
                                    </div>
                                }
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
                                    editor={exData[i].description}
                                    setEditor={(e) => {
                                        const newData = [...exData];
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