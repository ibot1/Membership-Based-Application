import { Component } from "react";
import { mapUserProfileToState, mapStateToUserProfile } from "../mappers/userprofile";
import { isValidEmail, isValidPhone } from "./utils";
import { getUserProfile, addUserProfile, modifyUserProfile } from "../clients/backendClient";
import profileStyles from "./styles/profile.module.css";

const PHOTO_SIZE_LIMIT = 60 * 1000;
const CV_SIZE_LIMIT = 150 * 1000;
const FILE_NAME_LIMIT = 50;
const USER_NAME_LIMIT = 255;


// TODO: spinner
export default class Profile extends Component {

    constructor() {
        super();
        this.state = {
            fname: "", mname: "", sname: "", dob: "", gzone: "",
            phone: "", email: "", sex: "",
            photo: { url: "", hide: true },
            cv: { url: "", hide: true }
        };
    }

    validateState = () => {
        const errors = [];
        const { fname, mname, sname, dob, gzone, phone, email, sex, photo, cv } = this.state;

        if (fname.length === 0 || fname.length > USER_NAME_LIMIT) {
            errors.push(`* First Name is required and mustn't be greater than ${USER_NAME_LIMIT} characters`)
        }
        if (mname.length > USER_NAME_LIMIT) {
            errors.push(`* Middle Name mustn't be greater than ${USER_NAME_LIMIT} characters`)
        }
        if (sname.length === 0 || sname.length > USER_NAME_LIMIT) {
            errors.push(`* Surname is required and mustn't be greater than ${USER_NAME_LIMIT} characters`)
        }
        if (dob.length === 0) {
            errors.push("* Date Of Birth is required")
        }
        if (gzone.length === 0) {
            errors.push("* University Geopolitical Zone is required");
        }
        if (!isValidPhone.test(phone)) {
            errors.push("* Phone is required and must be valid. E.g. 080-1234-5678");
        }
        if (!isValidEmail.test(email)) {
            errors.push("* Email is required and must be valid. E.g. email@example.com");
        }
        if (sex.length === 0) {
            errors.push("* Sex is required");
        }
        if (photo.url.length === 0) {
            errors.push("* Photo is required");
        }
        if (cv.url.length === 0) {
            errors.push("* CV is required");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return false;
        }
        return true;
    }

    onChange = (event) => this.setState({ [event.target.id]: event.target.value.trim() });

    onChangeFile = (event, sizeLimit) => {
        const file = event.target.files[0];

        if (file.size > sizeLimit || file.name.length > FILE_NAME_LIMIT) {
            document.getElementById(event.target.id).value = "";
            alert(`File size should be less than ${sizeLimit} and name not be longer than ${FILE_NAME_LIMIT}`);
            return;
        }

        if (file instanceof Blob) {
            const fileReader = new FileReader();

            fileReader.onload = e => this.setState({
                [event.target.id]: {
                    url: e.target.result,
                    hide: true
                }
            });
            fileReader.readAsDataURL(file);
        }
    }

    retrieveUserProfile = async () => {
        if (!isValidEmail.test(this.state.email)) {
            alert("Invalid Email Address");
            return;
        }
        getUserProfile(this.state.email)
            .then(resp => {
                this.setState(mapUserProfileToState(resp.data));
                document.getElementById("photo").value = "";
                document.getElementById("cv").value = "";
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    alert("No record assigned to that email address");
                } else {
                    alert("Unable to reach backend");
                }
                console.log(error.message);
            })
    }

    createUserProfile = async () => {
        this.validateState() &&
            addUserProfile(mapStateToUserProfile(this.state))
                .then(resp => alert("User Profile Created"))
                .catch(error => {
                    if (!error.response || error.response.status >= 500) {
                        alert("Unable to reach backend");
                    } else if (error.response.status === 409) {
                        alert("Email already registered")
                    } else {
                        alert("Invalid Request");
                    }
                    console.log(error.message)
                })
    }

    updateUserProfile = async () => {
        this.validateState() &&
            modifyUserProfile(mapStateToUserProfile(this.state))
                .then(resp => alert("User Profile Updated"))
                .catch(error => {
                    if (!error.response || error.response.status >= 500) {
                        alert("Unable to reach backend");
                    } else {
                        alert("Invalid Request");
                    }
                    console.log(error.message)
                })
    }

    render() {
        return (
            <div className={profileStyles.infoCard}>
                <div>
                    <label htmlFor="fname"> First Name: </label>
                    <input type="text" id="fname" value={this.state.fname} onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="mname"> Middle Name: </label>
                    <input type="text" id="mname" value={this.state.mname} onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="sname"> Surname: </label>
                    <input type="text" id="sname" value={this.state.sname} onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="dob"> Date Of Birth: </label>
                    <input type="date" id="dob" value={this.state.dob} onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="gzone">University Geopolitical Zone: </label>
                    <select id="gzone" value={this.state.gzone} onChange={this.onChange} >
                        <option value="">Select</option>
                        <option value="NORTH_CENTRAL">North Central</option>
                        <option value="NORTH_EAST">North East</option>
                        <option value="NORTH_WEST">North West</option>
                        <option value="SOUTH_EAST">South East</option>
                        <option value="SOUTH_SOUTH">South South</option>
                        <option value="SOUTH_WEST">South West</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="phone"> Phone No: </label>
                    <input type="tel" id="phone" placeholder="123-4567-8901" value={this.state.phone} onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="email"> Email: </label>
                    <input type="email" id="email" placeholder="janedoe@mail.com" value={this.state.email} onChange={this.onChange} />
                </div>
                <div>
                    <label htmlFor="sex"> Sex: </label>
                    <select id="sex" value={this.state.sex} onChange={this.onChange} >
                        <option value="">Select</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="photo"> Photograph: </label>
                    <input type="file" id="photo" accept="image/*" onChange={e => this.onChangeFile(e, PHOTO_SIZE_LIMIT)} />
                    <a href={this.state.photo.url} className={profileStyles.file} hidden={this.state.photo.hide} download>Download</a>
                </div>
                <div>
                    <label htmlFor="cv"> CV: </label>
                    <input type="file" id="cv" accept=".doc,.docx,.pdf" onChange={e => this.onChangeFile(e, CV_SIZE_LIMIT)} />
                    <a href={this.state.cv.url} className={profileStyles.file} hidden={this.state.cv.hide} download>Download</a>
                </div>
                <div className={profileStyles.buttons}>
                    <div onClick={this.retrieveUserProfile}>Retrieve</div>
                    <div onClick={this.createUserProfile}>Create</div>
                    <div onClick={this.updateUserProfile}>Update</div>
                </div>
            </div>
        );
    }
}