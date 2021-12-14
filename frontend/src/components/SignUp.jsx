import React from 'react';
import { withFormik } from 'formik'

class Basic extends React.Component {
  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form>
          <input type="email" name="email" />
          <input type="password" name="password" />
          <button type="submit">
            Submit
              </button>
        </form>
      </div>
    )
  }
};

const Form = withFormik({
  validate(values) {
    const errors = {}

    if (!values.email) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
    return errors;
  },
  handleSubmit(values, { props, setSubmitting }) {
          setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
  },
})(Basic)

export default Form;