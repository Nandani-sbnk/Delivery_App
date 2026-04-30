import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const placeOrderCOD = async (req, res) => {
    try {
        const userId = req.userId;
        const { items, address } = req.body;

        if (!address || !items || items.length === 0) {
            return res.json({ success: false, message: "Invalid Data" });
        }

        let amount = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);
            amount += product.offerPrice * item.quantity;
        }

        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        });

        return res.json({ success: true, message: "Order Placed successfully" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const placeOrderStripe = async (req, res) => {
    try {
        const userId = req.userId;
        const { origin } = req.headers;
        const { items, address } = req.body;

        if (!address || !items || items.length === 0) {
            return res.json({ success: false, message: "Invalid Data" });
        }

        let productData = [];
        let amount = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);

            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            });

            amount += product.offerPrice * item.quantity;
        }

        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online"
        });

        const user = await User.findById(userId);

        const line_items = productData.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }));

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            customer_email: user.email,
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId
            }
        });

        return res.json({ success: true, url: session.url });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export const stripeWebhooks = async (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return response.status(400).send(`Webhook Error: ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const { orderId, userId } = session.metadata;

        await Order.findByIdAndUpdate(orderId, { isPaid: true });
        await User.findByIdAndUpdate(userId, { cartItems: {} });
    }

    response.json({ received: true });
};

export const getUserOrders = async (req, res) => {
    try {
        const userId = req.userId;

        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
            .populate("address")
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        })
            .populate("items.product address")
            .sort({ createdAt: -1 });

        res.json({ success: true, orders });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};