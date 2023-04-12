import { Typography } from "@mui/material";
import { EditorDesc } from "../../../../test";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

export function Skills({sdescription, setData}) {
    console.log(draftToHtml(convertToRaw(sdescription.getCurrentContent())));
    return (
        <div className="s-container">
            <Typography
                variant="body1"
                style={{
                    color: '#726d6d'
                }}
            >
                Enter your skills in the editor
            </Typography>
            <EditorDesc
                editor={sdescription}
                setEditor={(e) => {setData(e)}}
            />
        </div>
    )
}