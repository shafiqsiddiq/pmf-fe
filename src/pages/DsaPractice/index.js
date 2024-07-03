import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const DsaPractice = () => {
    const MY_DATA_ARRAY = [10, 20, 30, 40, 50, 60]
    const [findValue, setFindValue] = useState()
    const handleSearchValue = () => {

    }

    return (
        <>
            <Row>
                <Col lg={4}>
                    <input type='text' placeholder='enter the search value' value={findValue} onChange={(e) => setFindValue(e.target.value)} className='form-control' />
                </Col>
                <Col lg={4}>
                    <Button onClick={() => handleSearchValue()}>Find Value</Button>
                </Col>
                <Col lg={4}>
                    {MY_DATA_ARRAY.map((item) => {
                        return (
                            <>{
                                `Value at index${item}`
                            }</>
                        )
                    })}
                </Col>
            </Row>

        </>
    )
};

export default DsaPractice;
