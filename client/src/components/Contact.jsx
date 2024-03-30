import contactImageSrc from '../img/contact.png';
import '../styles/Contact.css';

function Contact() {
  return (
    <div className="container">
      <div className="row">
        <div className="bg-info">
          <h3>Contact Us</h3>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-md-8">
          <div className="mt-3">
            <h3 className="text-primary">How to contact us</h3>
            <h5>+555 55 55</h5>
            <h5>+22 22 22</h5>
          </div>
          <div className="mt-3">
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="please enter your name"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Your Message</label>
              <input
                type="text"
                className="form-control"
                placeholder="please enter your message"
              />
            </div>
            <button className="btn-outline-primary">Send</button>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <img
            src={contactImageSrc}
            alt="about"
            className="img-fluid about-img"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
