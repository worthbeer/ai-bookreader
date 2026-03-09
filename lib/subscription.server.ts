'use server';

import { auth } from '@clerk/nextjs/server';
import { PlanName } from './subscription-constants';

const FALLBACK_PLAN: PlanName = 'free';

export async function getUserPlan(): Promise<PlanName> {
  const { userId } = await auth();

  if (!userId) {
    return FALLBACK_PLAN;
  }

  const configuredPlan = process.env.DEFAULT_USER_PLAN?.toLowerCase();

  if (configuredPlan === 'pro' || configuredPlan === 'business' || configuredPlan === 'free') {
    return configuredPlan;
  }

  return FALLBACK_PLAN;
}

