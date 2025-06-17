# Black Business Directory

A React Native app built with Expo that helps users discover and support Black-owned businesses in their community.

## Features

- **Business Discovery**: Browse and search Black-owned businesses by category
- **Interactive Maps**: View business locations on an interactive map
- **Favorites**: Save your favorite businesses for quick access
- **Business Listings**: Business owners can list their businesses with subscription plans
- **Real Payment Processing**: Integrated with Stripe for secure payment processing
- **Recurring Billing**: Automatic monthly subscription billing
- **Web Accessibility**: Fully responsive design for desktop and mobile web browsers

## Tech Stack

- **Frontend**: React Native with Expo
- **Backend**: Hono.js with tRPC
- **State Management**: Zustand with AsyncStorage persistence
- **Payment Processing**: Stripe (configured for production use)
- **Styling**: React Native StyleSheet with custom design system

## Getting Started

### Prerequisites

- Node.js 18+ 
- Expo CLI
- Stripe account (for payment processing)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file with:
   ```
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_BASIC_PRICE_ID=price_your_basic_price_id
   STRIPE_STANDARD_PRICE_ID=price_your_standard_price_id  
   STRIPE_PREMIUM_PRICE_ID=price_your_premium_price_id
   EXPO_PUBLIC_RORK_API_BASE_URL=your_api_base_url
   CORS_ORIGINS=your_frontend_url,other_allowed_origins
   NODE_ENV=production
   ```

   **Important**: Ensure `EXPO_PUBLIC_RORK_API_BASE_URL` is set to your hosted backend API URL for production. Without this, the app will not connect to your backend after publishing.

4. Start the development server:
   ```bash
   npm start
   ```
   To start the web version specifically:
   ```bash
   npm run start-web
   ```

## Accessing the App

### Local Development
- **Mobile**: Use the Expo Go app on your device by scanning the QR code generated when running `npm start`.
- **Web**: Run `npm run start-web` or `npm run start-web-dev` to start the web version. The app will typically be available at `http://localhost:19006` or a similar local port. Check the console output after running the start command for the exact URL.

### Deployed App
- If your app is hosted via Rork or another hosting service, the URL will depend on your deployment configuration. Check the Rork dashboard or your hosting provider for the specific URL.
- The base URL for API requests is set via the `EXPO_PUBLIC_RORK_API_BASE_URL` environment variable, but the frontend URL might differ.

## Publishing for Customer Use

To make this app available to your customers, you can publish it through Expo or build it for app stores. Below are the steps to follow:

### 1. Expo Publish (Quick Sharing)
Expo allows you to publish your app online for easy access without building binaries:
- Run `npx expo publish` to upload your app to Expo's servers.
- Once published, you'll receive a URL (like `exp://expo.io/@username/projectname`) that you can share with customers.
- Customers can access it via the Expo Go app on their mobile devices by scanning the QR code or entering the URL.
- For web access, the published app might be available at a URL provided by Expo, typically under `expo.dev`.

**Note**: Expo Publish is suitable for testing and early access but not for production app store distribution.

### 2. Building for App Stores (Production)
For a production-ready app to distribute via Apple App Store and Google Play Store:
- **Sign Up for Expo Account**: Ensure you have an Expo account and are logged in via `npx expo login`.
- **Configure App**: Update `app.json` with your app's metadata (name, description, icons, etc.).
- **Build with Expo**: Use `npx expo build:ios` for iOS and `npx expo build:android` for Android. This requires setting up developer accounts with Apple and Google.
- **Submit to Stores**: Once built, download the binaries from Expo's dashboard and submit them to the respective app stores through App Store Connect and Google Play Console.
- **TestFlight**: For iOS, you can distribute beta versions via TestFlight before full release. Note that if you encounter issues like character doubling when typing in TestFlight, it might be related to keyboard input handling or build configurations. We've added preventative measures in the code to minimize this issue by disabling `autoCorrect` on input fields. If the problem persists, check TestFlight build logs for JavaScript errors related to input events.

