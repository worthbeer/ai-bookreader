export type PlanName = 'free' | 'pro' | 'business';

export interface PlanLimit {
  maxBooks: number;
}

export const PLAN_LIMITS: Record<PlanName, PlanLimit> = {
  free: { maxBooks: 3 },
  pro: { maxBooks: 25 },
  business: { maxBooks: 200 },
};

