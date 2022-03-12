export const  pageTransition = {
    variants: {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.25 } },
    },
    animate: 'animate',
    exit: "exit",
    initial:"initial"
  
  };
  