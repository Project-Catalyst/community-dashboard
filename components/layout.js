import Head from 'next/head';
// import styles from './layout.module.css';
import Link from 'next/link';
import { Button, Card, Container, Image, Nav, Navbar } from 'react-bootstrap';
import {FaGithub, FaTwitter, FaTelegram} from "react-icons/fa"

export default function Layout({ children, home }) {
  return (
    <div className="container">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="community dashboard showing CA and vCA progress and stats"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      
      {/* NAVBAR */}
      <>
        <Navbar fixed="top" bg="dark" variant="dark">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="/favicon.ico"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
            Catalyst Community Dashboard
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              {/* <Navbar.Text>
                <p>INSERT PA-PROCESS COUNTING</p>
              </Navbar.Text> */}
            </Navbar.Collapse>
        </Navbar>
      </>

      {/* MESSAGE CARD */}
      <div style={{'padding-top': '100px'}}>
        <Card className="text-center">
          <Card.Header as="h5">AIM Catalyst Community Dashboard</Card.Header>
          <Card.Body>
            {/* <Card.Title>Welcome PAs and community members,</Card.Title> */}
            <Card.Text>
              <b>Welcome PAs and community members,</b>
              <br/>This is a new AIM tool to provide information on the on-going PA Process Progress and vCA Reviews. 
              <br/>The charts here presented are a work in progress. 
              <br/>Please, bear with us while we work on some needed experience updates.
            </Card.Text>
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
          {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
        </Card>
      </div>

      {/* MAIN VIEW */}
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}

      {/* AIM FOOTER */}
      <div>
        <Nav className="justify-content-center">
          <Nav.Item>
            <p><br/> Made by Catalyst Community for the Catalyst Community</p>
          </Nav.Item>
        </Nav>
      </div>
      <Image
        img src={"/faviconAIM.png"}
        height={150}
        width={150}
        className="rounded mx-auto d-block"
      />
      <div>
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link href="https://cardanoscan.io/pool/b61f05ec1e907ab9b069eaec6c664056c16f56cab59076109c66d2ae" target="_blank">
              <p style={{fontSize: '1.5rem'}}>
                <span style={{fontWeight: 'bold'}}>Stake with [AIM] pool </span>
              </p>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <div>
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link href="https://github.com/Project-Catalyst/community-dashboard" target="_blank">
              <FaGithub size={35}/>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="https://twitter.com/AimCardano" target="_blank">
              <FaTwitter size={35}/>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="https://t.me/joinchat/Ivl50eWG7r0zODI1" target="_blank">
              <FaTelegram size={35}/>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </div>
  );
}