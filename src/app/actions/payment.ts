"use server";

import Razorpay from "razorpay";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// Use Admin Client to bypass RLS for server-side payment logic
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!key) throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  return createSupabaseClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_mock",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret_mock",
});

export async function createRazorpayOrder(planId: string, amount: number) {
  try {
    const supabase = getAdminClient();

    // 1. Create Razorpay Order
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order || !order.id) {
      throw new Error("Failed to create Razorpay order");
    }

    // 2. Log payment intent in database
    const { error } = await supabase.from("payments").insert({
      razorpay_order_id: order.id,
      plan_id: planId,
      amount: amount,
      currency: "INR",
      status: "created",
      receipt: options.receipt,
    });

    if (error) {
      console.error("Error logging payment intent:", error);
      throw new Error("Failed to log payment intent");
    }

    return { 
      success: true, 
      orderId: order.id, 
      amount: options.amount,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "rzp_test_mock"
    };
  } catch (error: any) {
    console.error("Razorpay Order Error:", error);
    return { error: error.message || "Failed to initiate payment." };
  }
}

export async function verifyRazorpayPayment(
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string
) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET || "rzp_test_secret_mock";
    
    // Create the expected signature
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expectedSignature = shasum.digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return { error: "Invalid payment signature" };
    }

    const supabase = getAdminClient();

    // Update payment record
    const { error } = await supabase
      .from("payments")
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: "captured",
      })
      .eq("razorpay_order_id", razorpay_order_id);

    if (error) {
      console.error("Error updating payment status:", error);
      return { error: "Failed to update payment record" };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Verification Error:", error);
    return { error: error.message || "Payment verification failed." };
  }
}

export async function generateOnboardingToken(razorpay_order_id: string) {
  try {
    const supabase = getAdminClient();

    // 1. Fetch the payment record to ensure it is captured
    const { data: payment, error } = await supabase
      .from("payments")
      .select("*, pricing_plans(*)")
      .eq("razorpay_order_id", razorpay_order_id)
      .single();

    if (error || !payment) {
      return { error: "Payment record not found." };
    }

    if (payment.status !== "captured") {
      return { error: "Payment has not been captured successfully." };
    }

    // 2. Generate secure JWT payload
    const payload = {
      payment_id: payment.razorpay_payment_id,
      order_id: payment.razorpay_order_id,
      plan_id: payment.plan_id,
      amount: payment.amount,
      plan_name: payment.pricing_plans?.plan_name || "Custom Plan",
      setup_fee: payment.pricing_plans?.setup_fee || 0,
      monthly_price: payment.pricing_plans?.monthly_price || 0,
    };

    // 3. Sign the JWT (Expires in 1 hour)
    const secret = process.env.ONBOARDING_JWT_SECRET || "fallback_secret_for_dev_only";
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    return { success: true, token };
  } catch (error: any) {
    console.error("Token Generation Error:", error);
    return { error: error.message || "Failed to generate onboarding token." };
  }
}
