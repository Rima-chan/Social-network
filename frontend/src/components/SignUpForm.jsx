import { Component } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { connect } from 'react-redux';
import * as fetchActions from '../store/actions/fetchActions';

class SignUpForm extends Component {
    render() {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        return(
    <div className="rounded border bg-white md:w-1/3 shadow-lg my-8 mx-3 px-5">
        <h1 className="border-b-2 text-center text-xl my-3 pt-2 pb-3">Inscription</h1>
        <Formik
          initialValues={{username: "", email: "", password: ""}}
          validate={(values) => {
              const errors = {};
              if(!values.username) {
                  errors.username = "Champs requis"
              }
              if (!values.email) {
                  errors.email = "Champs requis"
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = "Veuillez rentrer un email valide"
              }
              if(!values.password) {
                  errors.password = "Champs requis"
              }
              return errors;
          }}
          onSubmit={(values, { setSubmitting}) => {
              console.log(values);
              const url = 'http://localhost:8080/api/users/signup';
              this.props.onPostData(url, JSON.stringify(values,), axiosConfig, {...this.props});
              values.username = "";
              values.password ="";
              values.email="";
              setSubmitting(false);
          }}
        >
            {({ isSubmitting, dirty, handleReset }) => (
                <Form className="pb-5" method="post" encType="application/x-www-form-urlencoded">
                    <div className="mb-5">
                        <label htmlFor="UsernameInput">Pseudo</label>
                        <Field 
                          type="text"
                          name="username"
                          id="UsernameInput"
                          required
                          className="py-2 px-2 mt-2 shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline">
                          </Field>
                        <ErrorMessage 
                          name="username"
                          component="span"
                          required
                          className="text-sm text-red-600 pl-2"/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="EmailInput">Email</label>
                        <Field 
                          type="email"
                          name="email"
                          id="EmailInput"
                          required
                          className="py-2 px-2 mt-2 shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline"
                          ></Field>
                        <ErrorMessage 
                          name="email"
                          component="span"
                          className="text-sm text-red-600 pl-2"/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="PassInput">Mot de passe</label>
                        <Field 
                          type="password"
                          name="password"
                          id="PassInput"
                          className="py-2 px-2 mt-2 shadow appearance-none border rounded w-full text-gray-700 focus:outline-none focus:shadow-outline"
                          ></Field>
                        <ErrorMessage 
                          name="password" 
                          component="span"
                          className="text-sm text-red-600 pl-2"/>
                    </div>
                    <div className="flex items-center justify-between ">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          aria-label="S'inscrire"
                          className="rounded text-white inline-bloc shoadow-lg bg-gray-700 px-4 py-2"
                          >S'inscrire</button>
                        <Link to="/" >Déjà inscrit ?</Link>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
        )}
}

const mapStateToProps = (state) => {     
    return {  
       data: state     
    } 
}
const mapDispatchToProps = (dispatch) => {
     return {
         onPostData: (url, user, config, props) => dispatch(fetchActions.postData(url, user, config, props))     
    } 
} 
export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

