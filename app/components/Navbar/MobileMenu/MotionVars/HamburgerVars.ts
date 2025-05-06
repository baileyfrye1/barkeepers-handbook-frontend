export const topLineVars = {
  closed: {
    top: '30%',
    y: '-50%',
    rotate: 0,
    transition: {
      duration: 0.3,
      top: {
        delay: 0.5,
      },
    },
  },
  open: {
    top: '50%',
    rotate: '45deg',
    transition: {
      duration: 0.3,
      rotate: {
        delay: 0.5,
      },
    },
  },
};

export const middleLineVars = {
  closed: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.5,
    },
  },
  open: {
    width: 0,
    opacity: 0,
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
      duration: 0.3,
      bottom: {
        delay: 0.5,
      },
    },
  },
  open: {
    bottom: '50%',
    width: '1.5rem',
    rotate: '-45deg',
    transition: {
      duration: 0.3,
      rotate: {
        delay: 0.5,
      },
    },
  },
};
