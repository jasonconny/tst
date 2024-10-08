import React from 'react';
import './App.scss';
import { usePersistedFormValues } from './hooks/usePersistedFormValues';

function App() {
  const [showPasswordError, setShowPasswordError] = React.useState(false);
  const [showPasswordMatch, setShowPasswordMatch] = React.useState(false);
  const [signUpFormValues, setSignUpFormValues] = usePersistedFormValues('signUpForm', {
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { password, confirmPassword } = signUpFormValues;
    setShowPasswordError(password !== confirmPassword);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setSignUpFormValues((prevState: any) => {
      const updatedValues = {...prevState, [name]: value};
      const {password, confirmPassword} = updatedValues;

      if (password !== '' && confirmPassword !== '') {
        setShowPasswordMatch(password === confirmPassword);
        if (password === confirmPassword) {
          setShowPasswordError(false);
        }
      }

      return updatedValues;
    });
  };

  return (
    <div className="App">
      <form className="Form" onSubmit={handleSubmit}>
        <input
          className="Form__input"
          name="username"
          onChange={handleChange}
          placeholder="Username"
          type="text"
          value={signUpFormValues.username}
        />

        <input
          className="Form__input"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          type="password"
          value={signUpFormValues.password}
        />

        <input
          className="Form__input"
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Confirm Password"
          type="password"
          value={signUpFormValues.confirmPassword}
        />

        {showPasswordMatch && (
          <div>
            Passwords match
          </div>
        )}

        {showPasswordError && (
          <div className="Form__error-message">
            Passwords do not match
          </div>
        )}

        <button className="Form__submit-button" type="submit">Submit</button>
      </form>

    </div>
  );
}

export default App;
