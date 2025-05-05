export const topLineVars = {
  closed: {
    top: '30%',
    y: '-50%',
    rotate: 0,
    transition: {
      duration: 0.5,
    },
  },
  open: {
    top: '50%',
    rotate: '495deg',
    transition: {
      duration: 0.5,
    },
  },
};

export const middleLineVars = {
  closed: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.5,
    },
  },
  open: {
    width: 0,
    opacity: 0,
    rotate: '360deg',
    transition: {
      duration: 0.1,
    },
  },
};

export const bottomLineVars = {
  closed: {
    bottom: '30%',
    rotate: 0,
    transition: {
      duration: 0.5,
    },
  },
  open: {
    bottom: '50%',
    width: '100%',
    rotate: '585deg',
    transition: {
      duration: 0.5,
    },
  },
};
