import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST() {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        const userSession = await auth.api.getSession({
            headers: await headers()
        })

        if (!userSession?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }

        const client = userSession.user
        const PRICE_ID = "price_1TgxWh03IurIIW2VBcrjNLoE"

        const session = await stripe.checkout.sessions.create({
            customer_email: client.email,
            line_items: [
                {
                    price: PRICE_ID,
                    quantity: 1,
                },
            ],
            metadata: {
                PriceId: PRICE_ID,
                ClientId: client.id,
                Clintemail: client.email
            },
            mode: 'subscription',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        });

        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}