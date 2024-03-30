import PropTypes from 'prop-types'; // Import PropTypes
const AdminProfile = ({ user }) => {
  return (
    <div>
      <h2>Welcome to the Admin Profile, {user && user.username}!</h2>
      {/* Add content for the admin profile */}
    </div>
  );
};
// Define PropTypes for MenuBar component
AdminProfile.propTypes = {
  user: PropTypes.string, // Validate user prop as an object
};
export default AdminProfile;
