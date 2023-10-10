import { Table } from "react-bootstrap";

export default function TableInfo({data}) {
    const keys = Object.keys(data[0])
    const head = keys.map((e)=><td key={e}>{e}</td>)
    const body = data.map((row, index)=>{
        return (
            <tr key={index}>
                {keys.map((col)=><td keys={`${index}-${row[col]}`}>{row[col]}</td>)}
            </tr>
        )
    })
    return (
        <Table striped>
            <thead>
                {head}
            </thead>
            <tbody>
                {body}
            </tbody>
        </Table>
    )
}