import React, { useState } from 'react';

function AddTeamForm() {
  // State for the form inputs
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  // Handle input changes
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (name === '' || link === '') {
      alert("Please fill in both fields.");
      return; // Prevent submission if any field is empty
    }

    const newTeamMember = {
      name,
      link,
    };

    // Log the new team member (this can be replaced with an actual action, like sending data to an API)
    console.log('New Team Member:', newTeamMember);

    // Clear the form fields after submission
    setName('');
    setLink('');
  };

  return (
    <div>
      <h1>Add Team</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type="text"
            id='name'
            name='name'
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor='link'>GitHub Link</label>
          <input
            type="text"
            id='link'
            name='link'
            value={link}
            onChange={handleLinkChange}
          />
        </div>
        <button type='submit'>Add Team</button>
      </form>
    </div>
  );
}

export default AddTeamForm;
