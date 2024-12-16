import { styled } from "@mui/material";


const Iframe = styled("iframe")({
    height: "50vh",
    width: "100%",
    border: "none",
    overflow: "hidden"
})
const PDFPreview = ({ file }: {file: string}) => {
    return (
        <Iframe
            src={file}
            title="PDF Preview"            
        />
    );
};

export default PDFPreview;
