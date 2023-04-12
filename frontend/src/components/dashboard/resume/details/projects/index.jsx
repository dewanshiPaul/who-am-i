import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { EditorState } from "draft-js"
import { Input, EditorDesc, RippleButton } from "../../../../test";
import { isEmpty } from "../../../../../middleware/validation";
import './index.scss';

export function Projects({pData, total, setData, setTotal}) {
    const handleChange = (field, e, i) => {
        const newData = [...pData];
        if(field === 'description')
            newData[i][field] = e;
        else    
            newData[i][field] = e.target.value;
        setData(newData);
    }

    const handleAdd = () => {
        const newData = [...pData];
        newData.push({
            name: '',
            description: EditorState.createEmpty()
        });
        setData(newData);
        setTotal(total+1);
    }

    const handleRemove = () => {
        pData.pop();
        setData(pData);
        setTotal(total-1);
    }

    return (
        <div className="pr-container">
            {
                [...Array(total)].map((d,i) => {
                    return (
                        <div className="container" key={i}>
                            <Typography variant="subtitle1">
                                Project {i+1}
                            </Typography>
                            <div className="line" />
                            <div className="fields">
                                <div>
                                    <Input 
                                        type={"text"}
                                        value={pData[i].name}
                                        placeholder={"eg: XYZ"}
                                        text={"Name"}
                                        handleChange={(e) => handleChange("name",e,i)}
                                        id={"project-name"}
                                        validate={isEmpty(pData[i].name, "Name") === ''}
                                    />
                                    <Typography 
                                        variant="body1"
                                        style={{
                                            fontSize: '12px',
                                            color: 'rgb(245, 80, 80)'
                                        }}
                                    >
                                        {isEmpty(pData[i].name, "Name")}
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
                                    editor={pData[i].description}
                                    setEditor={(e) => handleChange('description', e, i)}
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