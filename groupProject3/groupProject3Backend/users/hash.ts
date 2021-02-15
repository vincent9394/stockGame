import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10;

export async function hashPassword(plainPassword: string){
    const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return hash;
}

export async function checkPassword(
    plainPassword: string,
    hashPassword: string,
){                                      //123
    const match = await bcrypt.compare(plainPassword, hashPassword);
    return match;
}

export function isEmail(email:string){
    let validEmail = /\S+@\S+/.test(email)
    return validEmail;
}
