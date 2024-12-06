import { latexdb } from "../db/index"
import { users, referrals, latex } from "../db/schema"
import { eq, and } from "drizzle-orm"
import { auth } from "../auth/NextAuth"

export type newReferral = typeof referrals.$inferInsert

const session = await auth();

export async function getLatexCount(id: string)
{
    const result = await latexdb.$count(latex, eq(latex.userId, id));
    return result;
}

export async function getReferralCount(id: string)
{
    const result = await latexdb.$count(referrals, eq(referrals.userId, id));
    return result;
}

export async function generateReferral(email: string)
{
    if (session == null || session.user?.id == undefined)
        return "Invalid session";

    const toInsert: newReferral = {
        descriptor: 1,
        userId: session.user?.id,
        referralEmail: email,
        referralStatus: false,
    }

    const user_count = await latexdb.$count(users, eq(users.email, email));

    if (user_count != 0) {
        return "Error: User already exists!";
    }

    const ref_count = await latexdb.$count(referrals, and(
        eq(referrals.referralEmail, email),
        eq(referrals.referralStatus, true),
    ));

    if (ref_count == 0) {
        try {
            const [ref_code] = await latexdb.insert(referrals).values(toInsert).returning({ code: referrals.referralCode });
            return ref_code.code;
        } catch(error) {
            return "Error: Email referral request already sent!";
        }
    } else {
        return "Error: Email already referred!";
    }
}

export async function insertReferral(code: string)
{
    // const tryEmail = await latexdb.select().from(users).where(eq(users.email, arg.referralEmail)).catch((err) => {
      // return { message: "not referred" };  
    // })

    if (session == null || session.user?.id == undefined)
        return "Invalid session";

    const ref_code_count = await latexdb.$count(referrals, and(
        eq(referrals.descriptor, 1),
        eq(referrals.referralCode, code),
    ));

    if (ref_code_count == 0) {
        return "Error: Invalid referral code!";
    }

    const toInsert: newReferral = {
        descriptor: 2, 
        userId: session.user?.id,
        referralCode: code,
    }
    await latexdb.insert(referrals).values(toInsert);
    await latexdb.update(referrals).set({ referralStatus: true }).where(and(
        eq(referrals.descriptor, 1),
        eq(referrals.referralCode, code),
    ));

    return "Success!";
    
    // try
    // {
        // await latexdb.insert(referrals).values(arg);
    // } catch(error) {
       // return { message: "Already referred! "};
    // }
}