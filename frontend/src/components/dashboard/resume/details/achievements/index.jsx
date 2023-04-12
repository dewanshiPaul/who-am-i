import { Typography } from "@mui/material";
import { EditorDesc } from "../../../../test";

export function Achievements({description, setData}) {
    return (
        <div className="a-container">
            <Typography
                variant="body1"
                style={{
                    color: '#726d6d'
                }}
            >
                Enter your achievements in the editor
            </Typography>
            <EditorDesc 
                editor={description}
                setEditor={(e) => setData(e)}
            />
        </div>
    )
}