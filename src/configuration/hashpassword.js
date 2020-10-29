import bcrypt from 'bcryptjs';


const hashPassword = async (data) => {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword =await bcrypt.hash(data, salt);
    return hashedpassword;
}

export default hashPassword;