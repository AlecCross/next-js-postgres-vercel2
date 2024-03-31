//utils/passwordUtils.ts

const bcrypt = require('bcryptjs');

export async function checkPassword(password: string, hash: string): Promise<boolean> {
    try {
        const result = await bcrypt.compare(password, hash);
        console.log('checkPassword ', result)
        return result;
    } catch (error) {
        console.error('Error comparing password with hash:', error);
        throw new Error('Error comparing password with hash');
    }
}
