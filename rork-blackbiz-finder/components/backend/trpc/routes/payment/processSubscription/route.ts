import { z } from "zod";
import { publicProcedure } from "../../../create-context";

// Stripe configuration
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_...'; // Add your Stripe secret key
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_...'; // Add your Stripe publishable key

// Price IDs for each subscription tier (create these in your Stripe dashboard)
const STRIPE_PRICE_IDS = {
  basic: process.env.STRIPE_BASIC_PRICE_ID || 'price_basic_monthly',
  standard: process.env.STRIPE_STANDARD_PRICE_ID || 'price_standard_monthly', 
  premium: process.env.STRIPE_PREMIUM_PRICE_ID || 'price_premium_monthly'
};

// Mock Stripe integration for demo purposes
// In production, install stripe package: npm install stripe
const mockStripeCharge = async (cardData: any, amount: number, customerEmail: string) => {
  // Simulate Stripe API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock validation - reject invalid test cards
  if (cardData.cardNumber === '4000000000000002') {
    throw new Error('Your card was declined.');
  }
  
  if (cardData.cardNumber === '4000000000000069') {
    throw new Error('Your card has expired.');
  }
  
  // Accept test card 4242424242424242
  if (cardData.cardNumber !== '4242424242424242' && process.env.NODE_ENV !== 'production') {
    // In production, Stripe would handle all card validation
    throw new Error('Invalid card number. Use test card 4242424242424242');
  }
  
  return {
    id: `ch_${Math.random().toString(36).substring(2, 15)}`,
    amount: amount * 100, // Stripe uses cents
    currency: 'usd',
    status: 'succeeded',
    customer: `cus_${Math.random().toString(36).substring(2, 15)}`,
    subscription: `sub_${Math.random().toString(36).substring(2, 15)}`
  };
};

const mockStripeSubscription = async (customerId: string, priceId: string) => {
  // Simulate creating a subscription
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: `sub_${Math.random().toString(36).substring(2, 15)}`,
    customer: customerId,
    status: 'active',
    current_period_start: Math.floor(Date.now() / 1000),
    current_period_end: Math.floor((Date.now() + 30 * 24 * 60 * 60 * 1000) / 1000), // 30 days from now
    items: {
      data: [{
        price: {
          id: priceId,
          recurring: {
            interval: 'month'
          }
        }
      }]
    }
  };
};

export default publicProcedure
  .input(z.object({
    tierId: z.enum(['basic', 'standard', 'premium']),
    businessName: z.string().min(1),
    businessEmail: z.string().email(),
    businessPhone: z.string().optional(),
    cardNumber: z.string().min(13),
    expiryDate: z.string().regex(/^\d{2}\/\d{2}$/),
    cvv: z.string().min(3).max(4),
    cardHolderName: z.string().min(1),
  }))
  .mutation(async ({ input }) => {
    try {
      // Get the price for the selected tier
      const tierPrices = {
        basic: 20,
        standard: 35,
        premium: 50
      };
      
      const amount = tierPrices[input.tierId];
      const priceId = STRIPE_PRICE_IDS[input.tierId];
      
      // In production, you would:
      // 1. Initialize Stripe with your secret key
      // const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });
      
      // 2. Create or retrieve customer
      // const customer = await stripe.customers.create({
      //   email: input.businessEmail,
      //   name: input.businessName,
      //   phone: input.businessPhone,
      // });
      
      // 3. Create payment method (card details should be tokenized on frontend for PCI compliance)
      // const paymentMethod = await stripe.paymentMethods.create({
      //   type: 'card',
      //   card: {
      //     number: input.cardNumber,
      //     exp_month: parseInt(input.expiryDate.split('/')[0]),
      //     exp_year: parseInt('20' + input.expiryDate.split('/')[1]),
      //     cvc: input.cvv,
      //   },
      //   billing_details: {
      //     name: input.cardHolderName,
      //     email: input.businessEmail,
      //   },
      // });
      
      // 4. Attach payment method to customer
      // await stripe.paymentMethods.attach(paymentMethod.id, {
      //   customer: customer.id,
      // });
      
      // 5. Set as default payment method
      // await stripe.customers.update(customer.id, {
      //   invoice_settings: {
      //     default_payment_method: paymentMethod.id,
      //   },
      // });
      
      // 6. Create subscription
      // const subscription = await stripe.subscriptions.create({
      //   customer: customer.id,
      //   items: [{ price: priceId }],
      //   default_payment_method: paymentMethod.id,
      //   expand: ['latest_invoice.payment_intent'],
      // });
      
      // For demo purposes, use mock functions
      const charge = await mockStripeCharge({
        cardNumber: input.cardNumber,
        expiryDate: input.expiryDate,
        cvv: input.cvv,
        cardHolderName: input.cardHolderName
      }, amount, input.businessEmail);
      
      const subscription = await mockStripeSubscription(charge.customer, priceId);
      
      // In production, save subscription details to your database
      // await db.subscriptions.create({
      //   businessName: input.businessName,
      //   businessEmail: input.businessEmail,
      //   businessPhone: input.businessPhone,
      //   stripeCustomerId: charge.customer,
      //   stripeSubscriptionId: subscription.id,
      //   tierId: input.tierId,
      //   status: 'active',
      //   currentPeriodStart: new Date(subscription.current_period_start * 1000),
      //   currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      // });
      
      return {
        success: true,
        subscriptionId: subscription.id,
        customerId: charge.customer,
        chargeId: charge.id,
        amount: amount,
        currency: 'USD',
        status: subscription.status,
        nextBillingDate: new Date(subscription.current_period_end * 1000).toISOString(),
        message: `Successfully created ${input.tierId} subscription for ${input.businessName}`,
      };
      
    } catch (error: any) {
      console.error('Payment processing error:', error);
      
      return {
        success: false,
        error: error.message || 'Payment processing failed. Please try again.',
      };
    }
  });