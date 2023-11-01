
import "../App.css"

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export const SaveFiles = ({ addData }) => {

    const [file, setFile] = useState(null);
    console.log('file:', file)

    const handleChange = (event) => {
        console.log('event.target.file:', event.target.files);

        setFile(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);
        console.log('formData:', formData)
        const res = await axios.post("http://localhost:8080/api/product/file-upload", formData, {
            headers : {
                'Content-Type': 'multipart/form-data'
            }
        })
        // console.log('res:', res)
        if(res.data.status) {
            toast.success(`Your ${res.data.result.name} file has been uploaded successfully`);
            addData(true);

            setFile(null)
        } else {

            toast.error("There might be some problem");
        }
    }

    return (
        <div className="saveFile_container">
            <h4>Save Files</h4>
            <div className="form_Container">

                <form onSubmit={handleSubmit}>
                    <input type="file" name="" accept=".jpg, .jpeg, .png, .pdf" id="" onChange={handleChange} />
                    <button type="submit">Upload File</button>
                </form>
            </div>
            <Toaster />
        </div>
    )

}