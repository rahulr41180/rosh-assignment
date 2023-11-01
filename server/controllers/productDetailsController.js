
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

const azure = require("azure-storage");
const accountName = process.env.ACCOUNT_NAME;
const accountKey = process.env.ACCOUNT_KEY;
const containerName = process.env.CONTAINER_NAME;
const stream = require("stream");
const blobsService = azure.createBlobService(accountName, accountKey);

// Function For Uploading Files


const productDetailsUpload = async (req, res) => {

    try {
        // console.log('req.file:', req.file)
        const blobName = req.file.originalname;
        // console.log('blobName:', blobName)

        const passThroughStream = new stream.PassThrough();
        passThroughStream.end(req.file.buffer);

        blobsService.createBlockBlobFromStream(containerName, blobName, passThroughStream, req.file.size, (error, result, response) => {

            if(error) {
                console.error("Error uploading :", error);
                return res.status(500).send({
                    status : false,
                    error : error
                })
            } else {

                return res.status(201).json({
                    status : true,
                    result : result
                })

            }
        })
    } catch (error) {
        res.status(500).send({

            status: false,
            error: error.message
        })
    }
}

// Function For Getting All Files
const getProductFiles = async(req, res) => {
    try {

        blobsService.listBlobsSegmented(containerName, null, (error, result, response) => {
            if(error) {
                return res.status(500).send({
                    status : false,
                    error : error
                })
            } else {
                const files = result.entries.map((element) => {
                    return {

                        fileName : element.name,
                        url : blobsService.getUrl(containerName, element.name)
                    }
                })
                return res.status(200).send({
                    status : true,
                    result : files
                })
            }
        })
    } catch(error) {
        res.status(500).send({
            status: false,
            error: error.message
        })
    }
}

module.exports = {
    
    productDetailsUpload,
    getProductFiles
}