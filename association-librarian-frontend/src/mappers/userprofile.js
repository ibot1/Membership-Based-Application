export const mapUserProfileToState = (data) => {
    return {
        fname: data.firstName, mname: data.midName, sname: data.surName, dob: data.dob,
        gzone: data.zone, phone: data.phoneNo, email: data.email, sex: data.sex,
        photo: { url: data.photo, hide: false }, cv: { url: data.cv, hide: false }
    };
}

export const mapStateToUserProfile = (data) => {
    return {
        firstName: data.fname, midName: data.mname, surName: data.sname, dob: data.dob,
        zone: data.gzone, phoneNo: data.phone, email: data.email, sex: data.sex,
        photo: data.photo.url, cv: data.cv.url
    };
}