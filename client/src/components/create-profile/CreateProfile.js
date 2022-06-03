import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';
import { withRouter } from 'react-router-dom';



class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}

        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

  render() {
      const { errors, displaySocialInputs } = this.state;

      let socialInputs;

      if (displaySocialInputs) {
          socialInputs = (
              <div>
                  <InputGroup 
                      placeholder='Twitter url'
                      name='twitter'
                      icon='fab fa-twitter-square'
                      value={this.state.twitter}
                      onChange={this.onChange}
                      error= {errors.twitter}
                  />
                  <InputGroup 
                      placeholder='Facebook url'
                      name='facebook'
                      icon='fab fa-facebook-square'
                      value={this.state.facebook}
                      onChange={this.onChange}
                      error= {errors.facebook}
                  />
                  <InputGroup 
                      placeholder='Linkedin url'
                      name='linkedin'
                      icon='fab fa-linkedin'
                      value={this.state.linkedin}
                      onChange={this.onChange}
                      error= {errors.linkedin}
                  />
                  <InputGroup 
                      placeholder='Instagram url'
                      name='instagram'
                      icon='fab fa-instagram-square'
                      value={this.state.instagram}
                      onChange={this.onChange}
                      error= {errors.instagram}
                  />
                  <InputGroup 
                      placeholder='Youtube url'
                      name='youtube'
                      icon='fab fa-youtube-square'
                      value={this.state.youtube}
                      onChange={this.onChange}
                      error= {errors.youtube}
                  />
                      
                  
              </div>
          )
      }

      // select options for status
      const options = [
          { label: '* Select professional status', value: 0 },
          { label: 'Developer', value: 'Developer' },
          { label: 'Junior Developer', value: 'Junior Developer' },
          { label: 'Senior Developer', value: 'Senior Developer' },
          { label: 'Manager', value: 'Manager' },
          { label: 'Student', value: 'Student' },
          { label: 'Teacher', value: 'Teacher' },
          { label: 'Intern', value: 'Intern' },
          { label: 'Other', value: 'Other' }
      ];

    return (
      <div className='create-profile'> 
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 m-auto'>
                    <h1 className='display.4 text-center'>Create your profile</h1>
                    <p className='lead text-center'>
                        Provide the information to display on your profile.
                    </p>
                    <small className='d-block pb-3'>* = required fields</small>
                    <form onSubmit={this.onSubmit}>
                        <TextFieldGroup 
                            placeholder='* Profile handle'
                            name='handle'
                            value={this.state.handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="Enter a unique handle for ypur profile, full name, company name, nick name, etc."
                        />
                        <SelectListGroup 
                            placeholder='Status'
                            name='status'
                            value={this.state.status}
                            onChange={this.onChange}
                            options={options}
                            error={errors.status}
                            info="Select your present career role."
                        />
                        <TextFieldGroup 
                            placeholder='Company'
                            name='company'
                            value={this.state.company}
                            onChange={this.onChange}
                            error={errors.company}
                            info="Where you work at or could be your own compnay."
                        />
                        <TextFieldGroup 
                            placeholder='* Website'
                            name='website'
                            value={this.state.website}
                            onChange={this.onChange}
                            error={errors.website}
                            info="Your protfolio website or the website of your company."
                        />
                        <TextFieldGroup 
                            placeholder='Location'
                            name='location'
                            value={this.state.location}
                            onChange={this.onChange}
                            error={errors.location}
                            info="City & State"
                        />
                        <TextFieldGroup 
                            placeholder='* Skills'
                            name='skills'
                            value={this.state.skills}
                            onChange={this.onChange}
                            error={errors.skills}
                            info="Please use comma seperated values (eg. Java,Python,SQL)."
                        />
                        <TextFieldGroup 
                            placeholder='Github Username'
                            name='githubusername'
                            value={this.state.githubusername}
                            onChange={this.onChange}
                            error={errors.githubusername}
                            info="Include your github username to show your latest repos and link."
                        />
                        <TextAreaFieldGroup 
                            placeholder='Bio'
                            name='bio'
                            value={this.state.bio}
                            onChange={this.onChange}
                            error={errors.bio}
                            info="Tell us a little about yourself."
                        />

                        <div className='mb-3'>
                            <button
                            type='button'
                            onClick={() => {
                                this.setState(prevState => ({
                                    displaySocialInputs: !prevState.displaySocialInputs
                                }))
                            }} className='btn btn-light'>
                                Add Social Network Links
                            </button>
                            <span className='text-muted'>Optional</span> 
                        </div>
                        {socialInputs}
                        <input type='submit' value="Submit" className="btn btn-info btn-block mt-4" />
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

CreateProfile.prototypes = {
    profile: PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));
