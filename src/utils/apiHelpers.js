import axios from 'axios';

const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL
const JWT = import.meta.env.VITE_PINATA_JWT


export const postData = async (formData) => {
    try {
        const resp = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${JWT}`,
                },
            }
        );
        console.log("IPFS Response Api", resp.data);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
};


export const getData = async (ipfsHash) => {
    try {
        const resp = await axios.get(`${GATEWAY_URL}/ipfs/${ipfsHash}`);
        return resp.data;
    } catch (error) {
        console.log(error);
    }
}