import React from 'react';
import { Container } from 'react-bootstrap';
import homeBackground from "../../src/images/Logo.png";

const PrimeiraPagina = () => {

    return (
        <Container>
            <img src={homeBackground}
                style={{
                    marginTop: '12vh',
                    marginRight:'7vw'
                }}
            />
        </Container>
    )
};

export default PrimeiraPagina;