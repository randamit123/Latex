'use server'
import { generateReferral, insertReferral } from './queries/referral'

export async function getReferralCode(email: string)
{   
    const emailInput = email;

    if (emailInput != null && typeof emailInput == "string")
    {
        try {
            const refCode = await generateReferral(emailInput);
            if (refCode == "Invalid session" || refCode == "Error: User already exists!" || refCode == "Error: Email already referred!" || refCode == "Error: Email referral request already sent!")
                return refCode;
            else {
                return `Referral success!\nCode: ${refCode}`;
            }
        } catch(error) {
            return `${error}`;
        }
    } else { return "Error: Invalid request!"; }
}

export async function insertReferralCode(code: string)
{
    const resultMessage = await insertReferral(code).catch((error) => { return `${error}`; });
    return resultMessage;
}