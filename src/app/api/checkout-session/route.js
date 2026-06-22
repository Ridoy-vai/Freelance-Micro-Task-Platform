import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST(request) {
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


        const formData = await request.formData()
        const price = formData.get('price')
        const title = formData.get('title')
        const ProposedId = formData.get('ProposedId')
        const Freelancer = formData.get('Freelancer')
        const FreelancerId = formData.get('FreelancerId')

        console.log({ price, title, ProposedId, Freelancer, })

        const session = await stripe.checkout.sessions.create({
            customer_email: client.email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: Number(price) * 100,
                        product_data: {
                            name: title && title.trim() !== '' ? title : 'Task Payment',
                        },
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                price: Number(price),
                ClientId: client.id,
                Clintemail: client.email,
                title: title || 'Untitled',
                Freelancer,
                ProposedId,
                FreelancerId
            },
            mode: 'payment',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cancel?ProposedId=${ProposedId}`
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