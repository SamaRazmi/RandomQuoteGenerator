import QuoteImg from '../img/bg_quote.jpg';
import '../styles/MainContainer.css';

const MainContainer = () => {
  return (
    <div className="main-container">
      <div className="right">
        <h2>Quote Manager</h2>
        <p>
          Quote Manager is an interactive tool designed to manage and display
          collections of quotes. With Quote Manager, users can create, update,
          and delete multiple lists of quotes, each categorized by themes such
          as wisdom, motivation, love, and success. The application offers a
          user-friendly interface for adding, deleting, and updating quotes
          within each list, allowing users to customize their collections to
          suit their preferences and interests.
        </p>
        <p>
          In addition to managing quotes, Quote Manager provides features for
          displaying quotes lists on a web page, enabling users to view and
          explore quotes within each list. Users can also save their quotes
          lists to JSON files and load them back into the application, providing
          a convenient way to store and share their collections.
        </p>
        <p>
          Quote Manager prioritizes ease of use and functionality, offering
          intuitive navigation and seamless interaction. It leverages React
          components to create a responsive and dynamic user experience, while
          also implementing persistence through reading from and writing to JSON
          files for data storage.
        </p>
        <p>
          With Quote Manager, users can embark on a journey of discovery and
          inspiration, exploring a diverse range of quotes from various authors,
          philosophers, and leaders. Whether seeking guidance, motivation, or
          reflection, Quote Manager serves as a valuable tool for personal
          growth and enlightenment.
        </p>
      </div>
      <div className="left">
        <img src={QuoteImg} alt="Quote Manager" />
      </div>
    </div>
  );
};

export default MainContainer;
