<!--
/*Authors: Zach Walton
*          Ireoluwa Omotoso
* Student IDs: 100826058
*              100849367
* Date Completed: 01-30-2023
* */
-->
      const form = document.querySelector('form');
      const userName = document.querySelector('#contactName');
      const passwordInput = document.querySelector('#password');

      // Add event listener to form submission
      form.addEventListener('submit', (event) => 
      {
        event.preventDefault(); // Prevent form submission

        const username = userName.value.trim();
        const password = passwordInput.value.trim();

        // Check if username and password are not empty

        if (username === '' || password === '') 
        {
          alert('Please enter a username and password.');
        } 
        else 
        {
          // Submit form
          form.submit();
        }
    });