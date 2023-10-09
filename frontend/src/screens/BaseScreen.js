import { Container } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BaseScreen({children}) {
    return (
        <>
        <Header />
        <Container>
            
                <main>
                {children}
                </main>

        </Container>
        <Footer />
        </>

    )
}