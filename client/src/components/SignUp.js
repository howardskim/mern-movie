import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions/index';

class SignUp extends Component {
    onSubmit = (formProps) => {
        this.props.signup(formProps, () => {
            this.props.history.push('/favorites')
        })
    }
    componentDidMount(){
      //handles sidebar closing
        this.props.handleReset();
    }
    componentWillUnmount(){
      this.props.resetErrorMessage();
    }
    render() {
      console.log('sign up props ', this.props);
        const { handleSubmit } = this.props;
        return (
          <form onSubmit={handleSubmit(this.onSubmit)} className="sign-up-form">
            <fieldset>
              <label>Email: </label>
              <Field 
                name="email"
                type="text"
                component="input"
                autoComplete="none"
              />
            </fieldset>
            <fieldset>
              <label>Password: </label>
              <Field 
                name="password"
                type="password"
                component="input"
                autoComplete="none"
              />
            </fieldset>
            <div className="white">
                {this.props.errorMessage}
            </div>
            <button className="btn btn-primary" type="submit">Sign Up</button>
          </form>
        );
    }
}

function mapStateToProps(state){
    return {
        errorMessage: state.auth.errorMessage
    }
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({
        form: 'signup'
    })
)(SignUp)


