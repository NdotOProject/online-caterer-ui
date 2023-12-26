import Row from "../../components/Row";
import Column from "../../components/Column";

function Footer() {
    return (
        <Column>
            <Row>
                <div className="col-md-6 contact-section">
                    <h3>Contact Us</h3>
                    <p>19 Lê Thanh Nghị, Bạch Mai, Hai Bà Trưng, Hà Nội</p>
                    <p>Email: info@onlinecaterer.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
                <div className="col-md-6 map-section">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.740372925
      564!2d105.8500153!3d21.0030419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s
      0x3135ac748cee8b8d%3A0x2916773f4229fd1d!2zMTkgUC4gTMOqIFRoYW5oIE5naOG7iywgQuG6oWN
      oIE1haSwgSGFpIELDoCBUcsawbmcsIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1702558670438!5m2!1svi!2s"
                            width="800" height="200"
                            style={{border: "0"}} allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </Row>
            <hr style={{borderColor: "#777"}}/>
            <p>© 2023 Online Caterer. All Rights Reserved.</p>
        </Column>
    );

}

export default Footer;