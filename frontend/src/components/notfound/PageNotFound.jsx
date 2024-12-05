// import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function PageNotFound() {
  const styles = {
    container: {
      color: "orange",
      textAlign: "center",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      
    },
    img: {
      width: "500px",
      height: "300px",
    },
    btn: {
        color: "white",            // Text color
        fontSize: "15px",          // Font size
        textDecoration: "none",    // Remove underline
        backgroundColor: "orange",  // Button background
        padding: "10px 20px",      // Button padding
        borderRadius: "5px",       // Rounded corners
        margin: "20px",            // Margin around the button
        display: "inline-block",
    },
  };

  return (
    <Container style={styles.container}>
      <h1>You Have Gone To The Zoo</h1>
      <img
        style={styles.img}
        src="https://internetdevels.com/sites/default/files/public/blog_preview/404_page_cover.jpg"
        alt="not found"
      />
      <div>
        <Link to="/" style={styles.btn}>
          Go Home
        </Link>
      </div>
    </Container>
  );
}

export default PageNotFound;