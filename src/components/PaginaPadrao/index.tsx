import style from './PaginaPadrao.module.scss';
import { Col } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import Header from 'components/Header';
import Menu from 'components/Menu';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

export default function PaginaPadrao() {

    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    const [menu, setMenu] = useState(true);

    useEffect(() => {
        if (isMobile) {
            setMenu(false)
        }
    }, [])

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
                <Col sm={12} md={3} className={menu ? '' : style.colunaOculta}><Menu menu={menu} /></Col>
                <Col md={7}><Outlet /></Col>
                <Col md={2}><Sidebar /></Col>
            </Row>
        </div >
    )
}