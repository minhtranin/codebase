import bcrypt from 'bcrypt'

export const comparePassword = (inputPassword: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(inputPassword, hashedPassword)
}

export const hashPassword = (password: string): string => {
  if (process.env.SALTING_ROUNDS) {
    const saltingRounds = parseInt(process.env.SALTING_ROUNDS, 0)
    const salt = bcrypt.genSaltSync(saltingRounds)
    return bcrypt.hashSync(password, salt)
  }
  throw new Error('No salting rounds provided')
}
