import style from './PaginaPadrao.module.scss';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Header from 'components/Header';
import Menu from 'components/Menu';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import classNames from 'classnames';
import Container from 'react-bootstrap';

export default function PaginaPadrao() {
    const [menu, setMenu] = useState(true);
    return (
        <div>
            <Row>
                <Col sm={12}>
                    <Header menu={menu} setMenu={setMenu} />
                </Col>
            </Row>
            <Row className={classNames({
                "gx-0": true,
                [style.rowFlex]: true
            })} >
                <Col sm={12} className={menu === true ? "col-md-3" : style.colunaOculta}><Menu menu={menu} /></Col>
                <Col className="col-md-7"><Outlet /></Col>
                <Col md={2}><Sidebar /></Col>
            </Row>
        </div >
    )
}