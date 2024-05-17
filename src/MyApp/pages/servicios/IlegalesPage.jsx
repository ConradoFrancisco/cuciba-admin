import PageHeader from "components/common/PageHeader";
import { useEffect } from "react";
import { Row,Col } from "react-bootstrap";
import IlegalesInstance from "services/servicios/IlegalesService";

export default function IlegalesPage(){

    
    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await IlegalesInstance.getAll();
                console.log(response)
            }catch(e){
                console.log(e)
            }
        }
        fetchData();
    },[])

    return (
        <>
        <PageHeader title="Inmobiliarias ilegales"></PageHeader>
        <Row>
            <Col xl={12}>

            </Col>
        </Row>
        </>
    )
}