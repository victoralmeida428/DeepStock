import { Alert } from "react-bootstrap";

export default function Message({ variant, children }) {
    return (
        <Alert className='mt-3' variant={variant}>
            {children}
        </Alert>
    )

  }