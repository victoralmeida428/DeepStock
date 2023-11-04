import { Table } from "react-bootstrap";

export default function CustomTable(props) {
    return (
        <Table className="mt-2" striped>
            <thead>
                <tr>
                    <td key='indicador'>Indicator</td>
                    <td key='value'>Value</td>
                </tr>
            </thead>
            <tbody>
                {props.body()}
            </tbody>
                        
        </Table>
    )
}
