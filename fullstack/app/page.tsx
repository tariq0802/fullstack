import Container from "@/app/components/Container";
import Image from "next/image";
import Uploader from "./Uploader";
import PdfUploader from "./PdfUploader";

export default function Home() {
  
  
  return (
    <Container>
      <div className="mt-24">Home</div>
      <Uploader />
      <PdfUploader />
    </Container>
  );
}
