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
            <Row className="gx-0" >
                <Col sm={12} className={menu === true ? "col-md-2" : style.colunaOculta}><Menu menu={menu} /></Col>
                <Col className={classNames({
                    [style.mainReduzido]: menu === true,
                    "col-md-7": menu === true,
                    "col-md-10": menu === false
                })}><Outlet /></Col>
                <Col><Sidebar /></Col>
            </Row>
        </div >
    )
}