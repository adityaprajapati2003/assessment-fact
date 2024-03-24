

export default function getAge(DOB){

    const current_year = new Date();
    const user_dob = new Date(DOB);
    let guess_user_age = current_year.getFullYear() - user_dob.getFullYear();

    return guess_user_age;

}