
import "../App.css"

import { useState, useEffect } from "react";
import axios from "axios";

export const GetFile = ({ fetch, addData }) => {

    const [files, setFiles] = useState([]);
    console.log('files:', files)

    useEffect(() => {

        getAllFiles();
    }, [fetch]);

    const getAllFiles = async () => {
        const res = await axios.get("http://localhost:8080/api/product/get-all-product");
        console.log('res:', res)
        if (res.data.status) {
            setFiles(res.data.result);
            addData(false);
        }
    }

    return (
        <div className="getFile_container">
            <button onClick={getAllFiles}>Get Updated Files</button>
            <div className="showFile_container">
                <table>
                    <tr>
                        <th>File Name</th>
                        <th>File Url</th>
                    </tr>
                    {files?.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td>{element.fileName}</td>
                                <td><a href={element.url}>{element.url}</a></td>
                            </tr>
                        )
                    })}

                </table>
            </div>
        </div>
    )

}