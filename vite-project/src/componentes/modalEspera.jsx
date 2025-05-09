import styled from 'styled-components';
import React, { Children } from 'react';

const ModalEspera = ({ children, estado }) => {
    return (
        <>
            {estado &&
                <Overlay>
                    <ContenedorModal>
                        <EncabezadoModal>

                        </EncabezadoModal>




                        {children}
                    </ContenedorModal>

                </Overlay>
            }
        </>
    )
}

export default ModalEspera;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContenedorModal = styled.div`
    width: 300px;
    min-heigth: 100px;
    background: rgba(255, 255, 255, 0.1); /* blanco pero súper transparente */
    backdrop-filter: blur(10px); /* efecto esmerilado */
    position:relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111, 0.2) 0px 7px 29px 0px;
    padding: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
`;
const EncabezadoModal = styled.div`
    display: flex;
    align-items: center;
    justyfy-content: space-between;
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #E8E8E8;

`;
