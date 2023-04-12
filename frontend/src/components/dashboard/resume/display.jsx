import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { RippleButton } from "../../test";
import { useState } from "react";
import { Loading } from "../../loader";
import { Typography } from "@mui/material";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export function ResumeDisplay() {
    const content = sessionStorage.getItem('resume');
    const username = sessionStorage.getItem('username');
    const email = sessionStorage.getItem('email');
    const [loading, setLoading] = useState(false);
    const handleDownload = () => {
        setLoading(true);
        const input = document.getElementById('download');
        html2canvas(input)
        .then((canvas) => {
            const img = canvas.toDataURL('img/png',1.0);
            const pdf = new jsPDF('p', 'mm', 'a4');
            pdf.addImage(img, 'PNG', 0, 0, 208, (canvas.height*208)/canvas.width);
            console.log(pdf.output('arraybuffer'));
            const formData = new FormData();
            formData.append('file', new Blob([pdf.output('arraybuffer')]), {type: 'application/pdf'});
            for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
            axios.post(`http://localhost:5000/user/resumes/${email}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                setLoading(false);
                pdf.save(`${username}-resume.pdf`);
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
                NotificationManager.error('Failed to download', 'Error!', 3000);
            })
        })
        .catch((err) => {
            setLoading(false);
            console.error(err);
            NotificationManager.error('Failed to convert pdf', 'Error!', 3000)
        })
    }
    return (
        <div>
            <div 
                style={{
                    padding: '2vh',
                    position: 'relative',
                    float: 'right'
                }}
            >
                <RippleButton
                    onClick={handleDownload}
                >
                    {
                        loading ?
                            <Loading 
                                h={30}
                                w={50}
                            />
                        :
                            <Typography variant="body1">
                                Download
                            </Typography>
                    }
                </RippleButton>
            </div>
            <div dangerouslySetInnerHTML={{__html: content}} id="download"/>
            <NotificationContainer />
        </div>
    )
}