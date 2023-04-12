import { useEffect, useState } from 'react';
import './index.scss';
import { Editor } from 'react-draft-wysiwyg';

function Input({ type, value, placeholder, handleChange, text, id, validate }) {
    return (
        <div className={"input-container"}>
            <input 
                type={type} 
                autoComplete="off" 
                value={value} 
                placeholder={placeholder}
                onChange={handleChange}
                className={validate ? 'input-container_input':"input-container_input error"}
                id={id}
            />
            <label className={validate ? "input-container_label":"input-container_label error"} htmlFor={id}>
                    {text}
            </label>
        </div>
    )
}

function SimpleInput({ type, value, placeholder, handleChange, text, id }) {
    return (
        <div className="simple-input-container">
            <input 
                type={type} 
                autoComplete="off" 
                value={value} 
                placeholder={placeholder}
                onChange={handleChange}
                className='simple-input-container_input'
                id={id}
            />
        </div>
    )
}

function RippleButton({children, onClick}) {
    const [coords, setCoords] = useState({x:-1, y:-1});
    const [isRipple, setIsRipple] = useState(false);

    useEffect(() => {
        if(coords.x !== -1 && coords.y !== -1) {
            setIsRipple(true);
            setTimeout(() => {
                setIsRipple(false);
            }, 300);
        } else 
            setIsRipple(false);
    }, [coords]);

    useEffect(() => {
        if(!isRipple)
            setCoords({x:-1,y:-1});
    }, [isRipple]);

    const handleRipple = (e) => {
        const rect = e.target.getBoundingClientRect();
        setCoords({
            x: e.clientX-rect.left,
            y: e.clientY-rect.top,
        });
        onClick && onClick(e);
    }

    return (
        <button
            className='ripple-button'
            onClick={(e) => {
                handleRipple(e);
            }}
        >
            {isRipple ? (
                <span 
                    className='ripple'
                    style={{
                        left: coords.x,
                        top: coords.y,
                    }}
                />
            ) : (
                '' 
            )}
            <span className='content'>{children}</span>
        </button>
    )
}

function EditorDesc({editor, setEditor}) {
    return (
        <div>
            <Editor
                editorState={editor}
                wrapperClassName='editor-desc'
                editorClassName='editor-ed'
                onEditorStateChange={setEditor}
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'link'],
                    inline: {
                      options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                      bold: { className: 'bordered-option-classname' },
                      italic: { className: 'bordered-option-classname' },
                      underline: { className: 'bordered-option-classname' },
                      strikethrough: { className: 'bordered-option-classname' },
                      code: { className: 'bordered-option-classname' },
                    },
                    blockType: {
                      className: 'bordered-option-classname',
                    },
                    fontSize: {
                      className: 'bordered-option-classname',
                    },
                    fontFamily: {
                      className: 'bordered-option-classname',
                    },
                    list: {
                        options: ['unordered', 'ordered'],
                        unordered: { className: 'bordered-option-classname' },
                        ordered: { className: 'bordered-option-classname' },
                    }, 
                    link: {
                        options: ['link'],
                        link: { className: 'bordered-option-classname' },
                    }
                }}
            />
        </div>
    )
}

export {Input, RippleButton, SimpleInput, EditorDesc};