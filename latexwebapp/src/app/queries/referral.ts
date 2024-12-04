import { latexdb } from "../db/index"
import { users, referrals } from "../db/schema"
import { eq, and } from "drizzle-orm"

export type newReferral = typeof referrals.$inferInsert

export async function getReferralCode(id: string, email: string)
{
    const toInsert: newReferral = {
        descriptor: 1,
        userId: id,
        referralEmail: email,
        referralStatus: false,
    }

    const user_count = await latexdb.$count(users, eq(users.email, email));

    if (user_count != 0) {
        return { message: "Already exists!" };
    }

    const ref_count = await latexdb.$count(referrals, and(
        eq(referrals.referralEmail, email),
        eq(referrals.referralStatus, true),
    ));

    if (ref_count == 0) {
        await latexdb.insert(referrals).values(toInsert);
    } else {
        return { message: "Already referred!" };
    }
}

export async function insertReferral(id: string, code: string)
{
    // const tryEmail = await latexdb.select().from(users).where(eq(users.email, arg.referralEmail)).catch((err) => {
      // return { message: "not referred" };  
    // })

    const ref_code_count = await latexdb.$count(referrals, and(
        eq(referrals.descriptor, 1),
        eq(referrals.referralCode, code),
    ));

    if (ref_code_count == 0) {
        return { message: "invalid referral code" };
    }

    const toInsert: newReferral = {
        descriptor: 2, 
        userId: id,
        referralCode: code,
    }
    await latexdb.insert(referrals).values(toInsert);
    await latexdb.update(referrals).set({ referralStatus: true }).where(and(
        eq(referrals.descriptor, 1),
        eq(referrals.referralCode, code),
    ));

    return { message: "success" };
    
    // try
    // {
        // await latexdb.insert(referrals).values(arg);
    // } catch(error) {
       // return { message: "Already referred! "};
    // }
}