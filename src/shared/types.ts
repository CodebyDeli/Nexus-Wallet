import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  full_name: z.string().nullable(),
  phone_number: z.string().nullable(),
  is_agent: z.number().int(),
  kyc_status: z.string(),
  profile_image_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type User = z.infer<typeof UserSchema>;

export const WalletSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  balance: z.number(),
  currency: z.string(),
  is_frozen: z.number().int(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Wallet = z.infer<typeof WalletSchema>;

export const TransactionSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  transaction_type: z.string(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
  description: z.string().nullable(),
  reference_id: z.string().nullable(),
  recipient_id: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Transaction = z.infer<typeof TransactionSchema>;
