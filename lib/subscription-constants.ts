export type PlanName = 'free' | 'pro' | 'business';

export interface PlanLimit {
  maxBooks: number;
}
export const getCurrentBillingPeriodStart = (): Date => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
}
export const PLAN_LIMITS: Record<PlanName, PlanLimit> = {
  free: { maxBooks: 3 },
  pro: { maxBooks: 25 },
  business: { maxBooks: 200 },
};

