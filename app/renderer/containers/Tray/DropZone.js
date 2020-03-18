import React, { useCallback } from 'react';
import _ from 'lodash';

import { useDropzone } from 'react-dropzone';

const DropZone = ({ props }) => {
    const { setFiles, setTags } = props;  

    const getTags = (acceptedFiles) => {
        let paths = acceptedFiles.map(file => file.path);
        let tags = []
        paths.forEach((path, i) => {
            let folderPath = path.slice(0, path.indexOf(acceptedFiles[i].name));
            let split = (_.split(folderPath, '\\', acceptedFiles.length));
            split.forEach(val => {
                if (!tags.includes(val) && val !== '') {
                    tags.push(val)
                }
            })
        })
        console.log(tags)
        setTags(tags);        
    }

    const onDrop = useCallback(acceptedFiles => {
        getTags(acceptedFiles);
        setFiles(acceptedFiles);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div id='trayBody'>
            <div {...getRootProps()}
                id='dropZone'>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <div>
                            <p>Drag 'n' drop files here</p>
                            <p>or</p>
                            <p>click to select</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default DropZone;