### 3. Web Deployment
To host the web version for customer access on desktop and mobile browsers:
- Build the web app using `npx expo build:web`.
- Deploy the output from the `web-build` folder to a static hosting service like Netlify, Vercel, or GitHub Pages.
- Share the deployed URL with your customers for direct web access. The app is optimized for desktop screens with responsive layouts, ensuring a seamless experience across devices.

### 4. Custom Domain (Optional)
- For a professional touch, configure a custom domain for your Expo published app or web deployment through your hosting provider or Expo dashboard.

### 5. Customer Communication
- **Share Access**: Once published or deployed, share the Expo URL, app store links, or web URL with your customers via email, social media, or your website.
- **Onboarding**: The app includes a welcoming Discover screen as the entry point. Consider adding in-app tutorials or tooltips for first-time users if needed.
- **Feedback**: Encourage customers to provide feedback through a form or email to improve the app based on real usage.

**Important**: Since direct deployment tools like EAS are not available in this environment, these instructions assume you're using Expo's CLI tools on your local machine. If you're using Rork's hosting, refer to their documentation for specific deployment steps or dashboard access to find your app's public URL. Ensure that the `EXPO_PUBLIC_RORK_API_BASE_URL` environment variable is correctly set to your hosted backend API URL to avoid connection issues.

## Payment Integration

The app includes a complete Stripe integration for processing subscription payments:

### Subscription Tiers
- **Basic**: $20/month - Basic business listing
- **Standard**: $35/month - Enhanced listing with photos and details
- **Premium**: $50/month - Featured placement and analytics

### Payment Flow
1. User selects a subscription tier
2. Enters business information
3. Provides credit card details
4. Payment is processed through Stripe
5. Recurring monthly billing is automatically set up

### Test Cards
For testing payments, use these Stripe test cards:
- **Success**: 4242 4242 4242 4242
- **Declined**: 4000 0000 0000 0002
- **Expired**: 4000 0000 0000 0069

### Production Setup

To enable real payments in production:

1. **Stripe Dashboard Setup**:
   - Create products and prices for each subscription tier
   - Get your live API keys
   - Set up webhooks for subscription events

2. **Environment Variables**:
   - Replace test keys with live Stripe keys
   - Update price IDs with your actual Stripe price IDs

3. **PCI Compliance**:
   - For production, implement Stripe Elements or Payment Intents API
   - Never handle raw card data on your servers
   - Use Stripe's secure tokenization

4. **Database Integration**:
   - Store subscription details in your database
   - Handle webhook events for subscription updates
   - Implement subscription management features

## Security Notes

- Card details are validated before processing
- All payments go through Stripe's secure infrastructure
- No sensitive payment data is stored in the app
- Test mode is clearly indicated in the UI

## Troubleshooting

### Double Character Input in TestFlight
If you experience an issue where characters are doubled when typing in the app during TestFlight testing, it might be related to keyboard input handling or build configurations. We've added preventative measures in the code to minimize this issue by disabling `autoCorrect` on input fields. If the problem persists:
- Check TestFlight build logs for any JavaScript errors related to input events.
- Ensure there are no duplicate event listeners in custom keyboard handling code.
- Verify your Expo SDK and React Native versions are up to date, as this could be a platform bug.

### Invalid Address Error After Publishing
If your app fails to open after publishing due to an "invalid address" error, it's likely related to the API base URL:
- Ensure the `EXPO_PUBLIC_RORK_API_BASE_URL` environment variable is set to your hosted backend API URL.
- Check the Rork dashboard or your hosting provider for the correct API endpoint URL.
- Update the fallback URL in `lib/trpc.ts` if necessary, though the environment variable should take precedence.

## Architecture

- **File-based Routing**: Using Expo Router for navigation
- **Component Structure**: Modular, reusable components
- **State Management**: Zustand stores for business data and subscriptions
- **API Layer**: tRPC for type-safe API calls
- **Styling**: Custom design system with consistent colors and typography

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.