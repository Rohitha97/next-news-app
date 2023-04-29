import { useRouter } from "next/router";
import { NewsArticle } from "@/models/NewsArticles";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button, Container, Form, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";

const NavBar = () => {
  const router = useRouter();

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("searchQuery")?.toString().trim();
    if (query) {
      try {
        router.push("/search?q=" + query);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="sm" collapseOnSelect>
      <Container>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Brand href="/">Next News App</Navbar.Brand>

        <Navbar.Collapse id="main-navbar" className="justify-content-left">
          <Nav>
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            <NavDropdown title="Categories" id="category-dropdown">
              <NavDropdown.Item as={Link} href="/categories/business">
                Business
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/categories/entertainment">
                Entertainment
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/categories/technology">
                Technology
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/categories/science">
                Science
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/categories/sports">
                Sports
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Form className="d-flex" onSubmit={handleFormSubmit}>
          <Form.Control name="searchQuery" className="me-2" type="text" placeholder="Eg. politics, sports" />
          <Button type="submit" variant="outline-light">
            🔍
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default NavBar;
