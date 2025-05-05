export const expandingMenuVars = {
  closed: {
    scaleX: 1,
    scaleY: 1,
    borderRadius: 10,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
  },
  open: {
    scaleX: 100,
    scaleY: 100,
    borderRadius: 0,
    transition: { duration: 0.7, ease: [1, -0.05, 0.2, 1] },
  },
};

export const navMenuVars = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
  exit: {
    opacity: 0,
  },
};

export const linkContainerVars = {
  initial: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
  animate: {
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.09,
      staggerDirection: 1,
    },
  },
};

export const linkVars = {
  initial: {
    x: '50%',
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0.55, 0.45, 1],
    },
  },
  animate: {
    x: '0',
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0, 0.55, 0.45, 1],
    },
  },
};
