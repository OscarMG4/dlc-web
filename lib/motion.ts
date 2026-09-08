export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const easeBrand: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const revealTransition = {
  duration: 1.55,
  ease: easeOutExpo,
} as const;

export const loadTransition = {
  duration: 1.35,
  ease: easeOutExpo,
} as const;
