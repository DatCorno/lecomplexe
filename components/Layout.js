import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from './Header';

function Layout(props) {
    const body = "body{display:initial}";

    return (
        <div>
            <Head>
                <title>Le Complexe</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet"  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
                <style>{body}</style>
            </Head>
            <Container className="p-3">
                <Row className="justify-content-md-center">
                    <Col>
                        {props.children}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Layout;
