import bcrypt from 'bcrypt'

export default class crypto {
    hash(password: string): Promise<string> {
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hash(password, salt)
    }
    validate(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword)
    }
}