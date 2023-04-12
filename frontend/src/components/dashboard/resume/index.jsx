import { Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import './index.scss';
import { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js"
import { PersonalDetails } from "./details/personal/personal";
import { RippleButton } from "../../test";
import { EducationDetails } from "./details/education/index";
import { WorkExperienceDetails } from "./details/experience/index";
import { Skills } from "./details/skills";
import { Achievements } from "./details/achievements";
import { Projects } from "./details/projects";
import axios from "axios";
import { useSelector } from "react-redux";
import draftToHtml from "draftjs-to-html";
import { isEmail, isEmpty, isPhone } from "../../../middleware/validation";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Loading } from "../../loader";
import TEMPLATE_1 from "../../../images/template1.png";

const titles = [
    'Personal Details',
    'Work Experience',
    'Education',
    'Skills',
    'Projects',
    'Achievements'
]

const base64ToBlob = ( pdfstring ) => {
    const bytes = window.atob(pdfstring);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while(length--) {
        out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: 'application/pdf' });
}

export function Resume() {
    const { userId } = useSelector(state => state.authSlice);
    const { username, email } = useSelector(state => state.detailsSlice);
    const [show, setShow] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [page, setPage] = useState(0);
    const [pdfs, setpdfs] = useState([]);
    const [loading, setLoading] = useState(false);
    //personal
    const [pData, setPData] = useState({
        'role': '',
        'name': '',
        'email': '',
        'phone': '',
        'street': '',
        'city': '',
        'country': '',
        'pincode': '',
    })
    const [aboutme, setAboutMe] = useState(EditorState.createEmpty());
    //experience
    const [exData, setexData] = useState([{
        'name': '',
        'role': '',
        'start': '',
        'end': '',
        'current': false,
        'city': '',
        'description': EditorState.createEmpty()
    }]);
    const [exTotal, setexTotal] = useState(1);
    //education
    const [eData, seteData] = useState([{
        'name': '',
        'start': '',
        'end': '',
        'degree': '',
        'city': '',
        'description': EditorState.createEmpty(),
    }]);
    const [etotal, seteTotal] = useState(1);
    //projects
    const [prData, setprData] = useState([{
        'name': '',
        'description': EditorState.createEmpty()
    }])
    const [prTotal, setprTotal] = useState(1);
    //skills
    const [sdescription, setsData] = useState(EditorState.createEmpty());
    //achievements
    const [adescription, setaData] = useState(EditorState.createEmpty());
    
    const pageDisplay = (page) => {
        if(page === 0)
            return <PersonalDetails 
                        pData={pData}
                        setData={setPData}
                        aboutme={aboutme}
                        setAboutMe={setAboutMe}
                    />
        if(page === 1)
            return <WorkExperienceDetails 
                        exData={exData}
                        setData={setexData}
                        total={exTotal}
                        setTotal={setexTotal}
                    />
        if(page === 2)
            return <EducationDetails 
                        eData={eData}
                        setData={seteData}
                        total={etotal}
                        setTotal={seteTotal}
                    />
        if(page === 3)
            return <Skills 
                        sdescription={sdescription}
                        setData={setsData}
                    />
        if(page === 4)
            return <Projects 
                        pData={prData} 
                        total={prTotal}
                        setData={setprData}
                        setTotal={setprTotal}
                    />
        if(page === 5)
        return <Achievements 
                    description={adescription}
                    setData={setaData}
                />
    }

    const handleToSetInitial = () => {
        setPData({
            'role': '',
            'name': '',
            'email': '',
            'phone': '',
            'street': '',
            'city': '',
            'country': '',
            'pincode': '',
        });
        setAboutMe(EditorState.createEmpty());
        setexData([{
            'name': '',
            'role': '',
            'start': '',
            'end': '',
            'current': false,
            'city': '',
            'description': EditorState.createEmpty()
        }]);
        setexTotal(1);
        seteData([{
            'name': '',
            'start': '',
            'end': '',
            'degree': '',
            'city': '',
            'description': EditorState.createEmpty(),
        }]);
        seteTotal(1);
        setprData([{
            'name': '',
            'description': EditorState.createEmpty()
        }]);
        setprTotal(1);
        setsData(EditorState.createEmpty());
        setaData(EditorState.createEmpty());
    }

    const handlePrev = () => {
        setPage(page-1)
    }

    const handleFinish = () => {
        console.log('finish');
        setShow(false);
        setShowDrawer(true);
    }

    const handleNext = () => {
        console.log(page);
        if(page === titles.length-1)
            handleFinish();
        else {
            if(page === 0) {
                if(isEmpty(pData.name, "Name") === '' && isEmail(pData.email) === '' && isPhone(pData.phone, 'Contact No') === '' && isEmpty(pData.city, "City") === '' && isEmpty(pData.country, "Country") === '') {
                    setPage(page+1);
                }
            }
            if(page === 1) {
                let flg = false;
                for(let i=0;i<exTotal;i++) {
                    if(!(isEmpty(exData[i].name, "Company") === '' && isEmpty(exData[i].role, "Job Profile") === '' && isEmpty(exData[i].city, "City") === '' && ((!exData[i].current && isEmpty(exData[i].end, "Ending") === '') || exData[i].current)))
                       flg = true; 
                }
                if(!flg)
                    setPage(page+1);
            }
            if(page === 2) {
                let flg = false;
                for(let i=0;i<etotal;i++) {
                    if(!(isEmpty(eData[i].name, "Institute") === '' && isEmpty(eData[i].degree, "Degree") === '' && isEmpty(eData[i].city, "City") === '' && isEmpty(eData[i].start, "Joining") === '' && isEmpty(eData[i].end, "Ending") === ''))
                        flg = true;
                }
                if(!flg)
                    setPage(page+1);
            }
            if(page === 3) {
                setPage(page+1)
            }
            if(page === 4) {
                let flg = false;
                for(let i=0;i<prTotal;i++) {
                    if(!(isEmpty(prData[i].name, "Name") === ''))
                        flg = true;
                }
                if(!flg)
                    setPage(page+1);
            }
        }
    }

    useEffect(() => {
        console.log('uf1:',loading);
        setLoading(true);
        console.log('uf2:',loading);
        // setLoading(false);
        axios.get(`http://localhost:5000/user/getresume/${email}`)
        .then((res) => {
            setpdfs(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
            NotificationManager.error('Problem to fetch', 'Error', 3000);
        })
    }, [])

    const handleOpen = async () => {
        const newExArr = [...exData];
        for(let i=0;i<exTotal;i++) {
            if(newExArr[i]['description'] !== undefined)
                newExArr[i]['description'] = draftToHtml(convertToRaw(exData[i]['description'].getCurrentContent()))
            else 
                newExArr[i]['description'] = '';
        }
        setexData(newExArr);
        const newEArr = [...eData];
        for(let i=0;i<etotal;i++) {
            if(newEArr[i]['description'] !== undefined)
                newEArr[i]['description'] = draftToHtml(convertToRaw(eData[i]['description'].getCurrentContent()))
            else 
                newEArr[i]['description'] = '';
        }
        seteData(newEArr);
        const newPrArr = [...prData];
        for(let i=0;i<prTotal;i++) {
            if(newPrArr[i]['description'] !== undefined)
                newPrArr[i]['description'] = draftToHtml(convertToRaw(prData[i]['description'].getCurrentContent()))
            else 
                newPrArr[i]['description'] = '';
        }
        setprData(newPrArr);
        console.log(sdescription);
        await axios.post(`http://localhost:5000/user/resume/${userId}`, {
            pData: pData,
            aboutme: aboutme === undefined ? '' : draftToHtml(convertToRaw(aboutme.getCurrentContent())),
            exData: exData,
            eData: eData,
            prData: prData,
            sdescription: sdescription === undefined ? '' : draftToHtml(convertToRaw(sdescription.getCurrentContent())),
            adescription: adescription === undefined ? '' : draftToHtml(convertToRaw(adescription.getCurrentContent())),
            github: 'https://www.github.com/dewanshiPaul',
            linkedin: 'linkedin/dewanshipaul'
        }, {
            responseType: 'text/html'
        })
        .then((res) => {
            sessionStorage.setItem('resume', res.data);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('email', email);
            var win = window.open(`http://localhost:3000/template/${userId}`, '_blank');
            win.focus();
        })
        .catch((err) => {
            console.error(err);
        })
    }

    return (
        <div className="resume-container">
            <div className="container">
                { !show ?
                    !showDrawer ?
                        <div className="resume-pdf-container">
                            { !loading ?
                                pdfs?.map((d,i) => {
                                    const blob = base64ToBlob(d.pdf);
                                    const url = URL.createObjectURL(blob);
                                    return (
                                        <div key={i}>
                                            <iframe
                                                src={url}
                                                style={{
                                                    width: "100%",
                                                    height: "60vh"
                                                }}
                                                title={i}
                                            />
                                        </div>
                                    )
                                })
                                :
                                <div 
                                    style={{
                                        position: 'absolute',
                                        left: '50%'
                                    }}
                                >
                                    <Loading 
                                        h={"70"}
                                        w={"100"}
                                    />
                                </div>
                            }
                        </div>
                        :
                        null
                    :
                    <div className="form-container">
                        <div className="heading">
                            <Typography variant="h6">
                                {titles[page]}
                            </Typography>
                            <CloseIcon 
                                onClick={()=>setShow(false)}
                                className="close"
                            />
                        </div>
                        <div className="form">
                            {pageDisplay(page)}
                            <div className="button-footer">
                                {
                                    page === 0 ?
                                    null:
                                    <RippleButton
                                        onClick={handlePrev}
                                    >
                                        <Typography variant="body1">
                                            Previous
                                        </Typography>
                                    </RippleButton>
                                }
                                <RippleButton
                                    onClick={handleNext}
                                >
                                    <Typography variant="body1">
                                        {page === titles.length-1 ? "Finish":"Next"}
                                    </Typography>
                                </RippleButton>
                            </div>
                        </div>
                    </div>
                }
            </div>
            { show ?
                null
                :
                showDrawer ?
                    null
                    :
                    <div className="new-resume-container">
                        <RippleButton
                            onClick={()=>setShow(true)}
                        >
                            <div 
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <AddIcon />
                                <Typography variant="subtitle1">
                                    Create
                                </Typography>
                            </div>
                        </RippleButton>
                    </div>
            }
            {
                showDrawer ?
                <>
                    <div className="templates-container">
                        <div className="heading">
                            <Typography variant="h6">
                                Resume Templates
                            </Typography>
                            <CloseIcon 
                                onClick={()=>{
                                    handleToSetInitial();
                                    setPage(0);
                                    setShow(false);
                                    setShowDrawer(false);
                                }}
                                className="close"
                            />
                        </div>
                        <div className="templates">
                            <div className="container">
                                <img src={TEMPLATE_1} alt="template1" height={"50%"} />
                                <RippleButton
                                    onClick={handleOpen}
                                >
                                    Select
                                </RippleButton>
                            </div>
                        </div>
                    </div>
                </>
                :
                null
            }
            <NotificationContainer />
        </div>
    )
}