// ─────────────────────────────────────────────────────
// EmailJS Setup Instructions:
// 1. Go to https://www.emailjs.com and create a free account
// 2. Add an Email Service (Gmail works great):
//    - Go to "Email Services" → "Add New Service"
//    - Choose Gmail, connect your account
//    - Note the SERVICE_ID (e.g., "service_xxxxxxx")
// 3. Create an Email Template:
//    - Go to "Email Templates" → "Create New Template"
//    - Subject: "🏷️ Moving Sale Interest: {{item_title}}"
//    - Body (use these variables):
//      Name: {{from_name}}
//      Email: {{from_email}}
//      Phone: {{phone}}
//      Item: {{item_title}}
//      Price: {{item_price}}
//      Message: {{message}}
//    - Set "To Email" to: sherel.crasta@gmail.com
//    - Add CC: idisanimesh@gmail.com
//    - Note the TEMPLATE_ID (e.g., "template_xxxxxxx")
// 4. Get your PUBLIC KEY from "Account" → "General" tab
// 5. Replace the values below
// ─────────────────────────────────────────────────────

export const EMAILJS_SERVICE_ID = 'service_hxwyunb';
export const EMAILJS_TEMPLATE_ID = 'template_d00dfmz';
export const EMAILJS_PUBLIC_KEY = 'MBh5TgwqcK587AqN-';

// Seller contact info
export const SELLER_EMAILS = ['sherel.crasta@gmail.com', 'idisanimesh@gmail.com'];
export const SELLER_NAME = 'Animesh & Sherel';
